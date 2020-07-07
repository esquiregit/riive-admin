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
import ViewAttendance from './ViewAttendance';
import MUIDataTable from "mui-datatables";
import { getBaseURL } from '../../Extras/server';
import { getSidebar } from '../Layout/Sidebar';
import { useSelector } from 'react-redux';

function Attendance({ history }) {
    const admin   = useSelector(state => state.authReducer.admin);
    const classes = styles();
    const sidebar = admin && getSidebar(admin.access_level);
    const visible = useSelector(state => state.sidebarReducer.visible);

    const [loading, setLoading]         = useState(true);
    const [message, setMessage]         = useState('');
    const [comError, setComError]       = useState(false);
    const [attendances, setAttendances] = useState(false);
    
    useEffect(()                        => {
        document.title        = 'RiiVe Admin | Attendance';
        const abortController = new AbortController();
        const signal          = abortController.signal;

        if(admin) {
            Axios.post(getBaseURL()+'get_attendance', { signal: signal })
                .then(response => {
                    setAttendances(response.data);
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
            label: "Student",
            name: "student",
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
            label: "Date",
            name: "date",
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
        {
            label: "Clock In Time",
            name: "clock_in_time",
            options: {
                filter: true,
            }
        },
        {
            label: "Clock Out Time",
            name: "clock_out_time",
            options: {
                filter: true,
            }
        },
        {
            label: "Pickup Code",
            name: "pickUpCode",
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
    if (attendances) {
        if (attendances.length < 100) {
            rowsPerPage = [10, 25, 50, 100];
        } else {
            rowsPerPage = [10, 25, 50, 100, attendances.length];
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
        renderExpandableRow: (rowData, rowMeta) => <ViewAttendance length={rowData.length} attendance={attendances[rowMeta.dataIndex]} />,
        downloadOptions: { filename: 'Attendances.csv', separator: ', ' },
        page: 0,
        selectableRows: 'none',
        textLabels: {
            body: {
                noMatch: "No Matching Records Found. Change Keywords and Try Again....",
                columnHeaderTooltip: column => `Sort By ${column.label}`
            },
            toolbar: {
                search: "Search Attendances",
                viewColumns: "Show/Hide Columns",
                filterTable: "Filter Attendances",
            }
        }
    };
    return (
        <>
            { comError   && <Toastrr message={message} type="info" />}
            <Header admin={admin} />
            {sidebar}
            <main
                className={clsx(classes.contentMedium, {
                    [classes.contentWide]: !visible,
                })}>
                <Breadcrumb page="Attendances" />
                {
                    loading ? <Loader /> :
                        (attendances && attendances.length)
                            ?
                            <MUIDataTable
                                data={attendances}
                                columns={columns}
                                options={options} />
                            : <EmptyData error={comError} type="Attendances" />
                }
            </main>
            <Footer />
        </>
    );
}

export default Attendance;
