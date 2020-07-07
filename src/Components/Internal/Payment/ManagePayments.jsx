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
import ViewPayment from './ViewPayment';
import MUIDataTable from "mui-datatables";
import { getSidebar } from '../Layout/Sidebar';
import { getBack } from '../../Extras/GoBack';
import { getBaseURL } from '../../Extras/server';
import { useSelector } from 'react-redux';

function ManagePayments({ history }) {
    const admin    = useSelector(state => state.authReducer.admin);
    const classes  = styles();
    const sidebar  = admin && getSidebar(admin.access_level);
    const visible  = useSelector(state => state.sidebarReducer.visible);

    const [loading, setLoading]   = useState(true);
    const [message, setMessage]   = useState('');
    const [comError, setComError] = useState(false);
    const [payments, setPayments] = useState(false);

    useEffect(()                    => {
        document.title        = 'RiiVe Admin | Payments';
        const abortController = new AbortController();
        const signal          = abortController.signal;
    
        if(admin) {
            if(admin.access_level.toLowerCase() === 'administrator') {
                Axios.post(getBaseURL()+'get_payments', { signal: signal })
                    .then(response => {
                        setPayments(response.data);
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
    }, [admin, history, loading]);

    let rowsPerPage = [];
    const columns   = [
        {
            label: "Parent",
            name: "fullname",
            options: {
                filter: true,
            }
        },
        {
            label: "Purpose",
            name: "Purpose",
            options: {
                filter: true,
            }
        },
        {
            label: "Phone Number",
            name: "MobileNumber",
            options: {
                filter: true,
            }
        },
        {
            label: "Transaction Amount",
            name: "TransactionAmount",
            options: {
                filter: true,
            }
        },
        {
            label: "Transaction Status",
            name: "TransactionStatus",
            options: {
                filter: true,
            }
        },
        {
            label: "Last Payment Date",
            name: "LastPaymentDate",
            options: {
                filter: true,
            }
        },
        {
            label: "Next Payment Date",
            name: "NextPaymentDate",
            options: {
                filter: true,
            }
        },
    ];
    if (payments) {
        if (payments.length < 100) {
            rowsPerPage = [10, 25, 50, 100];
        } else {
            rowsPerPage = [10, 25, 50, 100, payments.length];
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
        renderExpandableRow: (rowData, rowMeta) => <ViewPayment length={rowData.length} payment={payments[rowMeta.dataIndex]} />,
        downloadOptions: { filename: 'Payments.csv', separator: ', ' },
        page: 0,
        selectableRows: 'none',
        textLabels: {
            body: {
                noMatch: "No Matching Payments Found. Change Keywords and Try Again....",
                columnHeaderTooltip: column => `Sort By ${column.label}`
            },
            toolbar: {
                search: "Search Payments",
                viewColumns: "Show/Hide Columns",
                filterTable: "Filter Payments",
            }
        }
    };
    
    return (
        <>
            { comError && <Toastrr message={message} type="info" />}
            <Header admin={admin} />
            {sidebar}
            <main
                className={clsx(classes.contentMedium, {
                    [classes.contentWide]: !visible,
                })}>
                <Breadcrumb page="Payments" />
                {
                    loading ? <Loader /> :
                        (payments && payments.length)
                            ?
                            <MUIDataTable
                                data={payments}
                                columns={columns}
                                options={options} />
                            : <EmptyData error={comError} type="Payments" />
                }
            </main>
            <Footer />
        </>
    );
}

export default ManagePayments;
