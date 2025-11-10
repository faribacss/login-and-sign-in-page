// Library
import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";

// Context
import { SaveInfoContext } from "@/context/SaveInfo.jsx";

// Components
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
import { Link, useNavigate } from "react-router-dom";
import ShowPassword from "@/components/ShowPassword";
// import SocialLoginButtons from "@/component/SocialLoginButtons";

// Utilities (Alert)
import showErrorAlert from "@/utilities/showErrorAlert";
import showSuccessAlert from "@/utilities/showSuccessAlert";

// CSS Module Styles
import styles from "@/pages/toSignUp/ToSignUp.module.css";

// React Hook Form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// image
import loginImage from "@/assets/public/img/1.jpg";

// Validation Schema
export const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .matches(
      /^[A-Za-z\u0600-\u06FF\uAC00-\uD7AF0-9][A-Za-z\u0600-\u06FF\uAC00-\uD7AF0-9._@$-]*$/u,
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
  const { t, i18n } = useTranslation();
  const isRtl = i18n?.language?.startsWith("fa");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(signUpSchema), mode: "onBlur" });

  // state and context
  const { register: registerUser } = useContext(SaveInfoContext);
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
      console.error(" Registration error:", error);
      // error message from API
      const errorMessage =
        error.response?.data?.error?.message ||
        error.message ||
        "An unexpected error occurred during registration";

      showErrorAlert("signUp", errorMessage);
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
      justifyContent={{ xs: "center", md: "center" }}
    >
      <Grid item xs={12} md={6} className={styles.container}>
        <Box component="section">
          <Typography
            component="h4"
            variant="h4"
            gutterBottom
            className={`auth-title ${styles.title}`}
          >
            {t("signup.title")}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(handleRegister)}
            noValidate
          >
            <Grid container spacing={2} direction="column">
              <Grid item>
                <TextField
                  required
                  fullWidth
                  {...register("username")}
                  placeholder={t("signup.usernameLabel")}
                  type="text"
                  className="auth-text-field"
                  variant="outlined"
                  color="success"
                  autoComplete="new-username"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  InputLabelProps={{
                    style: {
                      width: "100%",
                      textAlign: isRtl ? "right" : "left",
                      direction: isRtl ? "rtl" : "ltr",
                    },
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  fullWidth
                  type="email"
                  {...register("email")}
                  placeholder={t("signup.emailLabel")}
                  className="auth-text-field"
                  variant="outlined"
                  color="success"
                  autoComplete="new-email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputLabelProps={{
                    style: {
                      width: "100%",
                      textAlign: isRtl ? "right" : "left",
                      direction: isRtl ? "rtl" : "ltr",
                    },
                  }}
                />
              </Grid>
              <Grid>
                <TextField
                  required
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder={t("signup.passwordLabel")}
                  className="auth-text-field"
                  variant="outlined"
                  color="success"
                  autoComplete="new-password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputLabelProps={{
                    style: {
                      width: "100%",
                      textAlign: isRtl ? "right" : "left",
                      direction: isRtl ? "rtl" : "ltr",
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <ShowPassword
                        showPassword={showPassword}
                        onToggle={() => setShowPassword(!showPassword)}
                      />
                    ),
                    style: { direction: isRtl ? "rtl" : "ltr" },
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
                    label={t("signup.policy")}
                    className={styles.policyLabel}
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
                  }`}
                >
                  {isSuccess
                    ? t("signup.button.success")
                    : isSubmitting
                    ? t("signup.button.registering")
                    : t("signup.button.signup")}
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
            {t("signup.haveAccount")}{" "}
            <Link to="/" className="auth-link">
              {t("signup.login")}
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
    </Grid>
  );
}

export default ToSignUp;
