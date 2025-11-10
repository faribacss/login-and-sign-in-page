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
// import SocialLoginButtons from "component/SocialLoginButtons";

// React Hook Form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// CSS Module Styles
import styles from "@/pages/toLogin/ToLogin.module.css";

// Utilities (Alert)
import showErrorAlert from "@/utilities/showErrorAlert";
import showSuccessAlert from "@/utilities/showSuccessAlert";

// image
import loginImage from "@/assets/public/img/1.jpg";

// Validation Schema
export const loginSchema = yup.object({
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
  const { t, i18n } = useTranslation();
  const isRtl = i18n?.language?.startsWith("fa");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  // state and context
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
      // error message from API
      const errorMessage =
        error.response?.data?.error?.message ||
        error.message ||
        "An unexpected error occurred";

      showErrorAlert("login", errorMessage);
      console.error("Login error:", error);
    }
  };
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent={{ xs: "center" }}
    >
      <Grid className={styles.container}>
        <Box component="section">
          <Typography variant="h2" gutterBottom className="auth-title">
            {t("login.title")}
          </Typography>
          <Typography variant="subtitle2" className={styles.subtitle}>
            {t("login.subtitle")}
          </Typography>
          <Box component="form" onSubmit={handleSubmit(handleLogin)}>
            <Grid container spacing={2} direction="column">
              <Grid>
                <TextField
                  required
                  fullWidth
                  type="email"
                  {...register("identifier")}
                  placeholder={t("login.emailLabel")}
                  InputLabelProps={{
                    style: {
                      width: "100%",
                      textAlign: isRtl ? "right" : "left",
                      direction: isRtl ? "rtl" : "ltr",
                    },
                  }}
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
                  placeholder={t("login.passwordLabel")}
                  InputLabelProps={{
                    style: {
                      width: "100%",
                      textAlign: isRtl ? "right" : "left",
                      direction: isRtl ? "rtl" : "ltr",
                    },
                  }}
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
                    style: { direction: isRtl ? "rtl" : "ltr" },
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
                    label={t("login.remember")}
                    className={styles.rememberMeLabel}
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
                  }`}
                >
                  {isSuccess
                    ? t("login.button.success")
                    : isSubmitting
                    ? t("login.button.signing")
                    : t("login.button.login")}
                </Button>
              </Grid>
              <Grid>
                <Typography className="auth-bottom-text">
                  {t("login.noAccount")}{" "}
                  <Link to="/signup" className="auth-link">
                    {t("login.signup")}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
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
    </Grid>
  );
}
export default ToLogin;
