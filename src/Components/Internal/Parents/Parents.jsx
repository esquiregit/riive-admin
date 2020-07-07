import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Axios from 'axios';
import styles from '../../Extras/styles';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Loader from '../../Extras/Loadrr';
import Toastrr from '../../Extras/Toastrr';
import EmptyData from '../../Extras/EmptyData';
import ViewParent from './ViewParent';
import Breadcrumb from '../Layout/Breadcrumb';
import MUIDataTable from "mui-datatables";
import { getBaseURL } from '../../Extras/server';
import { getSidebar } from '../Layout/Sidebar';
import { useSelector } from 'react-redux';

function Parents({ history }) {
    const classes  = styles();
    const admin    = useSelector(state => state.authReducer.admin);
    const sidebar  = admin && getSidebar(admin.access_level);

    const [loading, setLoading]   = useState(true);
    const [message, setMessage]   = useState('');
    const [parents, setParents]   = useState(false);
    const [comError, setComError] = useState(false);

    useEffect(()              => {
        document.title        = 'RiiVe Admin | Parents';
        const abortController = new AbortController();
        const signal          = abortController.signal;

        if(admin) {
            Axios.post(getBaseURL()+'get_parents', { signal: signal })
                    .then(response => {
                        setParents(response.data);
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
    const visible   = useSelector(state => state.sidebarReducer.visible);
    const columns   = [
        {
            label: "Parent",
            name: "parent",
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
            label: "Student",
            name: "student",
            options: {
                filter: true,
            }
        },
        {
            label: "Relation",
            name: "relation",
            options: {
                filter: true,
            }
        },
        {
            label: "Phone Number",
            name: "phone",
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
        }
    ];
    if (parents) {
        if (parents.length < 100) {
            rowsPerPage = [10, 25, 50, 100];
        } else {
            rowsPerPage = [10, 25, 50, 100, parents.length];
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
        renderExpandableRow: (rowData, rowMeta) => <ViewParent length={rowData.length} parent={parents[rowMeta.dataIndex]} />,
        downloadOptions: { filename: 'Parents.csv', separator: ', ' },
        page: 0,
        selectableRows: 'none',
        textLabels: {
            body: {
                noMatch: "No Matching Parents Found. Change Keywords and Try Again....",
                columnHeaderTooltip: column => `Sort By ${column.label}`
            },
            toolbar: {
                search: "Search Parents",
                viewColumns: "Show/Hide Columns",
                filterTable: "Filter Parents",
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
                <Breadcrumb page="Parents" />
                {
                    loading ? <Loader /> :
                        (parents && parents.length)
                            ?
                            <MUIDataTable
                                data={parents}
                                columns={columns}
                                options={options} />
                            : <EmptyData error={comError} type="Parents" />
                }
            </main>
            <Footer />
        </>
    );
}

export default Parents;
