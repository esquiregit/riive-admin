import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '../../../assets/avatar.png';
import Tooltip from '@material-ui/core/Tooltip';
import GetAppIcon from '@material-ui/icons/GetApp';
import TeacherPDF from './TeacherPDF';
import { getBaseURL } from '../../Extras/server';
import { BlobProvider } from "@react-pdf/renderer";
import { TableRow, TableCell, IconButton } from '@material-ui/core';

function ViewTeacher({ length, teacher }) {
    const image           = teacher && teacher.image ? getBaseURL()+teacher.image : Avatar;
    const names           = teacher.name.split(' ');
    const filename        = teacher.name + ".pdf";
    const downloadTooltip = "Download " + teacher.name + "'s Details";
    
    return (
        <TableRow>
            <TableCell colSpan={length + 1}>
                <div className="detail-div">
                    <table id="detail-table">
                        <tbody>
                            <tr>
                                <td width="30%" rowSpan="8">
                                    <img
                                        src={image}
                                        alt={teacher.name + '\'s Image'} />
                                </td>
                                <th width="25%">First Name: </th>
                                <td width="45%">{names[0]}</td>
                            </tr>
                            <tr>
                                <th>Last Name: </th>
                                <td>{names.length === 3 ? names[2] : names[1]}</td>
                            </tr>
                            <tr>
                                <th>Other Name: </th>
                                <td>{names.length === 3 ? names[1] : null}</td>
                            </tr>
                            <tr>
                                <th>Phone Number: </th>
                                <td>{teacher.contact}</td>
                            </tr>
                            <tr>
                                <th>Email Address: </th>
                                <td>{teacher.email}</td>
                            </tr>
                            <tr>
                                <th>School: </th>
                                <td>{teacher.schoolname}</td>
                            </tr>
                            <tr>
                                <th>Country: </th>
                                <td>{teacher.country_name}</td>
                            </tr>
                        </tbody>
                    </table>

                    <Grid className="table-detail-toolbar" container spacing={0}>
                        <Grid item xs={4}>
                            <BlobProvider
                                document={<TeacherPDF teacher={teacher} names={names} />}
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
    )
}

export default ViewTeacher;
