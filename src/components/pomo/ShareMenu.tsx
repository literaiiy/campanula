import { ShareFill } from "react-bootstrap-icons"
import { useState } from "react";
import copy from 'copy-to-clipboard'
import { Slide, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import "../../styles/ShareMenu.scss"
import { usePrevious } from '../../lib/constants'
import { qDBCtoR, qDBRtoC } from '../../lib/funcs'

interface Props {
  rawConfig: string;
}

export default function ShareMenu(props: Props): JSX.Element {
  
  console.log("%c ShareMenu.tsx has rerendered", "color:goldenrod; font-weight: 900")
  let prevRawConfig: string | undefined = usePrevious(props.rawConfig)
  const [code, setCode] = useState("default")
  console.log(prevRawConfig);
  console.log(props.rawConfig)

  const handleShare = async () => {
    console.log(prevRawConfig, props.rawConfig)
    if (prevRawConfig !== props.rawConfig) {
      console.warn("Querying database...")
      const res = await qDBRtoC(props.rawConfig)
      console.log(res)
      prevRawConfig = props.rawConfig

    }
    share(code)
  }

  const share = (code?: string): void => {
    const sharable = "" + code
    if (navigator.share) {
      navigator
        .share({
          title: "Campanula: a completely customizable pomodoro experience",
          text: `Try this pomodoro timer! - ${sharable}`,
          url: sharable
        })
        .then(() => {
          console.log("shared")
        })
        .catch((e) => {
          console.error(e);
        })
    } else {
      copy(sharable)
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