import "./ToLogin.css"
import { Box, Button, Checkbox, Chip, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {login} from "../../services/authentication";
import IsTrue from "../utilities/IsTrue";
import IsFalse from "../utilities/IsFalse";

function ToLogin() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const user = await login({ identifier, password });
            IsTrue({ type: "login" });
            navigate("/welcome");
            return user;
        } catch (error) {
            IsFalse({ type: "login" });
            console.error("Login error:", error);
        }
    }

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
    event.preventDefault();};
    const handleMouseUpPassword = (event) => {
    event.preventDefault();};

    return(
        <Grid container spacing={2} alignItems="center" justifyContent={{ xs: 'center' }}>
      <Grid item xs={12} md={6} margin='25px auto'>
        <Box component="section">
          <Typography 
            variant="h2" 
            gutterBottom
            sx={{
              fontFamily: "Poppins",
              fontWeight: 800,
              fontSize: "30px",
              letterSpacing: "0.01em",
              gap: "10px",
            }}
          >
            Welcome back!
          </Typography>
            <Typography variant="subtitle2" sx={{ marginBottom: '55px', fontWeight: 400, fontSize: "16px",}}>
                Enter your Credentials to access your account
            </Typography>
          
          <Grid container spacing={2} direction="column">
            <Grid item>
              <TextField
                onChange={(e) => setIdentifier(e.target.value)}
                fullWidth
                label="Email"
                sx={{ width: "404px", height: "58px" }}
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
                    <InputAdornment position="end">
                        <IconButton
                        aria-label={
                            showPassword ? 'hide the password' : 'display the password'
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
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
                sx={{
                  width: "404px",
                  height: "48px",
                  padding: "10px",
                  borderRadius: "10px",
                  color: "#FFFFFF",
                  backgroundColor: "#3A5B22",
                  border: "1px solid #3A5B22",
                  '&:hover': {
                    backgroundColor: "#2d4619"
                  }
                }}
              >
                Login
              </Button>
            </Grid>
            
            <Grid item>
              <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                Or
              </Typography>
            </Grid>
            
            <Grid item>
              <Stack 
                direction="row" 
                spacing={2} 
                sx={{
                  width: "100%", 
                  mt: 2, 
                  justifyContent: "center"
                }}
              >
                <Chip 
                  className="connections" 
                  icon={<GoogleIcon color="primary" />} 
                  label="Sign in with Google" 
                />
                <Chip 
                  className="connections" 
                  icon={<AppleIcon sx={{ color: "#000000" }} />} 
                  label="Sign in with Apple" 
                />
              </Stack>
            </Grid>
          </Grid>
          <Typography sx={{ mt: 3, textAlign: "center",}}>
            Don’t have an account? <Link to="/signup" style={{ textDecoration: 'none' }}>Sign Up</Link>
          </Typography>
        </Box>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Box
          component="img"
          sx={{
            width: "781.5px",
            height: "auto",
            borderTopLeftRadius: "45px",
            borderBottomLeftRadius: "45px",
            maxWidth: { xs: '100%', md: 'auto' }
          }}
          alt="Login Illustration"
          src="img/1.jpg"
        />
      </Grid>
    </Grid>
    )
}
export default ToLogin