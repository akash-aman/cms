import React, { useContext } from 'react'
import { auth, signOut } from '../firebase'
import { useRouter } from 'next/router'
import styleDash from '../styles/dashboard.module.scss'
import Image from 'next/image'
import Editor from './Editor';
import { useAuth } from '@/context/authContext'


const Dashboard = (props) => {

  const authContext = useAuth();
  const router = useRouter();

  return (
    <div className={styleDash.dash} >
      <div className={styleDash.info}>
        <div className={styleDash.stats}>
          <button className={"btn-green"} onClick={() => {
            signOut(auth).then((res) => {
              router.push('/');
              // To add server logout
            });
          }} >
            Logout
          </button>
        </div>
        <div className={styleDash.stats}>
          <button className={"btn-orange"} >
            Data 1
          </button>
        </div>
        <div className={styleDash.stats}>
          <button className={"btn-blue"} >
            Data 2
          </button>
        </div>
        <div className={styleDash.stats}>
          <button className={"btn-red"} >
            Data 3
          </button>
        </div>

      </div>
      <div className={styleDash.main}>


        <div className={styleDash.content}>
          <Editor></Editor>
        </div>
        <div className={styleDash.profile}>

          <div className={styleDash.detail}>
            <Image src={`${props.profile.replace('s96-c', 's400-c')}`} width="400" height="400"></Image>
            <h1>{`Hi ${authContext.user.displayName.split(' ')[0]} 👋`}</h1>
            <h2>{authContext.user.email}</h2>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard
