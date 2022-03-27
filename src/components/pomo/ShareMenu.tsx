import { ShareFill } from "react-bootstrap-icons"
import { useState, useEffect, useRef } from "react";
import copy from 'copy-to-clipboard'
import { Slide, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import "../../styles/ShareMenu.scss"
import { ISettingsObj } from "../../lib/constants";
import { preProcessFile } from "typescript";
import { usePrevious } from '../../lib/constants'

interface Props {
  rawConfig: string;
}

export default function ShareMenu(props: Props): JSX.Element {
  
  console.log("%c ShareMenu.tsx has rerendered", "color:goldenrod; font-weight: 900")
  let prevRawConfig: string | undefined = usePrevious(props.rawConfig)
  console.log(prevRawConfig);
  console.log(props.rawConfig)
  

  const handleShare = () => {
    if (prevRawConfig !== props.rawConfig) {
      console.log("Database has been queried")
      prevRawConfig = props.rawConfig
    }
    if (navigator.share) {
        navigator
          .share({
            title: "Campanula",
            text: "Share this pomodoro timer!",
            url: `https://example.com/${props.rawConfig}` 
          })
          .then(() => {
            console.log("shared")
          })
          .catch((e) => {
            console.error(e);
          })
    } else {
      copy('https://example.com')
      toast("Link copied!", {
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <>
      <button className='share-button button' onClick={handleShare}>
        <ShareFill/>
        <ToastContainer
          limit={1}
          transition={Slide}
          position={toast.POSITION.BOTTOM_RIGHT}
          autoClose={1500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <span>Share</span>
      </button>
    </>
  )
}