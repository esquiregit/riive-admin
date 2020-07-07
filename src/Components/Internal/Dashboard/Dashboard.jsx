import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Axios from 'axios';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Loader from '../../Extras/Loadrr';
import styles from '../../Extras/styles';
import Breadcrumb from '../Layout/Breadcrumb';
import StatisticsAdmin from './StatisticsAdmin';
import StatisticsSubAdmin from './StatisticsSubAdmin';
import { getBaseURL } from '../../Extras/server';
import { getSidebar } from '../Layout/Sidebar';
import { useSelector } from 'react-redux';

function Dashboard({ history }) {
    const admin      = useSelector(state => state.authReducer.admin);
    const classes    = styles();
    const sidebar    = admin && getSidebar(admin.access_level);
    const visible    = useSelector(state => state.sidebarReducer.visible);
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);

    const [stats, setStats]         = useState([]);
    const [loading, setLoading]     = useState(true);

    useEffect(() => {
        document.title = 'RiiVe Admin | Dashboard';

        if(isLoggedIn) {
            Axios.post(getBaseURL() + 'get_dashboard_stats')
                .then(response => {
                    setStats(response.data[0]);
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                });
        } else {
            history.push('/');
        }
    }, [admin, isLoggedIn, history]);
    
    return (
        <>
            <Header admin={admin} />
            {sidebar}
            <main
                className={clsx(classes.contentMedium, {
                    [classes.contentWide]: !visible,
                })}>
                <Breadcrumb page="Dashboard" />
                {
                    loading ? <Loader /> :
                    <>
                    {
                        admin.access_level.toLowerCase() === 'administrator' ?
                        <StatisticsAdmin
                            total_schools={stats.total_schools}
                            total_students={stats.total_students}
                            total_parents={stats.total_parents}
                            total_teachers={stats.total_teachers}
                            total_countries={stats.total_countries}
                            total_admins={stats.total_admins} />
                        :
                        <StatisticsSubAdmin
                            total_schools={stats.total_schools}
                            total_students={stats.total_students}
                            total_teachers={stats.total_teachers}
                            total_countries={stats.total_countries} />
                    }
                    </>
                }
            </main>
            <Footer />
        </>
    )
}

export default Dashboard;
