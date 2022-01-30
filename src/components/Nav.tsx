import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <Link to="/">
        <div className='campanula-logo'>
          <span className="teal">C</span>aM<span className="purple">P</span>An<span className="velvet">U</span>la
        </div>
        <div className="campanula-logo-mobile">
          <span className="velvet">U</span>
        </div>
      </Link>
      <Link className='button' to="/pomo">Get started</Link>
    </nav>
  )
}