import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Box,
  Typography,
  Grid
} from "@material-ui/core";
import WifiIcon from "@material-ui/icons/Wifi";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const ipcRenderer = require("electron").ipcRenderer;
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  file: {
    display: "none"
  },
  path: {
    width: "calc(100% - 2px)",
    margin: "13px auto",
    padding: "13px 10px",
    borderRadius: "4px",
    border: "1px solid #c0c0c0"
  }
}));

export default function App() {
  const classes = useStyles();
  const [isServerRun, setIsServerRun] = useState(false);
  const [directory, setDirectory] = useState(null);
  const [port, setPort] = useState(3000);
  const handlePort = e => {
    if (!e.target.value) return;
    setPort(Number(e.target.value));
  };
  const handleRoot = e => {
    if (!e.target.files || !e.target.files[0]) return;
    const path = e.target.files[0].path;
    const name = e.target.files[0].name;
    const re = new RegExp(`/${name}$`);
    const directory = path.replace(re, "");
    setDirectory(directory);
  };
  const handleStart = _ => {
    ipcRenderer.send("asynchronous-message", {
      event: "start",
      port: port,
      directory: directory
    });
  };
  const handleStop = _ => {
    ipcRenderer.send("asynchronous-message", {
      event: "stop"
    });
  };
  const handleFile = e => {
    e.preventDefault();
    document.getElementById("directory").click();
  };

  ipcRenderer.on("message", (event, arg) => {
    if (arg.event === "start") {
      setIsServerRun(true);
    } else if (arg.event === "stop") {
      setIsServerRun(false);
    }
    console.log(arg);
  });

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <WifiIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          localhost.app
        </Typography>
        <div className={classes.form}>
          <Grid container spacing={1} className={classes.path}>
            <Grid item>
              <button onClick={handleFile}>Choose directory</button>
            </Grid>
            <Grid item>
              <div>{directory || "No directory chosen"}</div>
            </Grid>
          </Grid>
          <TextField
            className={classes.file}
            id="directory"
            onChange={handleRoot}
            type="file"
            inputProps={{
              webkitdirectory: "webkitdirectory",
              directory: "directory"
            }}
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="port"
            label="Port"
            type="number"
            id="port"
            value={port}
            onChange={handlePort}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              min: "0",
              max: "65535",
              step: "1"
            }}
          />
        </div>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={handleStop}
              disabled={!isServerRun}
            >
              Stop
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleStart}
              disabled={isServerRun || !port || !directory}
            >
              Start
            </Button>
          </Grid>
        </Grid>
      </div>
      <Box mt={4}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"© "}
          <Link href="https://twitter.com/watilde">Daijiro Wachi</Link>
        </Typography>
      </Box>
    </Container>
  );
}
