import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '../../../assets/avatar.png';
import Tooltip from '@material-ui/core/Tooltip';
import GetAppIcon from '@material-ui/icons/GetApp';
import SchoolPDF from './SchoolPDF';
import { getBaseURL } from '../../Extras/server';
import { BlobProvider } from "@react-pdf/renderer";
import { TableRow, TableCell, IconButton } from '@material-ui/core';

function ViewSchool({ length, school }) {
    const image           = school && school.image ? getBaseURL()+school.image : Avatar;
    const filename        = school.name+".pdf";
    const downloadTooltip = "Download "+school.firstname+"'s Details";
    
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
                                            src={image}
                                            alt={school.schoolname + '\'s Image'} />
                                    </td>
                                    <th width="28%">Name: </th>
                                    <td width="42%">{school.schoolname}</td>
                                </tr>
                                <tr>
                                    <th>Email Address: </th>
                                    <td>{school.email}</td>
                                </tr>
                                <tr>
                                    <th>Phone Number: </th>
                                    <td>{school.phone}</td>
                                </tr>
                                <tr>
                                    <th>Website: </th>
                                    <td>{school.website}</td>
                                </tr>
                                <tr>
                                    <th>Location: </th>
                                    <td>{school.location}</td>
                                </tr>
                                <tr>
                                    <th>Region: </th>
                                    <td>{school.regionname}</td>
                                </tr>
                                <tr>
                                    <th>Country: </th>
                                    <td>{school.country_name}</td>
                                </tr>
                                <tr>
                                    <th>Status: </th>
                                    <td>{school.status}</td>
                                </tr>
                            </tbody>
                        </table>

                        <Grid className="table-detail-toolbar" container spacing={0}>
                            <Grid item xs={4}>
                                <BlobProvider
                                    document={<SchoolPDF school={school} />}
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

export default ViewSchool;
