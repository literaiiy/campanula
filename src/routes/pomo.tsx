import { useParams } from 'react-router-dom';
import Timer from '../components/pomo/timer/Timer';
import Settings from '../components/pomo/Settings';
import ShareMenu from '../components/pomo/ShareMenu';
import { Helmet } from 'react-helmet';
import "../styles/pomo.scss"
import { useState } from 'react';
import { defaultOptions } from "../lib/constants";
import { cAdjust, convertToCSSSafe, optionsToRawConfig } from '../lib/funcs';
import { usePrevious } from '../lib/constants';
import { ISettingsObj } from '../lib/constants';

export default function Pomo() {
  const params = useParams();
  const [options, setOptions] = useState(defaultOptions);
  // const prc = usePrevious(options);
  // const rcChanged = optionsToRawConfig(prc || options) !== optionsToRawConfig(options)
  // console.log(prc)
  // console.log(options)
  // console.log(rcChanged)
  
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
        <div><b>Code</b>: <span className="monospace">* {params.id} *, <div style={{wordBreak: "break-all"}}>{JSON.stringify(options)}</div></span></div>
        <Timer conf={options} />
        <Settings onUpdate={setOptionsHandler} defaultOptions={options}/>
        <hr className='short-hr'/>
        <ShareMenu rawConfig={optionsToRawConfig(options)}/>
      </section>
    </>
  )
}