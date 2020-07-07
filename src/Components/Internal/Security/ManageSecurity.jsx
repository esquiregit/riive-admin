import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Axios from 'axios';
import styles from '../../Extras/styles';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Loader from '../../Extras/Loadrr';
import Toastrr from '../../Extras/Toastrr';
import EmptyData from '../../Extras/EmptyData';
import Breadcrumb from '../Layout/Breadcrumb';
import ViewSecurity from './ViewSecurity';
import MUIDataTable from "mui-datatables";
import { getBaseURL } from '../../Extras/server';
import { getSidebar } from '../Layout/Sidebar';
import { useSelector } from 'react-redux';

function ManageSecurity({ history }) {
    const admin   = useSelector(state => state.authReducer.admin);
    const classes = styles();
    const sidebar = admin && getSidebar(admin.access_level);
    const visible = useSelector(state => state.sidebarReducer.visible);

    const [loading, setLoading]       = useState(true);
    const [message, setMessage]       = useState('');
    const [success, setSuccess]       = useState(false);
    const [comError, setComError]     = useState(false);
    const [securities, setSecurities] = useState(false);

    const closeExpandable = message => {
        setMessage(message);
        setSuccess(true);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(false);
        }, 10);
    }
    
    useEffect(()          => {
        document.title        = 'RiiVe Admin | Securities';
        const abortController = new AbortController();
        const signal          = abortController.signal;
        
        if(admin) {
            Axios.post(getBaseURL()+'get_securities', { signal: signal })
                .then(response => {
                    setSecurities(response.data);
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
            label: "Name",
            name: "name",
            options: {
                filter: true,
            }
        },
        {
            label: "Contact",
            name: "contact",
            options: {
                filter: true,
            }
        },
        {
            label: "School",
            name: "schoolname",
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
    if (securities) {
        if (securities.length < 100) {
            rowsPerPage = [10, 25, 50, 100];
        } else {
            rowsPerPage = [10, 25, 50, 100, securities.length];
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
        renderExpandableRow: (rowData, rowMeta) => <ViewSecurity length={rowData.length} security={securities[rowMeta.dataIndex]} closeExpandable={closeExpandable} />,
        downloadOptions: { filename: 'Security Personnel.csv', separator: ', ' },
        page: 0,
        selectableRows: 'none',
        textLabels: {
            body: {
                noMatch: "No Matching Security Personnel Found. Change Keywords and Try Again....",
                columnHeaderTooltip: column => `Sort By ${column.label}`
            },
            toolbar: {
                search: "Search Security Personnel",
                viewColumns: "Show/Hide Columns",
                filterTable: "Filter Security Personnel",
            }
        }
    };
    return (
        <>
            { comError && <Toastrr message={message} type="info" />}
            { success  && <Toastrr message={message} type="success" />}
            <Header admin={admin} />
            {sidebar}
            <main
                className={clsx(classes.contentMedium, {
                    [classes.contentWide]: !visible,
                })}>
                <Breadcrumb page="Security" />
                {
                    loading ? <Loader /> :
                        (securities && securities.length)
                            ?
                            <MUIDataTable
                                data={securities}
                                columns={columns}
                                options={options} />
                            : <EmptyData error={comError} type="Securities" />
                }
            </main>
            <Footer />
        </>
    );
}

export default ManageSecurity;
