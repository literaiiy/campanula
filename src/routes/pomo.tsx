import { useParams } from 'react-router-dom';
import Timer from '../components/pomo/timer/Timer';
import Settings from '../components/pomo/Settings';
import ShareMenu from '../components/pomo/ShareMenu';
import { Helmet } from 'react-helmet';
import "../styles/pomo.scss"
import { useState } from 'react';
import { defaultOptions } from "../lib/constants";
import type { ISettingsObj } from '../lib/constants.js';

export default function Pomo() {
  const params = useParams();

  // DEVELOPMENT ONLY
  // const data: Record<string, ISettingsObj> = {'default': {work: 25,break: 5,long_break: 15,pomodoros: 4,bg_color: "#FFFFFF",text_color: "#000000",font: "Readex Pro"}}

  // const [settings, setSettings] = useState(data[params.id || 'hard-worker']);
  const [options, setOptions] = useState(defaultOptions);
  
  const setOptionsHandler = (property: string, value: string | number) => {
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
        <Timer conf={options}/>
        <Settings onUpdate={setOptionsHandler} />
        <hr className='short-hr'/>
        <ShareMenu />
      </section>
    </>
  )
}