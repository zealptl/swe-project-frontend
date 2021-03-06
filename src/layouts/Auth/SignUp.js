import React from 'react';
import { useState, useEffect, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { OutlinedInput } from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alerts/alertContext';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Restaurant App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { signup, msg, error, clearErrors, clearMsg } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (error) {
      setAlert(error, 'error');
      clearErrors();
    }

    if (msg === 'Account waiting for approval') {
      setAlert(msg, 'success');
      clearMsg();
    }
    // eslint-disable-next-line
  }, [error, msg]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [address, setAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInput = (event) => {
    const target = event.target;
    switch (target.name) {
      case 'firstName':
        setFirstName(target.value);
        break;
      case 'lastName':
        setLastName(target.value);
        break;
      case 'userType':
        setUserType(target.value);
        break;
      case 'email':
        setEmail(target.value);
        break;
      case 'password':
        setPassword(target.value);
        break;
      case 'repeatPassword':
        setRepeatPassword(target.value);
        break;
      case 'address':
        setAddress(target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== repeatPassword) {
      setAlert('Passwords must match', 'error');
    } else if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !repeatPassword ||
      !userType
    ) {
      setAlert('Please enter all fields', 'error');
    } else {
      signup({
        firstName,
        lastName,
        email,
        password,
        userType,
        address,
      });
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                onInput={handleInput}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lname'
                onInput={handleInput}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl variant='outlined' fullWidth>
                <InputLabel htmlFor='outlined-userType-native-simple'>
                  User Type*
                </InputLabel>
                <Select
                  native
                  value={userType}
                  onInput={handleInput}
                  label='User Type'
                  inputProps={{
                    name: 'userType',
                    id: 'outlined-userType-native-simple',
                  }}
                >
                  <option aria-label='None' value='' />
                  <option value='customer'>Customer</option>
                  <option value='chef'>Chef</option>
                  <option value='delivery'>Delivery</option>
                  <option value='manager'>Manager</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                type='email'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                onInput={handleInput}
                error={emailRegex.test(email) || email === '' ? false : true}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant='outlined'
                fullWidth
                error={
                  passwordRegex.test(password) || password === '' ? false : true
                }
              >
                <InputLabel htmlFor='outlined-adornment-password'>
                  Password*
                </InputLabel>
                <OutlinedInput
                  required
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  autoComplete='current-password'
                  onInput={handleInput}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={80}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant='outlined'
                fullWidth
                error={repeatPassword !== password ? true : false}
              >
                <InputLabel htmlFor='outlined-adornment-password'>
                  Repeat Password*
                </InputLabel>
                <OutlinedInput
                  required
                  name='repeatPassword'
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  autoComplete='current-password'
                  onInput={handleInput}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={140}
                />
              </FormControl>
            </Grid>
            {userType === 'customer' && (
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  type='address'
                  required
                  fullWidth
                  id='address'
                  label='Address'
                  name='address'
                  autoComplete='address'
                  onInput={handleInput}
                />
              </Grid>
            )}
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <RouterLink to='/auth/signin'>
                <Link variant='body2'>Already have an account? Sign in</Link>
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
