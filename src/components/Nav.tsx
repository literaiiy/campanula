import { Link } from 'react-router-dom';
import "../styles/Nav.scss"

export default function Nav(): JSX.Element {
  return (
    <nav>
      <Link to="/">
        <div className='campanula-logo'>
          <span className="teal">C</span>
          <span className="black">aM</span>
          <span className="purple">P</span>
          <span className="black">An</span>
          <span className="velvet">U</span>
          <span className="black">la</span>
        </div>
        <div className="campanula-logo-mobile">
          <span className="velvet">U</span>
        </div>
      </Link>
      <div className='button-row'>
        <Link className='button-alt' to='/help'>?</Link>
        <Link className='button' to="/pomo">Get started</Link>
      </div>
    </nav>
  )
}