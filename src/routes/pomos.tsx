import { Link, Outlet } from 'react-router-dom';
import PomoTemplate from '../components/PomoTemplate';

export default function Pomos() {
  return (
    <>
      <section className='pomos-list'>
        <div className="pomos-list-desc">
          <h1>Easy, pre-made pomodoro timer templates.</h1>
          <p>Select from some of the templates below.</p>
        </div>
        <ul className='template-list'>
          <PomoTemplate slug="default" name='🍅 Default' sets={4} work={25} break={5} longBreak={15}/>
          <PomoTemplate slug="hard-worker" name='👷 Hard Worker' sets={4} work={60} break={10} longBreak={30}/>
          <PomoTemplate slug="lenient" name='😴 Lenient' sets={4} work={30} break={10} longBreak={20}/>
        </ul>
        <Outlet />
      </section>
    </>
  )
}