import React from 'react';
import './styles/App.scss';
import './styles/normalize.min.scss';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/footer';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <>
      <Helmet>
        <title>Campanula: A completely customizable pomodoro experience</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="/public/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Campanula"
        />
        <meta property="og:title" content="Campanula" />
        <meta property="og:description" content="Campanula" />
        <link rel="apple-touch-icon" href="/public/logo192.png" />
        <link rel="manifest" href="/public/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Azeret+Mono:wght@100;200;300;400;500;600;700;800;900&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Fraunces:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Josefin+Slab:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Major+Mono+Display&family=Manrope:wght@200;300;400;500;600;700;800&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Readex+Pro:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>
      <Nav />
      <main>
        <Outlet></Outlet>
      </main>
      <Footer />
    </>
  );
}

export default App;
