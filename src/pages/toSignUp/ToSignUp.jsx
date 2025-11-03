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

// React Router Components
import { Link, useNavigate } from "react-router-dom";

// React Hooks
import { useState } from "react";

// Services
import { registerUser } from "@/services/authentication";

// Utilities (Alert)
import showErrorAlert from "@/utilities/showErrorAlert";
import showSuccessAlert from "@/utilities/showSuccessAlert";

// CSS Module Styles
import styles from "@/pages/toSignUp/ToSignUp.module.css";

// ShowPassword Component
import ShowPassword from "@/components/ShowPassword";

// React Hook Form
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// Social Buttons Component
// import SocialLoginButtons from "@/component/SocialLoginButtons";

// Import the image for the signup page
import loginImage from "@/assets/public/img/1.jpg";

// Validation Schema
const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .matches(
      /^[a-zA-Z0-9][a-zA-Z0-9._@$-]*$/,
      "Username must start with a letter or number"
    ),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(
      /^[a-zA-Z0-9][a-zA-Z0-9._@$-]*$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

function ToSignUp() {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(signUpSchema), mode: "onBlur" });

  const [showPassword, setShowPassword] = useState(false);
  const [checkPolicy, setCheckPolicy] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      const user = await registerUser(data);
      setIsSuccess(true);
      showSuccessAlert("signUp");

      // Clear form fields and reset all states for New Registration
      reset({ username: "", email: "", password: "" });
      setCheckPolicy(false);

      // Navigate after short delay to show success state
      setTimeout(() => {
        navigate("/welcome");
      }, 1500);

      return user;
    } catch (error) {
      console.error("❌ Registration error:", error);
      showErrorAlert("signUp");
    }
  };
  const handlePolicyChange = (e) => {
    setCheckPolicy(e.target.checked);
  };
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent={{ xs: "center", md: "center" }}>
      <Grid item xs={12} md={6} className={styles.container}>
        <Box component="section">
          <Typography
            component="h4"
            variant="h4"
            gutterBottom
            className={`auth-title ${styles.title}`}>
            Get Started Now
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(handleRegister)}
            noValidate>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <TextField
                  required
                  fullWidth
                  {...register("username")}
                  label="UserName"
                  type="text"
                  className="auth-text-field"
                  variant="outlined"
                  color="success"
                  autoComplete="new-username"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  fullWidth
                  type="email"
                  {...register("email")}
                  label="Email"
                  className="auth-text-field"
                  variant="outlined"
                  color="success"
                  autoComplete="new-email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  label="Password"
                  className="auth-text-field"
                  variant="outlined"
                  color="success"
                  autoComplete="new-password"
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
              <Grid item>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkPolicy}
                        onChange={handlePolicyChange}
                        className="auth-checkBox"
                      />
                    }
                    label="I agree to the terms & policy"
                  />
                </FormGroup>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!checkPolicy || isSubmitting || isSuccess}
                  fullWidth
                  className={`auth-button-base ${
                    isSuccess
                      ? "auth-success-button"
                      : checkPolicy
                      ? "auth-primary-button"
                      : "auth-disabled-button"
                  }`}>
                  {isSuccess
                    ? "✓ Registration Successful!"
                    : isSubmitting
                    ? "Creating Account..."
                    : "Sign up"}
                </Button>
              </Grid>
              {/* <Grid item>
              <Typography variant="body2" className="auth-or-text">
                Or
              </Typography>
            </Grid>
            <Grid item>
              <SocialLoginButtons/>
            </Grid> */}
            </Grid>
          </Box>
          <Typography className="auth-bottom-text">
            Have an account?{" "}
            <Link to="/" className="auth-link">
              Sign In
            </Link>
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
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

export default ToSignUp;
