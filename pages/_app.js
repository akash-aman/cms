import "../styles/globals.scss";
import "../styles/mytheme.scss";
//import firebase from '../firebase'
// import { AuthProvider } from "../context/authContext";
import dynamic from 'next/dynamic'

const AuthProvider = dynamic(() =>
  import('../context/authContext').then((mod) => mod.AuthProvider))

import ErrorContextProvider from "../context/errorContext";
const MagicScriptTag = () => {
  const codeToRunOnClient = `
  (function() {
  function getInitialColorMode() {
  
  const persistedColorPreference = window.localStorage.getItem('color-mode');
  const hasPersistedPreference = typeof persistedColorPreference === 'string';
  
  if (hasPersistedPreference) {
    return persistedColorPreference;
  }
  
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const hasMediaQueryPreference = typeof mql.matches === 'boolean';
  if (hasMediaQueryPreference) {
    return mql.matches ? 'dark-theme' : 'light-theme';
  }
  
  return 'dark-theme';
  }
  let colorMode = getInitialColorMode();
  const bodyclass = document.body;
  
  bodyclass.className = colorMode;
})()
  `;

  let calledFunction = codeToRunOnClient;

  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: calledFunction }} />;
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <MagicScriptTag />

      <AuthProvider>
        <ErrorContextProvider>
          <Component {...pageProps} />
        </ErrorContextProvider>
      </AuthProvider>

    </>
  );
}

export default MyApp;
