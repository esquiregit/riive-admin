import React, { useEffect, useState } from 'react';
import Fab from '@material-ui/core/Fab';
import clsx from 'clsx';
import Axios from 'axios';
import styles from '../../Extras/styles';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Loader from '../../Extras/Loadrr';
import Toastrr from '../../Extras/Toastrr';
import EmptyData from '../../Extras/EmptyData';
import Breadcrumb from '../Layout/Breadcrumb';
import AddSchool from './AddSchool';
import ViewSchool from './ViewSchool';
import MUIDataTable from "mui-datatables";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { getBaseURL } from '../../Extras/server';
import { getSidebar } from '../Layout/Sidebar';
import { useSelector } from 'react-redux';

function ManageSchools({ history }) {
    const admin   = useSelector(state => state.authReducer.admin);
    const visible = useSelector(state => state.sidebarReducer.visible);
    const classes = styles();
    const sidebar = admin && getSidebar(admin.access_level);

    const [loading, setLoading]     = useState(true);
    const [message, setMessage]     = useState('');
    const [schools, setSchools]     = useState([]);
    const [success, setSuccess]     = useState(false);
    const [comError, setComError]   = useState(false);
    const [showModal, setShowModal] = useState(false);

    const closeModal      = () => { setShowModal(false); }
    const closeExpandable = message => {
        closeModal();
        setMessage(message);
        setSuccess(true);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(false);
        }, 1000);
    }

    useEffect(()          => {
        document.title        = 'RiiVe Admin | Schools';
        const abortController = new AbortController();
        const signal          = abortController.signal;
        
        if(admin) {
            Axios.post(getBaseURL()+'get_schools', { signal: signal })
                .then(response => {
                    setSchools(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                    setMessage('Network Error. Server Unreachable....');
                    setComError(true);
                });
        } else {
            history.push('/');
        }

        return () => abortController.abort();
    }, [admin, history, loading]);
    
    let rowsPerPage = [];
    const columns   = [
        {
            label: "School",
            name: "schoolname",
            options: {
                filter: true,
            }
        },
        {
            label: "Email",
            name: "email",
            options: {
                filter: true,
            }
        },
        {
            label: "Phone",
            name: "phone",
            options: {
                filter: true,
            }
        },
        {
            label: "Location",
            name: "location",
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
        }
    ];
    if (schools) {
        if (schools.length < 100) {
            rowsPerPage = [10, 25, 50, 100];
        } else {
            rowsPerPage = [10, 25, 50, 100, schools.length];
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
        renderExpandableRow: (rowData, rowMeta) => <ViewSchool length={rowData.length} school={schools[rowMeta.dataIndex]} />,
        downloadOptions: { filename: 'Schools.csv', separator: ', ' },
        page: 0,
        selectableRows: 'none',
        textLabels: {
            body: {
                noMatch: "No Matching Schools Found. Change Keywords and Try Again....",
                columnHeaderTooltip: column => `Sort By ${column.label}`
            },
            toolbar: {
                search: "Search Schools",
                viewColumns: "Show/Hide Columns",
                filterTable: "Filter Schools",
            }
        }
    };
    return (
        <>
            { comError  && <Toastrr message={message} type="info" />}
            { success   && <Toastrr message={message} type="success" />}
            { showModal && <AddSchool closeModal={closeModal} closeExpandable={closeExpandable} /> }
            <Header admin={admin} />
            {sidebar}
            <main
                className={clsx(classes.contentMedium, {
                    [classes.contentWide]: !visible,
                })}>
                <Breadcrumb page="Schools" />
                {
                    loading ? <Loader /> :
                        (schools && schools.length)
                            ?
                            <MUIDataTable
                                data={schools}
                                columns={columns}
                                options={options} />
                            :
                            <EmptyData error={comError} type="Schools" />
                }
                {
                    !comError && admin && admin.access_level.toLowerCase() === 'administrator' && <Fab
                        variant="extended"
                        size="medium"
                        aria-label="add"
                        className="success"
                        onClick={() => setShowModal(true)}>
                        <AddOutlinedIcon className="white" />
                        <span className="ml-10">Add School</span>
                    </Fab>
                }
            </main>
            <Footer />
        </>
    );
}

export default ManageSchools;
