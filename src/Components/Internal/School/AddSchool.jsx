import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Loader from '../../Extras/LoadrrInnerRow';
import Select from 'react-select';
import Toastrr from '../../Extras/Toastrr';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import makeAnimated from 'react-select/animated';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Tooltip } from '@material-ui/core';
import { getBaseURL } from '../../Extras/server';
import { makeStyles } from '@material-ui/core/styles';
import { storeRegions } from '../../../Store/Actions/RegionsActions';
import { storeCountries } from '../../../Store/Actions/CountriesActions';
import { storeSchoolFormValues } from '../../../Store/Actions/SchoolFormAction';
import { useSelector, useDispatch } from 'react-redux';
import { DialogContent, DialogActions, DialogTitle, Transition } from '../../Extras/Dialogue';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));
const countryToFlag = isoCode => {
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode
            .toUpperCase()
            .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
};
const animatedComponents = makeAnimated();

function AddSchool({ closeModal, closeExpandable }) {
    const admin      = useSelector(state => state.authReducer.admin);
    const countries  = useSelector(state => state.countriesReducer.countries);
    const regions    = useSelector(state => state.regionsReducer.regions);
    const classes    = useStyles();
    const formValues = useSelector(state => state.schoolFormReducer.values);
    const dispatch   = useDispatch();
// console.log('formValues: ', formValues);
    const [values, setValues] = useState(formValues);
    // const [values, setValues] = useState([
    //     { id           : admin.id },
    //     { email        : formValues[0] || '' },
    //     { phone        : formValues[1] || '' },
    //     { region       : formValues[2] || '' },
    //     { country      : formValues[3] || '' },
    //     { website      : formValues[4] || '' },
    //     { location     : formValues[5] || '' },
    //     { username     : formValues[6] || '' },
    //     { schoolname   : formValues[7] || '' },
    //     { access_level : admin.access_level },
    // ]);
    
    const [emailError, setEmailError]           = useState('')
    const [phoneError, setPhoneError]           = useState('')
    const [regionError, setRegionError]         = useState('')
    const [countryError, setCountryError]       = useState('')
    const [websiteError, setWebsiteError]       = useState('')
    const [locationError, setLocationError]     = useState('')
    const [usernameError, setUsernameError]     = useState('')
    const [schoolnameError, setSchoolnameError] = useState('')

    const [open, setOpen]         = useState(true);
    const [error, setError]       = useState(false);
    const [message, setMessage]   = useState('');
    const [loading, setLoading]   = useState(true);
    const [backdrop, setBackdrop] = useState(false);
    const [comError, setComError] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
console.log('formValid: ',formValid)
    React.useEffect(() => {
        const abortController = new AbortController();
        const signal          = abortController.signal;

        Axios.get(getBaseURL()+'get_countries_dropdown', { signal: signal })
            .then(response => {
                dispatch(storeCountries(response.data));
                setLoading(false);
            })
            .catch(error => {
                setComError(true);
                setLoading(false);
                setMessage('Network Error. Server Unreachable....');
            });

        return () => abortController.abort();
    }, [dispatch]);
    
    // const handleChange   = (event, newValue, newName) => {
    const handleChange   = (event) => {
        if(event) {
            const name  = event.target && event.target.name;
            const value = event.target && event.target.value;
            let newArr  = [...values];
            // const value = newValue ? newValue.value : event.target.value;
            // console.log('newValue: ', newValue)
            // console.log('newName: ', newName)

            /* 
            if(newName === 'country') {
                newArr[4]['country'] = value;
                fetchRegions(value);
            } else if(newName === 'region') {
                newArr[3]['region'] = value;
            }
            */
            if(name === undefined && event.code) {
                newArr[3] = event.value;
                newArr[2] = '';
                fetchRegions(event.value);
            } else if(name === undefined && !event.code) {
                newArr[2] = event.value;
            } else if(name === 'schoolname') {
                newArr[7] = value;
            } else if(name === 'email') {
                newArr[0] = value;
            } else if(name === 'phone') {
                newArr[1] = value;
            } else if(name === 'location') {
                newArr[5] = value;
            } else if(name === 'website') {
                newArr[4] = value;
            } else if(name === 'username') {
                newArr[6] = value;
            }

            setValues(newArr);
            setFormValid(validateValues());
            dispatch(storeSchoolFormValues(newArr));
        }
    };
    const validateValues = () => {
        let status        = true;
        const schoolname  = values[7];
        const email       = values[0];
        const phone       = values[1];
        const location    = values[5];
        const country     = values[3];
        const region      = values[2];
        const website     = values[4];
        const username    = values[6];
console.log(values)
        // if(values.every(element => element !== null || element !== undefined)) {
            if(!schoolname) {
                status = false;
                setSchoolnameError('Please Fill In School\'s Name');
            } else  {
                setSchoolnameError('');
            }
            if(!email) {
                status = false;
                setEmailError('Please Fill In School\'s Email Address');
            } else  {
                setEmailError('');
            }
            if(!phone) {
                status = false;
                setPhoneError('Please Fill In School\'s Phone Number');
            } else  {
                setPhoneError('');
            }
            if(!location) {
                status = false;
                setLocationError('Please Fill In School\'s Location');
            } else  {
                setLocationError('');
            }
            if(!country) {
                status = false;
                setCountryError('Please Select School\'s Country');
            } else  {
                setCountryError('');
            }
            if(!region) {
                status = false;
                setRegionError('Please Select School\'s Region');
            } else  {
                setRegionError('');
            }
            if(!website) {
                status = false;
                setWebsiteError('Please Fill In School\'s Website');
            } else  {
                setWebsiteError('');
            }
            if(!username) {
                status = false;
                setUsernameError('Please Fill In School\'s Username');
            } else  {
                setUsernameError('');
            }
        // }

        return status;
    }
    const handleClose    = () => { setOpen(false); closeModal(); resetForm(); }
    const fetchRegions   = value => {
        // setLoading(true);
        setIsLoading(true);
        const data = {
            countryID: value
        }
        Axios.post(getBaseURL()+'get_regions', data)
            .then(response => {
                dispatch(storeRegions(response.data));
                // setLoading(false);
                setIsLoading(false);
            })
            .catch(error => {
                setComError(true);
                setLoading(false);
                setMessage('Network Error. Server Unreachable....');
            });
    };
    const confirmSubmit  = event => {
        event.preventDefault();
        setIsConfirmOpen(true);
    };
    const onSubmit       = action => {
        setIsConfirmOpen(false);
        
        if(action.toLowerCase() === 'yes') {
            setError(false);
            setBackdrop(true);
            setComError(false);

            const data = {
                id           : admin.id,
                email        : values[0],
                phone        : values[1],
                region       : values[2],
                country      : values[3],
                website      : values[4],
                location     : values[5],
                username     : values[6],
                schoolname   : values[7],
                access_level : admin.access_level,
            };
            console.log(data)
            Axios.post(getBaseURL()+'add_school', data)
                .then(response => {
                    if(response.data[0].status.toLowerCase() === 'success') {
                        setOpen(false);
                        closeExpandable(response.data[0].message);
                        dispatch(storeCountries([]));
                        dispatch(storeRegions([]));
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
        }
    };
    const resetForm      = () => {console.log('resetForm')
        dispatch(storeSchoolFormValues([]));
        setMessage('');
    };

    return (
        <>
            { error     && <Toastrr message={message} type="warning" />}
            { comError  && <Toastrr message={message} type="info" />}
            <Backdrop className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" /> <span className='ml-15'>Adding School....</span>
            </Backdrop>
            { isConfirmOpen &&
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
                                Are You Sure You Want To Add School?
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
            }
            <Dialog
                TransitionComponent={Transition}
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
                scroll='paper'
                fullWidth={true}
                maxWidth='md'
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}>
                {
                    loading ? <Loader /> : 
                    <form onSubmit={confirmSubmit}>
                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                            Add School
                        </DialogTitle>
                        <DialogContent dividers>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        onChange={handleChange}
                                        variant="outlined"
                                        value={values[7]}
                                        margin="normal"
                                        fullWidth
                                        id="schoolname"
                                        label="School Name"
                                        placeholder="Name Of School"
                                        name="schoolname" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        onChange={handleChange}
                                        variant="outlined"
                                        value={values[0]}
                                        margin="normal"
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        placeholder="Email Address"
                                        name="email" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        onChange={handleChange}
                                        variant="outlined"
                                        value={values[1]}
                                        margin="normal"
                                        fullWidth
                                        id="phone"
                                        label="Phone Number"
                                        placeholder="Phone Number"
                                        name="phone" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        onChange={handleChange}
                                        variant="outlined"
                                        value={values[5]}
                                        margin="normal"
                                        fullWidth
                                        id="location"
                                        label="Location"
                                        placeholder="Location"
                                        name="location" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {/* <Autocomplete
                                        onChange={(event, newValue) => handleChange(event, newValue, "country")}
                                        id="country"
                                        value={values[4].country}
                                        options={countries}
                                        autoHighlight
                                        getOptionLabel={(option) => option.label}
                                        renderOption={(option) => (
                                            <React.Fragment>
                                                <span>{countryToFlag(option.code)}</span>&nbsp;
                                                {option.label} ({option.code})
                                            </React.Fragment>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                            {...params}
                                            label="Country"
                                            variant="outlined"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password',
                                            }} />
                                        )} /> */}
                                    <Select
                                        components={animatedComponents}
                                        id="country"
                                        name="country"
                                        defaultValue={values[3]}
                                        onChange={handleChange}
                                        options={countries} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {/* <Autocomplete
                                        onChange={(event, newValue) => handleChange(event, newValue, "region")}
                                        id="region"
                                        value={values[3].region}
                                        options={regions}
                                        disableCloseOnSelect
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => <TextField {...params} label="Region" variant="outlined" />}/> */}
                                    <Select
                                        components={animatedComponents}
                                        isLoading={isLoading}
                                        id="region"
                                        name="region"
                                        defaultValue={values[2]}
                                        onChange={handleChange}
                                        options={regions} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        onChange={handleChange}
                                        variant="outlined"
                                        value={values[4]}
                                        margin="normal"
                                        fullWidth
                                        id="website"
                                        label="Website"
                                        placeholder="Website"
                                        name="website" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        onChange={handleChange}
                                        variant="outlined"
                                        value={values[6]}
                                        margin="normal"
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        placeholder="Username"
                                        name="username" />
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
                            {/* <Tooltip title="Add School Details"> */}
                                <Button
                                    disabled={!formValid}
                                    type="submit"
                                    color="primary">
                                    Add School
                                </Button>
                            {/* </Tooltip> */}
                        </DialogActions>
                    </form>
                }
            </Dialog>
        </>
    );
}

export default AddSchool;
