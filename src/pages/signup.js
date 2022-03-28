import {
  Button,
  Card,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/shared/Seo";
import { useSignUpPageStyles } from "../styles";
import { LoginWithFacebook } from "./login";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";


function SignUpPage() {
  const classes = useSignUpPageStyles();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword)
  }

  return (
    <>
      <SEO title="Login" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <div className={classes.cardHeader} />
            <Typography className={classes.cardHeaderSubHeader}>
              Sign up to see photos and videos from your friends.
            </Typography>
            <LoginWithFacebook color="primary" iconColor="white" variant="contained" />
            <div className={classes.orContainer}>
              <div className={classes.orLine} />
              <div>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
            </div>
            <form>
              <TextField
                fullWidth
                variant="filled"
                label="Mobile Number or Email"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
              />
              <TextField
                fullWidth
                variant="filled"
                label="Full Name"
                margin="dense"
                className={classes.textField}
              />
              <TextField
                fullWidth
                variant="filled"
                label="username"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
              />
              <TextField
                fullWidth
                variant="filled"
                label="password"
                margin="dense"
                className={classes.textField}
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Button
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
              >
                Log In
              </Button>
            </form>
            <div className={classes.orContainer}>
              <div className={classes.orLine} />
              <div>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
            </div>

            <Button fullWidth color="secondary">
              <Typography variant="caption">
                Forgor Password?
              </Typography>
            </Button>
          </Card>
          <Card className={classes.loginCard}>
            <Typography align="right" variant="body2">
              Have an account?
            </Typography>
            <Link to="/accounts/login">
              <Button color="primary" className={classes.loginButton}>
                Log In
              </Button>
            </Link>
          </Card>
        </article>
      </section>
    </>
  )
}

export default SignUpPage;
