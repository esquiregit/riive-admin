import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Axios from 'axios';
import styles from '../../Extras/styles';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Loader from '../../Extras/Loadrr';
import EmptyData from '../../Extras/EmptyData';
import ViewPickup from './ViewPickup';
import Breadcrumb from '../Layout/Breadcrumb';
import MUIDataTable from "mui-datatables";
import { getBaseURL } from '../../Extras/server';
import { getSidebar } from '../Layout/Sidebar';
import { useSelector } from 'react-redux';

function Pickups({ history }) {
    const admin   = useSelector(state => state.authReducer.admin);
    const classes = styles();
    const sidebar = admin && getSidebar(admin.access_level);
    const visible = useSelector(state => state.sidebarReducer.visible);
    
    const [loading, setLoading]   = useState(true);
    const [pickups, setPickups]   = useState(false);
    const [comError, setComError] = useState(false);

    useEffect(()              => {
        document.title        = 'RiiVe Admin | Pickups';
        const abortController = new AbortController();
        const signal          = abortController.signal;

        if(admin) {
            Axios.post(getBaseURL()+'get_pickups', { signal: signal })
                .then(response => {
                    setPickups(response.data);
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
    const columns   = [
        {
            label: "Pickup Person",
            name: "pickUpPerson",
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
            label: "Pickup Code",
            name: "code",
            options: {
                filter: true,
            }
        },
        {
            label: "Sent By",
            name: "parent",
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
    if (pickups) {
        if (pickups.length < 100) {
            rowsPerPage = [10, 25, 50, 100];
        } else {
            rowsPerPage = [10, 25, 50, 100, pickups.length];
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
        renderExpandableRow: (rowData, rowMeta) => <ViewPickup length={rowData.length} pickup={pickups[rowMeta.dataIndex]} />,
        downloadOptions: { filename: 'Pickups.csv', separator: ', ' },
        page: 0,
        selectableRows: 'none',
        textLabels: {
            body: {
                noMatch: "No Matching Pickups Found. Change Keywords and Try Again....",
                columnHeaderTooltip: column => `Sort By ${column.label}`
            },
            toolbar: {
                search: "Search Pickups",
                viewColumns: "Show/Hide Columns",
                filterTable: "Filter Pickups",
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
                <Breadcrumb page="Pickups" />
                {
                    loading ? <Loader /> :
                        (pickups && pickups.length)
                            ?
                            <MUIDataTable
                                data={pickups}
                                columns={columns}
                                options={options} />
                                :
                                <EmptyData error={comError} single="Pickup" type="Pickups" />
                }
            </main>
            <Footer />
        </>
    );
}

export default Pickups;
