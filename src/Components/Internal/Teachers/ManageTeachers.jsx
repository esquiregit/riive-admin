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
import ViewTeacher from './ViewTeacher';
import MUIDataTable from "mui-datatables";
import { getSidebar } from '../Layout/Sidebar';
import { getBaseURL } from '../../Extras/server';
import { storeTeachers } from '../../../Store/Actions/TeachersActions';
import { useSelector, useDispatch } from 'react-redux';

function ManageTeachers({ history }) {
    const admin    = useSelector(state => state.authReducer.admin);
    const dispatch = useDispatch();
    const teachers = useSelector(state => state.teachersReducer.teachers);
    const sidebar  = admin && getSidebar(admin.access_level);
    const visible  = useSelector(state => state.sidebarReducer.visible);

    const [loading, setLoading]   = useState(true);
    const [message, setMessage]   = useState('');
    const [comError, setComError] = useState(false);

    useEffect(()                    => {
        document.title        = 'RiiVe Admin | Teachers';
        const abortController = new AbortController();
        const signal          = abortController.signal;
    
        if(admin) {
            Axios.post(getBaseURL()+'get_teachers', { signal: signal })
                .then(response => {
                    dispatch(storeTeachers(response.data));
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

    let rowsPerPage = [];
    const classes   = styles();
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
            label: "Email Address",
            name: "email",
            options: {
                filter: true,
            }
        },
        {
            label: "Contact Number",
            name: "contact",
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
            label: "Country",
            name: "country_name",
            options: {
                filter: true,
            }
        },
    ];
    if (teachers) {
        if (teachers.length < 100) {
            rowsPerPage = [10, 25, 50, 100];
        } else {
            rowsPerPage = [10, 25, 50, 100, teachers.length];
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
        renderExpandableRow: (rowData, rowMeta) => <ViewTeacher length={rowData.length} teacher={teachers[rowMeta.dataIndex]} />,
        downloadOptions: { filename: 'Teachers.csv', separator: ', ' },
        page: 0,
        selectableRows: 'none',
        textLabels: {
            body: {
                noMatch: "No Matching Teachers Found. Change Keywords and Try Again....",
                columnHeaderTooltip: column => `Sort By ${column.label}`
            },
            toolbar: {
                search: "Search Teachers",
                viewColumns: "Show/Hide Columns",
                filterTable: "Filter Teachers",
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
                <Breadcrumb page="Teachers" />
                {
                    loading ? <Loader /> :
                        (teachers && teachers.length)
                            ?
                            <MUIDataTable
                                data={teachers}
                                columns={columns}
                                options={options} />
                            : <EmptyData error={comError} type="Teachers" />
                }
            </main>
            <Footer />
        </>
    );
}

export default ManageTeachers;
