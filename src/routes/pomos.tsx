import { Outlet } from 'react-router-dom';
import PomoTemplate from '../components/pomos/PomoTemplate';
import { Helmet } from 'react-helmet';
import "../styles/pomos.scss"

export default function Pomos(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Pomodoro Templates - Campanula</title>
      </Helmet>
      <section className='pomos-list'>
        <div className="pomos-list-desc">
          <h1 className='pomos-header'>Easy, pre-made pomodoro timer templates.</h1>
        </div>
        <ul className='template-list'>
          <PomoTemplate slug="default" name='🍅 Default' sets={4} work={1500} break={300} longBreak={900}/>
          <PomoTemplate slug="lenient" name='😴 Lenient' sets={4} work={1800} break={600} longBreak={1200}/>
          <PomoTemplate slug="hard-worker" name='👷 Hard Worker' sets={4} work={3600} break={600} longBreak={1800}/>
          <PomoTemplate slug="3-hour-special" name='🕒 The 3-hour Special' sets={5} work={1800} break={360} longBreak={900}/>
          <PomoTemplate slug="5217" name='📻 52 / 17' sets={4} work={3120} break={1020} longBreak={1020}/>
          <PomoTemplate slug="workhorse" name='🐴 The Workhorse' sets={3} work={2100} break={300} longBreak={900}/>
        </ul>
        <Outlet />
      </section>
    </>
  )
}