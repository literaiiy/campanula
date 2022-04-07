import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import Settings from '../components/pomo/Settings';
import ShareMenu from '../components/pomo/ShareMenu';
import Timer from '../components/pomo/timer/Timer';
import { defaultOptions } from "../lib/constants";
import { cAdjust, convertToCSSSafe, optionsToRawConfig, qDBCtoR, rawConfigToOptions } from '../lib/funcs';
import "../styles/pomo.scss";

export default function Pomo() {
  const params = useParams();
  const [options, setOptions] = useState(defaultOptions);
  
  const setOptionsHandler = (property: string, value: string | number): void => {
    setOptions({
      ...options,
      [property]: value,
    })
  }

  useEffect(() => {
    async function fn() {
      if (params.id) {
      let rc = await qDBCtoR(params.id)
      console.log(rc)
      setOptions(rawConfigToOptions(rc))
    }}

    fn()
  }, [])


  return (
    <>
      <Helmet>
        <title>{params.id} - Campanula</title>
        <style>{`
          :root {
            --bg: ${options.bg_color};
            --bg2: ${cAdjust(options.bg_color, -5)};
            --bg3: ${cAdjust(options.bg_color, -15)};
            --acc: ${options.text_color};
          }
          .campanula-logo * {
            ${options.text_color !== "#1c1c20" || options.bg_color !== "#FFFFFF" ? `color: var(--acc) !important` : ''}
          }
          .campanula-logo-mobile * {
            ${options.text_color !== "#1c1c20" || options.bg_color !== "#FFFFFF" ? `color: var(--acc) !important` : ''}
          }
          main, nav {
            background-color: var(--bg);
            font-family: "${convertToCSSSafe(options.font)}" !important;
          }
          main *:not(option), .button, hr {
            color: var(--acc) !important;
            font-family: inherit !important;
            ${options.text_color !== "#1c1c20" || options.bg_color !== "#FFFFFF" ? `border-color: var(--acc) !important` : ''};
          }
          button, .button, input, select, .timer, hr {
            background-color: var(--bg2) !important;
            ${options.bg_color !== "#FFFFFF" ? `box-shadow: -0.25rem 0.25rem var(--bg3) !important;` : ``}
          }
          timer > div {
            background-color: transparent !important;
          }
        `}</style>
      </Helmet>
      <section className="pomo-main">
         {/*<div><b>Code</b>: <span className="monospace">{params.id}, <div style={{wordBreak: "break-all"}}>{JSON.stringify(options)}</div></span></div> */} 
        <Timer conf={options} />
        <Settings onUpdate={setOptionsHandler} defaultOptions={options}/>
        <hr className='short-hr'/>
        <ShareMenu rawConfig={optionsToRawConfig(options)}/>
      </section>
    </>
  )
}