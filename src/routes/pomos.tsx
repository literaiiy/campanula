import { Link, Outlet } from 'react-router-dom';
import PomoTemplate from '../components/pomos/PomoTemplate';
import { Helmet } from 'react-helmet';
import "../styles/pomos.scss"

export default function Pomos() {
  return (
    <>
      <Helmet>
        <title>Pomodoro Templates - Campanula</title>
      </Helmet>
      <section className='pomos-list'>
        <div className="pomos-list-desc">
          <h1>Easy, pre-made pomodoro timer templates.</h1>
          <p>Select from some of the templates below.</p>
        </div>
        <ul className='template-list'>
          <PomoTemplate slug="default" name='🍅 Default' sets={4} work={25} break={5} longBreak={15}/>
          <PomoTemplate slug="hard-worker" name='👷 Hard Worker' sets={4} work={60} break={10} longBreak={30}/>
          <PomoTemplate slug="lenient" name='😴 Lenient' sets={4} work={30} break={10} longBreak={20}/>
          <PomoTemplate slug="3-hour-special" name='🕒 The 3-hour Special' sets={5} work={30} break={6} longBreak={15}/>
          <PomoTemplate slug="workhorse" name='🐴 The Workhorse' sets={3} work={35} break={5} longBreak={15}/>
          <PomoTemplate slug="5217" name='📻 52 / 17' sets={1} work={52} break={17} longBreak={17}/>
        </ul>
        <Outlet />
      </section>
    </>
  )
}