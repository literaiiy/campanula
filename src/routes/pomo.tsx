import { useParams } from 'react-router-dom';
import Timer from '../components/Timer';
import Settings from '../components/Settings';
import ShareMenu from '../components/ShareMenu';
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
        <div><b>Code</b>: {params.id}</div>
        <Timer />
        <Settings />
        <ShareMenu />
      </section>
    </>
  )
}