import React, { useContext } from 'react';
import styleNav from '../styles/navbar.module.scss'
import Link from 'next/link';
import { useAuth } from '../context/authContext'
import { auth, GoogleAuthProvider, signInWithPopup } from '../firebase'
import Image from 'next/image'
import ErrorHandling from './ErrorHandling';
import { ErrorContext } from "../context/errorContext"



const Navbar = () => {


  const { error, show, setError, setShow } = useContext(ErrorContext);

  const body = typeof document !== `undefined` ? document.body : null;
  const authContext = useAuth();

  const uiHandler = () => {
    if (body.classList.contains("dark-theme")) {
      // when mode is light
      body.classList.replace("dark-theme", "light-theme");
      body.classList.add("ta");
      body.classList.remove("tb");
      localStorage.setItem("color-mode", "light-theme")
    } else {
      body.classList.replace("light-theme", "dark-theme")
      body.classList.add("tb");
      body.classList.remove("ta");
      localStorage.setItem("color-mode", "dark-theme")
    }
  }

  const GoogleLoginHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setError(`Hi ${result.user.displayName.split(' ')[0]} 👋`);
        setShow(true);
      }).catch((error) => {
        setError(error.message);
        setShow(true);
      });
  }

  const navItem = [{
    className: styleNav.home,
    href: "/",
    tooltip: "Home",
    svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" className={styleNav.icon1From} />
        <stop offset="100%" className={styleNav.icon1To} />
      </linearGradient>
    </defs><g><path fill="currentColor" d="M360 176h-24v-40a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v64a8 8 0 0 0 8 8h48a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zM0 224v272a16 16 0 0 0 16 16h80V192H32a32 32 0 0 0-32 32zm608-32h-64v320h80a16 16 0 0 0 16-16V224a32 32 0 0 0-32-32z" className={styleNav.secondary}></path><path fill="url(#grad1)" d="M497.75 112l-160-106.63a32 32 0 0 0-35.5 0L142.25 112A32 32 0 0 0 128 138.66V512h128V368a16 16 0 0 1 16-16h96a16 16 0 0 1 16 16v144h128V138.67A32 32 0 0 0 497.75 112zM320 256a80 80 0 1 1 80-80 80 80 0 0 1-80 80z" className={styleNav.primary}></path></g></svg>
  },
  // {
  //   className: styleNav.catalog,
  //   href: "/catalog",
  //   tooltip: "catalog",
  //   svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs>
  //     <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
  //       <stop offset="0%" className={styleNav.icon2From} />
  //       <stop offset="100%" className={styleNav.icon2To} />
  //     </linearGradient>
  //   </defs><g><path fill="currentColor" d="M392 168.07s0-8-168-8c-152 0-152 8-152 8s-8 0-8 120 8 120 8 120 0 8 152 8c168 0 168-8 168-8s8 0 8-120-8-120-8-120zM173.14 96h165.72l35.64-41.32a32 32 0 1 0-45.3-45.3L256 94.27 182.8 9.48a32 32 0 0 0-45.3 45.29z" className={styleNav.secondary}></path><path fill="url(#grad2)" d="M464 96.07H48a48 48 0 0 0-48 48v288a48 48 0 0 0 48 48h16v32h48l21.3-32h245.3l21.3 32h48v-32h16a48 48 0 0 0 48-48v-288a47.86 47.86 0 0 0-47.9-48zm-72 312s0 8-168 8c-152 0-152-8-152-8s-8 0-8-120 8-120 8-120 0-8 152-8c168 0 168 8 168 8s8 0 8 120-8 120-8 120zm72-100a12 12 0 0 1-12 12h-8a12 12 0 0 1-12-12v-8a12 12 0 0 1 12-12h8a12 12 0 0 1 12 12zm0-64a12 12 0 0 1-12 12h-8a12 12 0 0 1-12-12v-8a12 12 0 0 1 12-12h8a12 12 0 0 1 12 12z" className={styleNav.primary}></path></g></svg>
  // },
  {
    className: styleNav.category,
    href: "/category",
    tooltip: "category",
    svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" ><defs>
      <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" className={styleNav.icon3From} />
        <stop offset="100%" className={styleNav.icon3To} />
      </linearGradient>
    </defs><g ><path fill="currentColor" d="M328 220.33V224c0 32-6.69 47.26-20 63.8-28.2 35-76 39.5-118.2 43.4-25.7 2.4-49.9 4.6-66.1 12.8-3.82 1.94-9.25 6.44-13.44 13.94A80.16 80.16 0 0 0 56 355.67V156.33a80.31 80.31 0 0 0 48 0v144c23.9-11.5 53.1-14.3 81.3-16.9 35.9-3.3 69.8-6.5 85.2-25.7 6.34-7.83 9.5-17.7 9.5-33.7v-3.67a80.31 80.31 0 0 0 48 0z" className={styleNav.secondary}></path><path fill="url(#grad3)" d="M80 0a80 80 0 1 0 80 80A80 80 0 0 0 80 0zm0 96a16 16 0 1 1 16-16 16 16 0 0 1-16 16zm0 256a80 80 0 1 0 80 80 80 80 0 0 0-80-80zm0 96a16 16 0 1 1 16-16 16 16 0 0 1-16 16zM304 64a80 80 0 1 0 80 80 80 80 0 0 0-80-80zm0 96a16 16 0 1 1 16-16 16 16 0 0 1-16 16z" className={styleNav.primary}></path></g></svg>

  },
  {
    className: styleNav.tags,
    href: "/tags",
    tooltip: "tags",
    svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"> <defs>
      <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" className={styleNav.icon5From} />
        <stop offset="100%" className={styleNav.icon5To} />
      </linearGradient>
    </defs><g><path fill="url(#grad5)" d="M497.94 225.94L286.06 14.06A48 48 0 0 0 252.12 0H48A48 48 0 0 0 0 48v204.12a48 48 0 0 0 14.06 33.94l211.88 211.88a48 48 0 0 0 67.88 0l204.12-204.12a48 48 0 0 0 0-67.88zM112 160a48 48 0 1 1 48-48 48 48 0 0 1-48 48z" className={styleNav.primary}></path><path fill="currentColor" d="M625.94 293.82L421.82 497.94a48 48 0 0 1-67.88 0l-.36-.36 174.06-174.06a90 90 0 0 0 0-127.28L331.4 0h48.72a48 48 0 0 1 33.94 14.06l211.88 211.88a48 48 0 0 1 0 67.88z" className={styleNav.secondary}></path></g></svg>
  }
  ]





  return (
    <>
      <nav className={styleNav.navbar}>
        {
          navItem.map((item, index) => {
            return <Link key={index} href={item.href}><li className={styleNav.navbarItem + " " + item.className} >{item.svg}<span className={styleNav.span}>{item.tooltip}</span></li></Link>
          })
        }


        {authContext.user ? <Link href="/dashboard" className={styleNav.dashboard} ><li className={styleNav.navbarItem}><Image src={authContext.user.photoURL} width={36} height={36} /><span className={styleNav.span}>Dashboard</span></li></Link> : <> <li className={styleNav.navbarItem} onClick={GoogleLoginHandler} >

          <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
              <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
              <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
            </g>
          </svg>
          <span className={styleNav.span}>Login</span>  </li>
        </>
        }
        <li className={styleNav.navbarItem} onClick={uiHandler}>
          <svg className="dark-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path fill="currentColor" d="M320 32L304 0l-16 32-32 16 32 16 16 32 16-32 32-16zm138.7 149.3L432 128l-26.7 53.3L352 208l53.3 26.7L432 288l26.7-53.3L512 208z" className={styleNav.secondaryUI}></path><path fill="currentColor" d="M332.2 426.4c8.1-1.6 13.9 8 8.6 14.5a191.18 191.18 0 0 1-149 71.1C85.8 512 0 426 0 320c0-120 108.7-210.6 227-188.8 8.2 1.6 10.1 12.6 2.8 16.7a150.3 150.3 0 0 0-76.1 130.8c0 94 85.4 165.4 178.5 147.7z" className={styleNav.primaryUI}></path></g></svg>

          <svg className="light-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path fill="currentColor" d="M502.42 240.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.41-94.8a17.31 17.31 0 0 0-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4a17.31 17.31 0 0 0 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.41-33.5 47.3 94.7a17.31 17.31 0 0 0 31 0l47.31-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3a17.33 17.33 0 0 0 .2-31.1zm-155.9 106c-49.91 49.9-131.11 49.9-181 0a128.13 128.13 0 0 1 0-181c49.9-49.9 131.1-49.9 181 0a128.13 128.13 0 0 1 0 181z" className={styleNav.secondaryUI}></path><path fill="currentColor" d="M352 256a96 96 0 1 1-96-96 96.15 96.15 0 0 1 96 96z" className={styleNav.primaryUI}></path></g></svg>

        </li>

      </nav>

      <ErrorHandling setshow={setShow} show={show} >{error}</ErrorHandling>
    </>
  );
}

export default Navbar;