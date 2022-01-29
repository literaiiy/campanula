import React from 'react';
import './App.scss';
import './normalize.min.scss';
import { Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <>
      <nav>
        <Link to="/">
          <div className='campanula-logo'>
            <span className="teal">C</span>aM<span className="purple">P</span>An<span className="velvet">U</span>la
          </div>
        </Link>
        <Link to="/pomo">Pomo</Link>
      </nav>
      <main>
        <Outlet></Outlet>
      </main>
      <hr />
      <footer>
        <h2>Footer</h2>
        <p>Footer</p>
      </footer>
    </>
  );
}

export default App;
