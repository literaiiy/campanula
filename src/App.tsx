import React from 'react';
import './App.scss';
import './normalize.min.scss';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/footer';

function App() {
  return (
    <>
      <Nav />
      <main>
        <Outlet></Outlet>
      </main>
      <Footer />
    </>
  );
}

export default App;
