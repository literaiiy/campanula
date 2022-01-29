import { useParams } from 'react-router-dom';
import Timer from '../components/Timer';
import Settings from '../components/Settings';
import ShareMenu from '../components/ShareMenu';

export default function Pomo() {
  let params = useParams();
  return (
    <>
      <div>Code: <em>{params.id}</em></div>
      <Timer />
      <Settings />
      <ShareMenu />
    </>
  )
}