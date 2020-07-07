import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import styles from '../../Extras/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import RecordVoiceOverOutlinedIcon from '@material-ui/icons/RecordVoiceOverOutlined';

function StatisticsSubAdmin({ total_schools = 0, total_students = 0, total_teachers = 0, total_countries = 0 }) {
    const classes = styles();

    return (
        <Grid container spacing={3} className="mt-20">
            <Grid item xs={12} md={6}>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <div>
                            <AccountBalanceOutlinedIcon
                                className="fs-55" />
                        </div>
                        <div>
                            <Typography
                                variant="h5"
                                component="h2"
                                className="text-right">
                                {total_schools}
                            </Typography>
                            <Typography
                                className="text-right"
                                color="textSecondary">
                                Schools
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <div>
                            <LocalLibraryOutlinedIcon
                                className="fs-55" />
                        </div>
                        <div>
                            <Typography
                                variant="h5"
                                component="h2"
                                className="text-right">
                                {total_students}
                            </Typography>
                            <Typography
                                className="text-right"
                                color="textSecondary">
                                Students
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <div>
                            <RecordVoiceOverOutlinedIcon
                                className="fs-55" />
                        </div>
                        <div>
                            <Typography
                                variant="h5"
                                component="h2"
                                className="text-right">
                                {total_teachers}
                            </Typography>
                            <Typography
                                className="text-right"
                                color="textSecondary">
                                Teachers
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <div>
                            <PublicOutlinedIcon
                                className="fs-55" />
                        </div>
                        <div>
                            <Typography
                                variant="h5"
                                component="h2"
                                className="text-right">
                                {total_countries}
                            </Typography>
                            <Typography
                                className="text-right"
                                color="textSecondary">
                                Countries
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default StatisticsSubAdmin;
