import React from 'react'
import Navbar from '@/component/Navbar';
import styleLayout from '../styles/layout.module.scss'


const Layout = (props) => {
    return (
        <div>
            <Navbar />
            <main className={styleLayout.main}>
                {props.children}
            </main>

        </div>
    )
}

export default Layout;