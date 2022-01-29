import { useParams } from 'react-router-dom';

export default function Pomo() {
  let params = useParams();
  return (
    <>
      Single pomodoro: {params.id}
    </>
  )
}