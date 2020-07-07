import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Axios from 'axios';
import styles from '../../Extras/styles';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Loader from '../../Extras/Loadrr';
import EmptyData from '../../Extras/EmptyData';
import ViewVisitor from './ViewVisitor';
import Breadcrumb from '../Layout/Breadcrumb';
import MUIDataTable from "mui-datatables";
import { getBaseURL } from '../../Extras/server';
import { getSidebar } from '../Layout/Sidebar';
import { useSelector } from 'react-redux';

function Visitors({ history }) {
    const admin   = useSelector(state => state.authReducer.admin);
    const classes = styles();
    const sidebar = admin && getSidebar(admin.access_level);

    const [loading, setLoading]   = useState(true);
    const [visitors, setVisitors] = useState(false);
    const [comError, setComError] = useState(false);

    useEffect(()              => {
        document.title        = 'RiiVe Admin | Visitors';
        const abortController = new AbortController();
        const signal          = abortController.signal;

        if(admin) {
            Axios.post(getBaseURL()+'get_visitors', { signal: signal })
                .then(response => {
                    setVisitors(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setComError(true);
                    setLoading(false);
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
            label: "Visitor",
            name: "visitorName",
            options: {
                filter: true,
            }
        },
        {
            label: "Person To Visit",
            name: "personToVisit",
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
            label: "Clock In Time",
            name: "clockInTime",
            options: {
                filter: true,
            }
        },
        {
            label: "Clock Out Time",
            name: "clockOutTime",
            options: {
                filter: true,
            }
        },
        {
            label: "Purpose Of Visit",
            name: "purposeOfVisit",
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
    if (visitors) {
        if (visitors.length < 100) {
            rowsPerPage = [10, 25, 50, 100];
        } else {
            rowsPerPage = [10, 25, 50, 100, visitors.length];
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
        renderExpandableRow: (rowData, rowMeta) => <ViewVisitor length={rowData.length} visitor={visitors[rowMeta.dataIndex]} />,
        downloadOptions: { filename: 'Visitors.csv', separator: ', ' },
        page: 0,
        selectableRows: 'none',
        textLabels: {
            body: {
                noMatch: "No Matching Visitors Found. Change Keywords and Try Again....",
                columnHeaderTooltip: column => `Sort By ${column.label}`
            },
            toolbar: {
                search: "Search Visitors",
                viewColumns: "Show/Hide Columns",
                filterTable: "Filter Visitors",
            }
        }
    };
    return (
        <>
            <Header admin={admin} />
            {sidebar}
            <main
                className={clsx(classes.contentMedium, {
                    [classes.contentWide]: !visible,
                })}>
                <Breadcrumb page="Visitors" />
                {
                    loading ? <Loader /> :
                        (visitors && visitors.length)
                            ?
                            <MUIDataTable
                                data={visitors}
                                columns={columns}
                                options={options} />
                            : <EmptyData error={comError} type="Visitors" />
                }
            </main>
            <Footer />
        </>
    );
}

export default Visitors;
