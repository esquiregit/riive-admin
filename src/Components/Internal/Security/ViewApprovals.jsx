import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import styles from '../../Extras/styles';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Loader from '../../Extras/Loadrr';
import Toastrr from '../../Extras/Toastrr';
import MenuItem from '@material-ui/core/MenuItem';
import EmptyData from '../../Extras/EmptyData';
import TextField from '@material-ui/core/TextField';
import Breadcrumb from '../Layout/Breadcrumb';
import ViewVisitor from '../Visitors/ViewVisitor';
import MUIDataTable from "mui-datatables";
import { Card } from '@material-ui/core';
import { getBaseURL } from '../../Extras/server';
import { getSidebar } from '../Layout/Sidebar';
import { useSelector } from 'react-redux';

function ViewApprovals({ history }) {
    const admin   = useSelector(state => state.authReducer.admin);
    const visible = useSelector(state => state.sidebarReducer.visible);
    const classes = styles();
    const sidebar = admin && getSidebar(admin.access_level);

    const [loading, setLoading]       = useState(true);
    const [message, setMessage]       = useState('');
    const [visitors, setVisitors]     = useState([]);
    const [comError, setComError]     = useState(false);
    const [showTable, setShowTable]   = useState(false);
    const [securities, setSecurities] = useState(false);
    const [securityID, setSecurityID] = useState('');

    useEffect(() => {
        document.title = 'RiiVe Admin | View Approvals By Security';
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (admin) {
            Axios.post(getBaseURL() + 'get_securities_info', { signal: signal })
                .then(response => {
                    setSecurities(response.data);
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
    }, [admin, history]);

    let rowsPerPage = [];
    const columns = [
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
                noMatch: "No Visits Approvals Found",
                columnHeaderTooltip: column => `Sort By ${column.label}`
            },
            toolbar: {
                search: "Search Visitors",
                viewColumns: "Show/Hide Columns",
                filterTable: "Filter Visitors",
            }
        }
    };
    const handleChange = event => {
        setLoading(true);
        setSecurityID(event.target.value);
        const security_id = event.target.value;

        Axios.post(getBaseURL() + 'get_approvals_by_security', { security_id, adminID: admin.id })
            .then(response => {
                setLoading(false);
                setVisitors(response.data);
                setShowTable(true);
            })
            .catch(error => {
                setLoading(false);
                setMessage('Network Error. Server Unreachable....');
                setComError(true);
            })
    }

    return (
        <>
            { comError && <Toastrr message={message} type="info" />}
            <Header admin={admin} />
            {sidebar}
            <main
                className={clsx(classes.contentMedium, {
                    [classes.contentWide]: !visible,
                })}>
                <Breadcrumb page="View Approvals By Security" />
                {
                    loading ? <Loader /> :
                        (securities && securities.length)
                            ?
                            <Card className="rounded box-shadow">
                                <form style={{ margin: 20 }}>
                                    <Grid container spacing={3}>
                                        <Grid item sm={12} md={3}></Grid>
                                        <Grid item sm={12} md={6}>
                                            <TextField
                                                id="outlined-select-currency"
                                                select
                                                fullWidth
                                                label="Security"
                                                onChange={handleChange}
                                                value={securityID}
                                                helperText="Please Select A Security Personnel To View His/Her Approvals"
                                                variant="outlined">
                                                {securities.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item sm={12} md={3}></Grid>
                                    </Grid>
                                </form>
                                {
                                    (showTable && setVisitors.length) ?
                                        <MUIDataTable
                                            data={visitors}
                                            columns={columns}
                                            options={options} /> : null
                                }
                            </Card>
                            : <EmptyData error={comError} single="Security" type="Securities" />
                }
            </main>
            <Footer />
        </>
    );
}

export default ViewApprovals;
