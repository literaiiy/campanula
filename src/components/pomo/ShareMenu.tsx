import copy from 'copy-to-clipboard';
import { useState } from "react";
import { ShareFill } from "react-bootstrap-icons";
import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePrevious } from '../../lib/constants';
import { qDBRtoC } from '../../lib/funcs';
import "../../styles/ShareMenu.scss";

export default function ShareMenu(props: { rawConfig: string}): JSX.Element {
  
  console.log("%c ShareMenu.tsx has rerendered", "color:goldenrod; font-weight: 900")
  let prevRawConfig: string | undefined = usePrevious(props.rawConfig)
  const [code, setCode] = useState("default")
  console.log(prevRawConfig);
  console.log(props.rawConfig)

  const handleShare = async (): Promise<void> => {
    console.log(prevRawConfig, props.rawConfig)
    if (prevRawConfig !== props.rawConfig) {
      console.warn("Querying database...")
      const res = await qDBRtoC(props.rawConfig)
      console.log(res)
      
      console.log("c")
      setCode(res || "default")
    }
    console.log("About to share")
    share(code)
  }

  const share = (code?: string): void => {
    const sharable: string = window.location.protocol + "//" + window.location.hostname + "/pomo/" + code
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