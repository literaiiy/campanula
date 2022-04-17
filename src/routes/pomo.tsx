import { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import Settings from '../components/pomo/Settings';
import ShareMenu from '../components/pomo/ShareMenu';
import Timer from '../components/pomo/timer/Timer';
import { nullerOptions, nullOptions } from "../lib/constants";
import { cAdjust, convertToCSSSafe, optionsToRawConfig, qDBCtoR, rawConfigToOptions } from '../lib/funcs';
import "../styles/pomo.scss";
import NotFound from './404';

export default function Pomo() {
  console.log("%c pomo.tsx has rerendered", "color:darkgreen; font-weight: 900")
  const params = useParams();
  const [options, setOptions] = useState(nullOptions);
  const shiteRender = useRef(true);
  
  const setOptionsHandler = (property: string, value: string | number): void => {
    setOptions({
      ...options,
      [property]: value,
    })
  }
  
  // On first load, query DB for raw config from code
  useEffect(() => {
    console.warn("First load useEffect run")
    const fn = async () => {
      console.log(" my balls")
      if (params.id) {
        console.log("my balls3")
        const rc = await qDBCtoR(params.id)
        console.log(rc)
        setOptions(rawConfigToOptions(rc) || nullerOptions)
        
        console.log(options)
        shiteRender.current = false;
      }
    };
    fn()
  }, [])

  if (options.pomodoros === 31) return <></> 
  if (isNaN(options.pomodoros)) return <NotFound />

  return (
    <>
      <Helmet>
        <title>{params.id} - Campanula</title>
        <style>{`
          :root {
            --bg: ${options.bg_color};
            --bg2: ${cAdjust(options.bg_color, -10)};
            --bg3: ${cAdjust(options.bg_color, -20)};
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
        <Timer conf={options} />
        <Settings onUpdate={setOptionsHandler} defaultOptions={options}/>
        <hr className='short-hr'/>
        <ShareMenu rawConfig={optionsToRawConfig(options)}/>
      </section>
    </>
  )
}