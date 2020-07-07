import React from 'react';
import moment from "moment";
import logo from '../../../assets/riive.png';
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff"
    },
    container: {
        backgroundColor: "#f6f6f5",
        display: "flex",
        flexDirection: "row",
        padding: 5,
    },
    two_column: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderTop: '1px solid #666',
        borderBottom: '1px solid #666',
        paddingTop: '5px',
        paddingBottom: '20px',
    },
    two_column_left: {
        textAlign: 'left',
        fontSize: 14,
    },
    two_column_right: {
        textAlign: 'right',
        fontSize: 14,
        marginRight: 95,
    },
    info_two_column_first: {
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid #333',
        paddingBottom: 10,
        borderBottom: 'transpayment',
        marginTop: 20,
    },
    info_two_column: {
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid #333',
        paddingBottom: 10,
        borderBottom: 'transpayment',
    },
    info_two_column_last: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 10,
        border: '1px solid #333',
    },
    info_two_column_left: {
        textAlign: 'right',
        fontSize: 15,
        padding: 10,
        flex: '1 1 50%',
        marginRight: 30,
        color: '#555',
    },
    info_two_column_right: {
        textAlign: 'left',
        fontSize: 15,
        marginRight: 95,
        padding: 10,
        flex: '1 2 50%',
    }
});

function PaymentPDF({ payment }) {
    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.container}>
                    <View>
                        <View>
                            <Image src={logo} />
                        </View>
                        <View style={styles.two_column}>
                            <Text style={styles.two_column_left}>Payment Info</Text>
                            <Text style={styles.two_column_right}>{moment().format('dddd Do MMMM YYYY [at] hh:mm:ss')}</Text>
                        </View>
                        <View style={styles.info_two_column_first}>
                            <Text style={styles.info_two_column_left}>Parent:</Text>
                            <Text style={styles.info_two_column_right}>{payment.fullname}</Text>
                        </View>
                        <View style={styles.info_two_column}>
                            <Text style={styles.info_two_column_left}>Invoice Token:</Text>
                            <Text style={styles.info_two_column_right}>{payment.InvoiceToken}</Text>
                        </View>
                        <View style={styles.info_two_column}>
                            <Text style={styles.info_two_column_left}>License/Pin:</Text>
                            <Text style={styles.info_two_column_right}>{payment.LicenceOrPin}</Text>
                        </View>
                        <View style={styles.info_two_column}>
                            <Text style={styles.info_two_column_left}>Client Reference:</Text>
                            <Text style={styles.info_two_column_right}>{payment.ClientReference}</Text>
                        </View>
                        <View style={styles.info_two_column}>
                            <Text style={styles.info_two_column_left}>Purpose:</Text>
                            <Text style={styles.info_two_column_right}>{payment.Purpose}</Text>
                        </View>
                        <View style={styles.info_two_column}>
                            <Text style={styles.info_two_column_left}>Phone Number:</Text>
                            <Text style={styles.info_two_column_right}>{payment.MobileNumber}</Text>
                        </View>
                        <View style={styles.info_two_column_last}>
                            <Text style={styles.info_two_column_left}>Mobile Channel Name:</Text>
                            <Text style={styles.info_two_column_right}>{payment.MobileChannelName}</Text>
                        </View>
                        <View style={styles.info_two_column_last}>
                            <Text style={styles.info_two_column_left}>Network Transaction ID:</Text>
                            <Text style={styles.info_two_column_right}>{payment.NetworkTransactionId}</Text>
                        </View>
                        <View style={styles.info_two_column_last}>
                            <Text style={styles.info_two_column_left}>Transaction ID:</Text>
                            <Text style={styles.info_two_column_right}>{payment.TransactionId}</Text>
                        </View>
                        <View style={styles.info_two_column_last}>
                            <Text style={styles.info_two_column_left}>Transaction Amount:</Text>
                            <Text style={styles.info_two_column_right}>{payment.TransactionAmount}</Text>
                        </View>
                        <View style={styles.info_two_column_last}>
                            <Text style={styles.info_two_column_left}>Fee:</Text>
                            <Text style={styles.info_two_column_right}>{payment.Fee}</Text>
                        </View>
                        <View style={styles.info_two_column_last}>
                            <Text style={styles.info_two_column_left}>Transaction Status:</Text>
                            <Text style={styles.info_two_column_right}>{payment.TransactionStatus}</Text>
                        </View>
                        <View style={styles.info_two_column_last}>
                            <Text style={styles.info_two_column_left}>Last Payment Date:</Text>
                            <Text style={styles.info_two_column_right}>{payment.LastPaymentDate}</Text>
                        </View>
                        <View style={styles.info_two_column_last}>
                            <Text style={styles.info_two_column_left}>Next Payment Date:</Text>
                            <Text style={styles.info_two_column_right}>{payment.NextPaymentDate}</Text>
                        </View>
                        <View style={styles.info_two_column_last}>
                            <Text style={styles.info_two_column_left}>Amount After Fees:</Text>
                            <Text style={styles.info_two_column_right}>{payment.AmountAfterFees}</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default PaymentPDF;
