import { useParams } from 'react-router-dom';
import Timer from '../components/pomo/timer/Timer';
import Settings from '../components/pomo/Settings';
import ShareMenu from '../components/pomo/ShareMenu';
import { Helmet } from 'react-helmet';
import "../styles/pomo.scss"

export default function Pomo() {
  let params = useParams();
  return (
    <>
      <Helmet>
        <title>{params.id} - Campanula</title>
      </Helmet>
      <section className="pomo-main">
        <div><b>Code</b>: <span className="monospace">{params.id}</span></div>
        <Timer />
        <Settings />
        <hr className='short-hr'/>
        <ShareMenu />
      </section>
    </>
  )
}