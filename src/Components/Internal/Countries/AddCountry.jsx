import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Toastrr from '../../Extras/Toastrr';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
// import DialogContentText from '@material-ui/core/DialogContentText';
import { Tooltip } from '@material-ui/core';
import { getBaseURL } from '../../Extras/server';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { FormikTextField } from 'formik-material-fields';
import { DialogContent, DialogActions, DialogTitle, Transition } from '../../Extras/Dialogue';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    country_code: Yup
        .string()
        .required('Please Fill In Country Code'),
    country_name: Yup
        .string()
        .required('Please Fill In Country Name'),
});
const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

function AddCountry({ closeModal, closeExpandable }) {
    const classes = useStyles();
    const admin   = useSelector(state => state.authReducer.admin);

    const initialValues = {
        country_code : '',
        country_name : '',
        admin        : admin.id,
    };
    const [open, setOpen]         = useState(true);
    const [error, setError]       = useState(false);
    const [message, setMessage]   = useState('');
    const [backdrop, setBackdrop] = useState(false);
    const [comError, setComError] = useState(false);
    // const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleClose = () => { setOpen(false); closeModal(); }
    // const confirmSubmit  = event => {
    //     event.preventDefault();
    //     setIsConfirmOpen(true);
    // };
    // const onSubmit    = (action, values) => {
    const onSubmit    = (values) => {
        // setIsConfirmOpen(false);
        // if(action.toLowerCase() === 'yes') {
            const abortController = new AbortController();
            const signal          = abortController.signal;
            setError(false);
            setBackdrop(true);
            setComError(false);

            Axios.post(getBaseURL()+'add_country', values, { signal: signal })
                .then(response => {console.log(response.data[0])
                    if(response.data[0].status.toLowerCase() === 'success') {
                        setOpen(false);
                        closeExpandable(response.data[0].message);
                    } else {
                        setError(true);
                        setMessage(response.data[0].message);
                    }
                    setBackdrop(false);
                })
                .catch(error => {
                    setComError(true);
                    setBackdrop(false);
                    setMessage('Network Error. Server Unreachable....');
                });

            return () => abortController.abort();
        // }
    }

    return (
        <>
            { error     && <Toastrr message={message} type="warning" />}
            { comError  && <Toastrr message={message} type="info" />}
            <Backdrop className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" /> <span className='ml-15'>Adding Country....</span>
            </Backdrop>
            {/* { isConfirmOpen &&
                <div>
                    <Dialog
                        open={isConfirmOpen}
                        keepMounted
                        onClose={handleClose}
                        disableBackdropClick={true}
                        disableEscapeKeyDown={true}
                        TransitionComponent={Transition}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description" >
                        <DialogTitle id="alert-dialog-slide-title">Confirm Action</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Are You Sure You Want To Add Country?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => onSubmit('No')} color="primary">
                                No
                            </Button>
                            <Button onClick={() => onSubmit('Yes')} color="secondary">
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            } */}
            <Dialog
                TransitionComponent={Transition}
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
                scroll='paper'
                fullWidth={true}
                maxWidth='sm'
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit} >
                    {({ isValid, dirty, resetForm, values }) => (
                        <Form>
                            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                Add Country
                            </DialogTitle>
                            <DialogContent dividers>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <FormikTextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="country_code"
                                            label="Country Code"
                                            placeholder="Country Code"
                                            name="country_code" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormikTextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="country_name"
                                            label="Country Name"
                                            placeholder="Country Name"
                                            name="country_name" />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Tooltip title="Reset Form">
                                    <Button
                                        onClick={resetForm}
                                        color="secondary">
                                        Reset
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Add Country Details">
                                    <Button
                                        type="submit"
                                        disabled={!(isValid && dirty)}
                                        color="primary">
                                        Add Country
                                    </Button>
                                </Tooltip>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </>
    );
}

export default AddCountry;
