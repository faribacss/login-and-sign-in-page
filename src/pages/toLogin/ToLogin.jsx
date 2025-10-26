import "../../index.css";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {login} from "../../services/authentication";
import showSuccessAlert from "../utilities/showSuccessAlert";
import showErrorAlert from "../utilities/showErrorAlert";
import styles from "../../styles/ToLogin.module.css";
import SocialLoginButtons from "../../component/SocialLoginButtons";
import ShowPassword from "../../component/ShowPassword";

function ToLogin() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const user = await login({ identifier, password });
            showSuccessAlert("login");
            navigate("/welcome");
            return user;
        } catch (error) {
            showErrorAlert("login");
            console.error("Login error:", error);
        }
    }

    return(
        <Grid container spacing={2} alignItems="center" justifyContent={{ xs: 'center' }}>
      <Grid item xs={12} md={6} className={styles.container}>
        <Box component="section">
          <Typography 
            variant="h2" 
            gutterBottom
            className="auth-title"
          >
            Welcome back!
          </Typography>
            <Typography variant="subtitle2" className={styles.subtitle}>
                Enter your Credentials to access your account
            </Typography>
          
          <Grid container spacing={2} direction="column">
            <Grid item>
              <TextField
                onChange={(e) => setIdentifier(e.target.value)}
                fullWidth
                label="Email"
                className="auth-text-field"
                variant="outlined"
                color="success"
              />
            </Grid>
            <Grid item>
              <FormControl fullWidth variant="outlined" color="success" className="forgotpass">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                    <ShowPassword 
                        showPassword={showPassword} 
                        onToggle={() => setShowPassword(!showPassword)} 
                    />
                    }
                    label="Password"
                />
                </FormControl>
            </Grid>
            <Grid item>
              <FormGroup>
                <FormControlLabel 
                  control={<Checkbox />} 
                  label="Remember for 30 days" 
                />
              </FormGroup>
            </Grid>
            
            <Grid item>
              <Button 
                variant="contained"
                onClick={handleLogin} 
                className="auth-button-base auth-primary-button"
              >
                Login
              </Button>
            </Grid>
            
            <Grid item>
              <Typography variant="body2" className="auth-or-text">
                Or
              </Typography>
            </Grid>
            
            <Grid item>
              <SocialLoginButtons/>
            </Grid>
          </Grid>
          <Typography className="auth-bottom-text">
            Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link>
          </Typography>
        </Box>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Box
          component="img"
          className="auth-image-box"
          alt="Login Illustration"
          src="img/1.jpg"
        />
      </Grid>
    </Grid>
    )
}
export default ToLogin