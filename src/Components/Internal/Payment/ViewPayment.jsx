import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import GetAppIcon from '@material-ui/icons/GetApp';
import PaymentPDF from './PaymentPDF';
import { BlobProvider } from "@react-pdf/renderer";
import { TableRow, TableCell, IconButton } from '@material-ui/core';

function ViewPayment({ length, payment }) {
    const filename        = payment.fullname + ".pdf";
    const downloadTooltip = "Download " + payment.fullname + "'s Details";
    
    return (
        <TableRow>
            <TableCell colSpan={length + 1}>
                <div className="detail-div">
                    <table id="detail-table">
                        <tbody>
                            <tr>
                                <th width="25%">Parent: </th>
                                <td width="45%">{payment.fullname}</td>
                            </tr>
                            <tr>
                                <th>Invoice Token: </th>
                                <td>{payment.InvoiceToken}</td>
                            </tr>
                            <tr>
                                <th>License/Pin: </th>
                                <td>{payment.LicenceOrPin}</td>
                            </tr>
                            <tr>
                                <th>Client Reference: </th>
                                <td>{payment.ClientReference}</td>
                            </tr>
                            <tr>
                                <th>Purpose: </th>
                                <td>{payment.Purpose}</td>
                            </tr>
                            <tr>
                                <th>Phone Number: </th>
                                <td>{payment.MobileNumber}</td>
                            </tr>
                            <tr>
                                <th>Mobile Channel Name: </th>
                                <td>{payment.MobileChannelName}</td>
                            </tr>
                            <tr>
                                <th>Network Transaction ID: </th>
                                <td>{payment.NetworkTransactionId}</td>
                            </tr>
                            <tr>
                                <th>Transaction ID: </th>
                                <td>{payment.TransactionId}</td>
                            </tr>
                            <tr>
                                <th>Transaction Amount: </th>
                                <td>{payment.TransactionAmount}</td>
                            </tr>
                            <tr>
                                <th>Fee: </th>
                                <td>{payment.Fee}</td>
                            </tr>
                            <tr>
                                <th>Transaction Status: </th>
                                <td>{payment.TransactionStatus}</td>
                            </tr>
                            <tr>
                                <th>Last Payment Date: </th>
                                <td>{payment.LastPaymentDate}</td>
                            </tr>
                            <tr>
                                <th>Next Payment Date: </th>
                                <td>{payment.NextPaymentDate}</td>
                            </tr>
                            <tr>
                                <th>Amount After Fees: </th>
                                <td>{payment.AmountAfterFees}</td>
                            </tr>
                        </tbody>
                    </table>

                    <Grid className="table-detail-toolbar" container spacing={0}>
                        <Grid item xs={4}>
                            <BlobProvider
                                document={<PaymentPDF payment={payment} />}
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

export default ViewPayment;
