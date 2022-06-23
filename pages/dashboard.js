import React from 'react'
import Layout from '../component/Layout';
import DashboardCom from '../component/Dashboard';
import { useAuth } from '../context/authContext'

const Dashboard = () => {

    const authContext = useAuth();



    return (
        <div>
            <Layout>

                {authContext.user ? <DashboardCom profile={authContext.user.photoURL} /> : <h1></h1>}
            </Layout>
        </div>
    )
}

export default Dashboard;
