import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import GetAppIcon from '@material-ui/icons/GetApp';
import AttendancePDF from './AttendancePDF';
import { getBaseURL } from '../../Extras/server';
import { BlobProvider } from "@react-pdf/renderer";
import { TableRow, TableCell, IconButton } from '@material-ui/core';

function ViewAttendance({ length, attendance }) {
    const filename        = attendance.name+".pdf";
    const downloadTooltip = "Download "+attendance.student+"'s Attendance";
    
    return (
        <>
            <TableRow>
                <TableCell colSpan={length + 1}>
                    <div className="detail-div">
                        <table id="detail-table">
                            <tbody>
                                <tr>
                                    <td width="30%" rowSpan="9">
                                        <img
                                            width="100"
                                            height="270"
                                            src={getBaseURL() + attendance.imagePath + '/' + attendance.image}
                                            alt={attendance.student + '\'s Image'} />
                                    </td>
                                    <th width="28%">Student: </th>
                                    <td width="42%">{attendance.student}</td>
                                </tr>
                                <tr>
                                    <th>School: </th>
                                    <td>{attendance.schoolname}</td>
                                </tr>
                                <tr>
                                    <th>Class: </th>
                                    <td>{attendance.class}</td>
                                </tr>
                                <tr>
                                    <th>Date: </th>
                                    <td>{attendance.date}</td>
                                </tr>
                                <tr>
                                    <th>Status: </th>
                                    <td>{attendance.status}</td>
                                </tr>
                                <tr>
                                    <th>Clock In Time: </th>
                                    <td>{attendance.clock_in_time}</td>
                                </tr>
                                <tr>
                                    <th>Clock Out Time: </th>
                                    <td>{attendance.clock_out_time}</td>
                                </tr>
                                <tr>
                                    <th>Pickup Code: </th>
                                    <td>{attendance.pickupCode}</td>
                                </tr>
                                <tr>
                                    <th>Country: </th>
                                    <td>{attendance.country_name}</td>
                                </tr>
                            </tbody>
                        </table>

                        <Grid className="table-detail-toolbar" container spacing={0}>
                            <Grid item xs={4}>
                                <BlobProvider
                                    document={<AttendancePDF attendance={attendance} />}
                                    filename={filename}
                                    style={{
                                        textDecoration: "none",
                                    }}>
                                        {({url}) => (
                                            <a href={url} target="_blank" rel="noopener noreferrer" >
                                                <Tooltip title={downloadTooltip}>
                                                    <IconButton>
                                                        <GetAppIcon className="colour-success" />
                                                    </IconButton>
                                                </Tooltip>
                                            </a>
                                        )}
                                </BlobProvider>
                            </Grid>
                        </Grid>
                    </div>
                </TableCell>
            </TableRow>
        </>
    )
}

export default ViewAttendance;
