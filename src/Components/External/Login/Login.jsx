import React, { useEffect, useState } from 'react';
import md5 from 'md5';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Toastrr from '../../Extras/Toastrr';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import { logIn } from '../../../Store/Actions/AuthActions';
import { makeStyles } from '@material-ui/core/styles';
import { getBaseURL } from '../../Extras/server';
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import { FormikTextField } from 'formik-material-fields';
import * as Yup from 'yup';
import './Login.css';

const initialValues = {
    username : 'freda',
    password : '12345678'
}
const validationSchema = Yup.object().shape({
    username : Yup
             .string()
             .required('Please Fill In Your Username or Email Address'),
    password : Yup
             .string()
             .required('Please Fill In Your Password')
             .min(8, 'Password Must Be At Least 8 Characters Long')
});
const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

const Login = ({ history }) => {
    const classes  = useStyles();
    const dispatch = useDispatch();

    const [error, setError]       = useState(false);
    const [message, setMessage]   = useState('');
    const [success, setSuccess]   = useState(false);
    const [warning, setWarning]   = useState(false);
    const [backdrop, setBackdrop] = useState(false);
    const [comError, setComError] = useState(false);

    useEffect(() => {
        document.title = 'RiiVe Admin | Login';
    }, []);
    
    const onSubmit = values => {
        setWarning(false);
        const username = values.username.trim();
        const password = values.password.trim();

        if(username.length && password.length) {
            setBackdrop(true);
            const abortController = new AbortController();
            const signal          = abortController.signal;

            setError(false);
            setSuccess(false);
            setComError(false);
            
            Axios.post(getBaseURL()+'login', { zxszas: values.username, njhbgt: md5(values.password) }, { signal: signal })
                .then(response => {
                    if(response.data[0].status[0].status.toLowerCase() === 'success') {
                        setSuccess(true);
                        setMessage(response.data[0].status[0].message);
                        dispatch(logIn(response.data[0].user[0]));
                        setTimeout(() => history.push('/dashboard/'), 2050);
                    } else {
                        setError(true);
                        setMessage(response.data[0].status[0].message);
                    }
                    setBackdrop(false);
                })
                .catch(error => {
                    setBackdrop(false);
                    setComError(true);
                    setMessage('Network Error. Server Unreachable....');
                });

            return () => abortController.abort();
        } else {
            setWarning(true);
            setMessage('Username/Email Address And Password Required....');
        }
    }

    return (
        <>
            { error    && <Toastrr message={message} type="error" /> }
            { success  && <Toastrr message={message} type="success" /> }
            { warning  && <Toastrr message={message} type="warning" /> }
            { comError && <Toastrr message={message} type="info"    /> }
            <Backdrop className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" /> <span className='ml-15'>Authenticating....</span>
            </Backdrop>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {() => (   
                    <div className='login-div'>
                        <Form className="login-form">
                            <Typography className="mb-30" component="h1" variant="h4">
                                Admin Log In
                            </Typography>
                            <FormikTextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="username"
                                label="Username/Email Address"
                                placeholder="Username/Email Address"
                                name="username"
                                autoComplete="email address"
                            />
                            <FormikTextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="password"
                                label="Password"
                                placeholder="Password"
                                name="password"
                                type="password"
                            />
                            <Button
                                size="large"
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className='text-capitalise mt-20'
                                disableElevation>
                                Log In
                            </Button>
                            <Link to="/password-recovery/" variant="body2" className="mt-20">
                                Forgot password?
                            </Link>
                        </Form>
                    </div>
                )}
            </Formik>
        </>
    );
}

export default Login;
