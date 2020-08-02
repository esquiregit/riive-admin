import React from 'react';
import logo from '../../../assets/riive.png';
import moment from "moment";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff"
    },
    container: {
        backgroundColor: "#f6f6f5",
        display: "flex",
        flexDirection: "row",
        padding: 5
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
        borderBottom: 'transparent',
        marginTop: 50,
    },
    info_two_column: {
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid #333',
        paddingBottom: 10,
        borderBottom: 'transparent',
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
        flex: '1 1 40%',
        marginRight: 30,
        color: '#555',
        paddingBottom: 20,
    },
    info_two_column_right: {
        textAlign: 'left',
        fontSize: 15,
        marginRight: 95,
        padding: 10,
        flex: '1 2 60%',
        paddingBottom: 20,
    }
});

function SecurityPDF({ security }) {
    
    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.container}>
                    <View>
                        <View>
                            <Image src={logo} />
                        </View>
                        <View style={styles.two_column}>
                            <Text style={styles.two_column_left}>Security Info</Text>
                            <Text style={styles.two_column_right}>{moment().format('dddd Do MMMM YYYY [at] hh:mm:ss')}</Text>
                        </View>
                        <View className="mt-50" style={styles.info_two_column_first}>
                            <Text style={styles.info_two_column_left}>Security:</Text>
                            <Text style={styles.info_two_column_right}>{security.name}</Text>
                        </View>
                        <View style={styles.info_two_column}>
                            <Text style={styles.info_two_column_left}>Contact:</Text>
                            <Text style={styles.info_two_column_right}>{security.contact}</Text>
                        </View>
                        <View style={styles.info_two_column}>
                            <Text style={styles.info_two_column_left}>Account Type:</Text>
                            <Text style={styles.info_two_column_right}>{security.accountType}</Text>
                        </View>
                        <View style={styles.info_two_column}>
                            <Text style={styles.info_two_column_left}>School:</Text>
                            <Text style={styles.info_two_column_right}>{security.schoolname}</Text>
                        </View>
                        <View style={styles.info_two_column_last}>
                            <Text style={styles.info_two_column_left}>Country:</Text>
                            <Text style={styles.info_two_column_right}>{security.country_name}</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default SecurityPDF;