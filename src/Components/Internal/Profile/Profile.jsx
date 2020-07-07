import React, { useState } from 'react';
import clsx from 'clsx';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import styles from '../../Extras/styles';
import Breadcrumb from '../Layout/Breadcrumb';
import { getSidebar } from '../Layout/Sidebar';
import { useSelector } from 'react-redux';
import md5 from 'md5';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Toastrr from '../../Extras/Toastrr';
import Backdrop from '@material-ui/core/Backdrop';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CircularProgress from '@material-ui/core/CircularProgress';
import { update } from '../../../Store/Actions/AuthActions';
import { Tooltip } from '@material-ui/core';
import { getBaseURL } from '../../Extras/server';
import { IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import { FormikTextField } from 'formik-material-fields';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    firstname: Yup
        .string()
        .required('Please Fill In Your First Name'),
    lastname: Yup
        .string()
        .required('Please Fill In Your Last Name'),
    email: Yup
        .string()
        .required('Please Fill In Your Email Adress')
        .email('Invalid Email Adress Format'),
    username: Yup
        .string()
        .required('Please Fill In Your Username'),
    password: Yup
        .string()
        .min(8, 'Password Must Contain At Least 8 Characters'),
    confirm_password: Yup
        .string()
        .test('password-mismatch', 'Passwords Don\'t Match', function(value) {
            return this.parent.password === value;
        }),
});

function Profile({ history }) {
    const admin   = useSelector(state => state.authReducer.admin);
    const classes = styles();
    const sidebar = admin && getSidebar(admin.access_level);
    const visible = useSelector(state => state.sidebarReducer.visible);

    const dispatch      = useDispatch();
    const displayImg    = admin && getBaseURL()+admin.image;
    const initialValues = {
        id               : admin && admin.id,
        email            : admin && admin.email,
        lastname         : admin && admin.lastname,
        password         : '',
        username         : admin && admin.username,
        firstname        : admin && admin.firstname,
        access_level     : admin && admin.access_level,
        confirm_password : '',
    };

    const [error, setError]               = useState(false);
    const [message, setMessage]           = useState('');
    const [success, setSuccess]           = useState('');
    const [warning, setWarning]           = useState(false);
    const [backdrop, setBackdrop]         = useState(false);
    const [comError, setComError]         = useState(false);
    const [imageObject, setImageObject]   = useState('');
    const [imagePreview, setImagePreview] = useState(displayImg);

    React.useEffect(() => {
        document.title = 'RiiVe Admin | Profile';
    }, [admin, history]);
    
    const displayImage = (event) => {
        setImageObject(event.target.files[0]);
        setImagePreview(URL.createObjectURL(event.target.files[0]));
    }
    const onSubmit     = (values) => {
        setWarning(false);
        const password         = values.password.trim();
        const confirm_password = values.confirm_password.trim();
        // if(password.length && confirm_password.length) {
            setError(false);
            setSuccess(false);
            setBackdrop(true);
            setComError(false)
            const abortController = new AbortController();
            const signal          = abortController.signal;
            
            let formData = new FormData();
            formData.append('id',    values.id);
            formData.append('f',     values.firstname);
            formData.append('l',     values.lastname);
            formData.append('ea',    values.email);
            formData.append('image', imageObject);
            formData.append('u',     values.username);
            formData.append('p',     md5(password));
            formData.append('al',    values.access_level);
            formData.append('cp',    md5(confirm_password));
            
            Axios.post(getBaseURL() + 'update_profile_admin', formData, { signal: signal })
                .then(response => {
                    if(response.data[0].status.toLowerCase() === 'success') {
                        setSuccess(true);
                        dispatch(update(response.data[0].user[0]));
                        setMessage(response.data[0].message);
                    } else {
                        setError(true);
                        setMessage(response.data[0].message);
                    }
                    setBackdrop(false);
                })
                .catch(error => {
                    setMessage('Network Error. Server Unreachable....');
                    setBackdrop(false);
                    setComError(true);
                });

            return () => abortController.abort();
        // } else {
        //     setWarning(true);
        //     setMessage('Password Cannot Contain Only Spaces....');
        // }
    }
    
    return (
        <>
            { error    && <Toastrr message={message} type="error"   />}
            { success  && <Toastrr message={message} type="success" />}
            { warning  && <Toastrr message={message} type="warning" />}
            { comError && <Toastrr message={message} type="info"    />}
            <Backdrop className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" /> <span className='ml-15'>Updating Profile....</span>
            </Backdrop>
            <Header admin={admin} />
            {sidebar}
            <main
                className={clsx(classes.contentMedium, {
                    [classes.contentWide]: !visible,
                })}>
                <Breadcrumb page="Profile" />
                <Card className="pt-40 pr-40 pb-10 pl-40" variant="outlined">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={values => onSubmit(values)} >
                        {({ isValid, dirty, resetForm }) => (
                            <Form encType="multipart/form-data">
                                <Grid container spacing={3}>
                                    <Grid className={classes.fullHeight} item xs={12} md={3}>
                                        <div className={classes.fullHeightDiv}>
                                            <img
                                                src={imagePreview}
                                                width="75%"
                                                height="100%"
                                                alt="Profile"
                                                className="border-radius mb-30" />
                                        </div>
                                        <div>
                                            <Tooltip title="Upload Image">
                                                <label htmlFor="image">
                                                    <IconButton
                                                        color="primary"
                                                        aria-label="upload picture"
                                                        component="span">
                                                        <PhotoCamera />
                                                    </IconButton>
                                                </label>
                                            </Tooltip>
                                            <FormikTextField
                                                onChange={displayImage}
                                                className="hidden"
                                                id="image"
                                                name="image"
                                                type="file" />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <FormikTextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    id="firstname"
                                                    label="First Name"
                                                    placeholder="First Name"
                                                    name="firstname" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <FormikTextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    id="lastname"
                                                    label="Last Name"
                                                    placeholder="Last Name"
                                                    name="lastname" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <FormikTextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    id="email"
                                                    label="Email Address"
                                                    placeholder="Email Address"
                                                    name="email" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <FormikTextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    id="username"
                                                    label="Username"
                                                    placeholder="Username"
                                                    name="username" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <FormikTextField
                                                    type="password"
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    id="password"
                                                    label="Password"
                                                    placeholder="Password"
                                                    name="password" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <FormikTextField
                                                    type="password"
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    id="confirm_password"
                                                    label="Re-enter Password"
                                                    placeholder="Re-enter Password"
                                                    name="confirm_password" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} style={{borderTop: '1px solid #ddd', marginTop: 40}}>
                                    <Grid item xs={12} className="text-right">
                                        <Tooltip title="Reset Form">
                                            <Button
                                                onClick={resetForm}
                                                color="secondary">
                                                Reset
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="Save">
                                            <Button
                                                type="submit"
                                                disabled={!(isValid && dirty)}
                                                color="primary">
                                                Save
                                            </Button>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Card>
            </main>
            <Footer />
        </>
    )
}

export default Profile;
