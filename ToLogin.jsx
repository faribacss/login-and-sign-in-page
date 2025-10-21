import "./ToLogin.css"
import { Box, Button, Checkbox, Chip, FormControlLabel, FormGroup, Grid, Stack, TextField, Typography } from "@mui/material";
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from "react-router-dom";

function ToLogin() {
    return(
        <Grid container spacing={2} alignItems="center" justifyContent={{ xs: 'center' }}>
      <Grid item xs={12} md={6} margin='0 auto'>
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
                fullWidth 
                label="Email" 
                sx={{width: "404px", height: "58px"}} 
                variant="outlined" 
                color="success"
              />
            </Grid>
            <Grid item>
              <TextField 
                fullWidth 
                label="Password" 
                type="password"
                sx={{width: "404px", height: "58px"}} 
                variant="outlined" 
                color="success"
                className="forgotpass"
              />
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
                Signup
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