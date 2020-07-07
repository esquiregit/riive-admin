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
import ViewStudent from './ViewStudent';
import MUIDataTable from "mui-datatables";
import { getBaseURL } from '../../Extras/server';
import { getSidebar } from '../Layout/Sidebar';
import { storeStudents } from '../../../Store/Actions/StudentsActions';
import { useSelector, useDispatch } from 'react-redux';

function ManageStudents({ history }) {
    const admin   = useSelector(state => state.authReducer.admin);
    const classes = styles();
    const sidebar = admin && getSidebar(admin.access_level);

    const [loading, setLoading]   = useState(true);
    const [message, setMessage]   = useState('');
    const [comError, setComError] = useState(false);
    
    const dispatch        = useDispatch();
    const closeExpandable = message => {
        setMessage(message);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    useEffect(()          => {
        document.title        = 'RiiVe Admin | Students';
        const abortController = new AbortController();
        const signal          = abortController.signal;
        if(admin) {
            Axios.post(getBaseURL()+'get_students', { signal: signal })
                .then(response => {
                    dispatch(storeStudents(response.data));
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
    }, [dispatch, admin, history, loading]);
    
    const students  = useSelector(state => state.studentsReducer.students);
    let rowsPerPage = [];
    const visible   = useSelector(state => state.sidebarReducer.visible);
    const columns   = [
        {
            label: "Name",
            name: "name",
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
            label: "Class",
            name: "class",
            options: {
                filter: true,
            }
        },
        {
            label: "Gender",
            name: "gender",
            options: {
                filter: true,
            }
        },
        {
            label: "Student Code",
            name: "studentCode",
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
    ];
    if (students) {
        if (students.length < 100) {
            rowsPerPage = [10, 25, 50, 100];
        } else {
            rowsPerPage = [10, 25, 50, 100, students.length];
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
        renderExpandableRow: (rowData, rowMeta) => <ViewStudent length={rowData.length} student={students[rowMeta.dataIndex]} access_level={admin.access_level} closeExpandable={closeExpandable} />,
        downloadOptions: { filename: 'Students.csv', separator: ', ' },
        page: 0,
        selectableRows: 'none',
        textLabels: {
            body: {
                noMatch: "No Matching Students Found. Change Keywords and Try Again....",
                columnHeaderTooltip: column => `Sort By ${column.label}`
            },
            toolbar: {
                search: "Search Students",
                viewColumns: "Show/Hide Columns",
                filterTable: "Filter Students",
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
                <Breadcrumb page="Students" />
                {
                    loading ? <Loader /> :
                        (students && students.length)
                            ?
                            <MUIDataTable
                                data={students}
                                columns={columns}
                                options={options} />
                            :
                            <EmptyData error={comError} type="Students" />
                }
            </main>
            <Footer />
        </>
    );
}

export default ManageStudents;
