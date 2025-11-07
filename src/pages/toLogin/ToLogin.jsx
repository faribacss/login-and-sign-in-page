// MUI Components
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

// React Hook Form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// React Hooks
import { useState, useContext } from "react";

// React Router Components
import { Link, useNavigate } from "react-router-dom";

// CSS Module Styles
import styles from "@/pages/toLogin/ToLogin.module.css";

// ShowPassword Component
import ShowPassword from "@/components/ShowPassword";

// Context
import { SaveInfoContext } from "@/components/SaveInfo";

// Social Buttons Component
// import SocialLoginButtons from "component/SocialLoginButtons";

// Utilities (Alert)
import showErrorAlert from "@/utilities/showErrorAlert";
import showSuccessAlert from "@/utilities/showSuccessAlert";
import { DevTool } from "@hookform/devtools";

// Import the image for the login page
import loginImage from "@/assets/public/img/1.jpg";

// Login Validation Schema
const loginSchema = yup.object({
  identifier: yup
    .string()
    .required("Email or Username is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

function ToLogin() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const { loginUser } = useContext(SaveInfoContext);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const user = await loginUser({
        identifier: data.identifier,
        password: data.password,
      });
      setIsSuccess(true);
      showSuccessAlert("login");
      // Navigate after short delay to show success state
      setTimeout(() => {
        navigate("/welcome");
      }, 1500);

      return user;
    } catch (error) {
      showErrorAlert("login");
      console.error("Login error:", error);
    }
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent={{ xs: "center" }}>
      <Grid className={styles.container}>
        <Box component="section">
          <Typography variant="h2" gutterBottom className="auth-title">
            Welcome back!
          </Typography>
          <Typography variant="subtitle2" className={styles.subtitle}>
            Enter your Credentials to access your account
          </Typography>
          <Box component="form" onSubmit={handleSubmit(handleLogin)}>
            <Grid container spacing={2} direction="column">
              <Grid>
                <TextField
                  required
                  fullWidth
                  type="email"
                  {...register("identifier")}
                  label="Enter your email"
                  className="auth-text-field"
                  variant="outlined"
                  color="success"
                  error={!!errors.identifier}
                  helperText={errors.identifier?.message}
                />
              </Grid>
              <Grid>
                <TextField
                  required
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  label="Password"
                  className="auth-text-field"
                  variant="outlined"
                  color="success"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <ShowPassword
                        showPassword={showPassword}
                        onToggle={() => setShowPassword(!showPassword)}
                      />
                    ),
                  }}
                />
              </Grid>
              <Grid>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        color="success"
                      />
                    }
                    label="Remember for 30 days"
                  />
                </FormGroup>
              </Grid>
              <Grid>
                <Button
                  onClick={handleSubmit(handleLogin)}
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting || isSuccess}
                  fullWidth
                  className={`auth-button-base ${
                    isSuccess ? "auth-success-button" : "auth-primary-button"
                  }`}>
                  {isSuccess
                    ? "✓ Login Successful!"
                    : isSubmitting
                    ? "Signing in..."
                    : "Login"}
                </Button>
              </Grid>
              {/* <Grid>
              <Typography variant="body2" className="auth-or-text">
                Or
              </Typography>
            </Grid>

            <Grid>
              <SocialLoginButtons />
            </Grid> */}
            </Grid>
          </Box>
          <Typography className="auth-bottom-text">
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Grid>
      <Grid>
        <Box
          component="img"
          className="auth-image-box"
          alt="Login Illustration"
          src={loginImage}
        />
      </Grid>
      <DevTool control={control} />
    </Grid>
  );
}
export default ToLogin;
