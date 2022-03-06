import { useParams } from 'react-router-dom';
import Timer from '../components/pomo/timer/Timer';
import Settings from '../components/pomo/Settings';
import ShareMenu from '../components/pomo/ShareMenu';
import { Helmet } from 'react-helmet';
import "../styles/pomo.scss"
import { useState } from 'react';
import { defaultOptions } from "../lib/constants";

export default function Pomo() {
  const params = useParams();
  const [options, setOptions] = useState(defaultOptions);
  
  const setOptionsHandler = (property: string, value: string | number): void => {
    setOptions({
      ...options,
      [property]: value,
    })
  }

  return (
    <>
      <Helmet>
        <title>{params.id} - Campanula</title>
      </Helmet>
      <section className="pomo-main">
        <div><b>Code</b>: <span className="monospace">* {params.id} *, <div style={{wordBreak: "break-all"}}>{JSON.stringify(options)}</div></span></div>
        <Timer conf={options} />
        <Settings onUpdate={setOptionsHandler} defaultOptions={options}/>
        <hr className='short-hr'/>
        <ShareMenu />
      </section>
    </>
  )
}