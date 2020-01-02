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
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const [port, setPort] = useState(3000);
  const handlePort = e => {
    setPort(Number(e.target.value));
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <WifiIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          localhost.app
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="file"
            label="Root directory"
            type="file"
            name="file"
            autoFocus
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
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
        </form>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
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
