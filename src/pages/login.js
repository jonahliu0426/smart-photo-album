import {
  Button,
  Card,
  CardHeader,
  TextField,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/shared/Seo";
import { useLoginPageStyles } from "../styles";
import FacebookIconBlue from "../images/facebook-icon-blue.svg";
import FacebookIconWhite from "../images/facebook-icon-white.png";

const LoginPage = () => {
  const classes = useLoginPageStyles();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = (event) => {
    event.preventDefault()
    setShowPassword(!showPassword)
  }

  // const handleMouseDownPassword = () => setShowPassword(!showPassword)

  return (
    <>
      <SEO title="Login" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <CardHeader className={classes.cardHeader} />
            <form>
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
                type={showPassword ? "text" : "password"}
                margin="dense"
                className={classes.textField}
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        fullWidth
                        fullHeight
                        className={classes.adornedEndButton}
                        onClick={handleClickShowPassword}
                        type="submit"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </Button>

                    </InputAdornment>
                  ),
                  classes: {
                    adornedEnd: classes.adornedEnd
                  }
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
            <LoginWithFacebook color="secondary" iconColor="blue" />
            <Button fullWidth color="secondary">
              <Typography variant="caption">
                Forgor Password?
              </Typography>
            </Button>
          </Card>
          <Card className={classes.signUpCard}>
            <Typography align="right" variant="body2">
              Don't have an account?
            </Typography>
            <Link to="/accounts/emailsignup">
              <Button color="primary" className={classes.button}>
                Sign up
              </Button>
            </Link>
          </Card>
        </article>
      </section>
    </>
  )
}

export const LoginWithFacebook = ({ color, iconColor, variant }) => {
  const classes = useLoginPageStyles();
  const facebookIcon = iconColor === "blue" ? FacebookIconBlue : FacebookIconWhite;

  return (
    <Button fullWidth color={color} variant={variant}>
      <img
        src={facebookIcon}
        alt="facebook icon"
        className={classes.facebookIcon}
      />
      Log In With Facebook
    </Button>
  )
}

export default LoginPage;

