import React, { useEffect, useState } from 'react';
import Fab from '@material-ui/core/Fab';
import clsx from 'clsx';
import Axios from 'axios';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Loader from '../../Extras/Loadrr';
import styles from '../../Extras/styles';
import Toastrr from '../../Extras/Toastrr';
import Backdrop from '@material-ui/core/Backdrop';
import EmptyData from '../../Extras/EmptyData';
import Breadcrumb from '../Layout/Breadcrumb';
import AddCountry from './AddCountry';
import ViewCountry from './ViewCountry';
import MUIDataTable from "mui-datatables";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getBack } from '../../Extras/GoBack';
import { getBaseURL } from '../../Extras/server';
import { getSidebar } from '../Layout/Sidebar';
import { useSelector } from 'react-redux';

function ManageCountries({ history }) {
    const admin   = useSelector(state => state.authReducer.admin);
    const visible = useSelector(state => state.sidebarReducer.visible);
    const classes = styles();
    const sidebar = admin && getSidebar(admin.access_level);

    const [error, setError]               = useState(false);
    const [loading, setLoading]           = useState(true);
    const [message, setMessage]           = useState('');
    const [success, setSuccess]           = useState(false);
    const [backdrop, setBackdrop]         = useState(false);
    const [comError, setComError]         = useState(false);
    const [countries, setCountries]       = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);

    const closeModal = () => { setShowAddModal(false); };
    const closeExpandable = message => {
        closeModal();
        setMessage(message);
        setSuccess(true);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(false);
        }, 1000);
    };
    const countryAction = (id, action) => {
        setError(false);
        setSuccess(false);
        setBackdrop(true);
        setComError(false);
        const data = {
            id,
            action,
            admin: admin.id
        };

        Axios.post(getBaseURL() + 'country_action', data)
            .then(response => {
                if(response.data[0].status.toLowerCase() === 'success') {
                    setSuccess(true);
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
    };
    
    useEffect(() => {
        document.title = 'RiiVe Admin | Countries';
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (admin) {
            if(admin.access_level.toLowerCase() === 'administrator') {
                Axios.post(getBaseURL() + 'get_countries', { signal: signal })
                    .then(response => {
                        setCountries(response.data);
                        setLoading(false);
                    })
                    .catch(error => {
                        setLoading(false);
                        setMessage('Network Error. Server Unreachable....');
                        setComError(true);
                    });
            } else {
                getBack(history);
            }
        } else {
            history.push('/');
        }

        return () => abortController.abort();
    }, [admin, history, loading, backdrop]);

    let rowsPerPage = [];
    const columns = [
        {
            label: "Code",
            name: "country_code",
            options: {
                filter: true,
            }
        },
        {
            label: "Country",
            name: "country_name",
            options: {
                filter: true,
            }
        },
        {
            label: "Status",
            name: "status",
            options: {
                filter: true,
            }
        },
    ];
    if (countries) {
        if (countries.length < 100) {
            rowsPerPage = [10, 25, 50, 100];
        } else {
            rowsPerPage = [10, 25, 50, 100, countries.length];
        }
    } else {
        rowsPerPage = [10, 25, 50, 100];
    }
    const options = {
        filter: true,
        filterType: 'dropdown',
        responsive: 'standard',
        pagination: true,
        rowsPerPageOptions: rowsPerPage,
        resizableColumns: false,
        expandableRows: true,
        renderExpandableRow: (rowData, rowMeta) => <ViewCountry
            length={rowData.length}
            country={countries[rowMeta.dataIndex]}
            countryAction={countryAction}
            closeExpandable={closeExpandable} />,
        downloadOptions: { filename: 'Countries.csv', separator: ', ' },
        page: 0,
        selectableRows: 'none',
        textLabels: {
            body: {
                noMatch: "No Matching Countries Found. Change Keywords and Try Again....",
                columnHeaderTooltip: column => `Sort By ${column.label}`
            },
            toolbar: {
                search: "Search Countries",
                viewColumns: "Show/Hide Columns",
                filterTable: "Filter Countries",
            }
        }
    };

    return (
        <>
            { error         && <Toastrr message={message} type="error"   />}
            { success       && <Toastrr message={message} type="success" />}
            { comError      && <Toastrr message={message} type="info"    />}
            { showAddModal  && <AddCountry  closeModal={closeModal} closeExpandable={closeExpandable} />}
            <Backdrop className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" /> <span className='ml-15'>....</span>
            </Backdrop>
            <Header admin={admin} />
            {sidebar}
            <main
                className={clsx(classes.contentMedium, {
                    [classes.contentWide]: !visible,
                })}>
                <Breadcrumb page="Countries" />
                {
                    loading ? <Loader /> :
                        (countries && countries.length)
                            ?
                            <MUIDataTable
                                data={countries}
                                columns={columns}
                                options={options} />
                            :
                            <EmptyData error={comError} type="Countries" />
                }
                {
                    !comError && admin && admin.access_level.toLowerCase() === 'administrator' && <Fab
                        variant="extended"
                        size="medium"
                        aria-label="add"
                        className="success"
                        onClick={() => setShowAddModal(true)}>
                        <AddOutlinedIcon className="white" />
                        <span className="ml-10">Add Country</span>
                    </Fab>
                }
            </main>
            <Footer />
        </>
    );
}

export default ManageCountries;
