import { secToHMS } from "../../../lib/funcs";
interface Props {
  cdTime: number;
}

export default function Countdown(props: Props): JSX.Element {
  return (
    <>
      <div className='time'>
        {secToHMS(props.cdTime, true)}
      </div>
    </>
  )
}

