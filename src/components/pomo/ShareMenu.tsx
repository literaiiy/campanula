import { useEffect, useState, useRef } from "react";
import { ShareFill } from "react-bootstrap-icons";
import { Slide, toast, ToastContainer } from 'react-toastify';
import { usePrevious } from '../../lib/constants';
import { qDBRtoC } from '../../lib/funcs';
import copy from 'copy-to-clipboard';
import 'react-toastify/dist/ReactToastify.css';
import "../../styles/ShareMenu.scss";

export default function ShareMenu(props: {rawConfig: string}): JSX.Element {
  
  console.log("%c ShareMenu.tsx has rerendered", "color:goldenrod; font-weight: 900")
  let prevRawConfig: string | undefined = usePrevious(props.rawConfig)
  const [code, setCode] = useState<string | undefined>(window.location.pathname.split("/").slice(-1).pop())
  const [shouldShare, setShouldShare] = useState<boolean>(false);
  const mountRef = useRef<boolean>(false)
  console.log(props.rawConfig)
  
  const handleShare = async (): Promise<void> => {
    
    // Quit function if the pomodoro count is 31 (signifying that it is a default load)
    if (props.rawConfig[18] === "v") { return; }
    
    if (("" + prevRawConfig)[18] === "v") {
      prevRawConfig = props.rawConfig;
    }
    
    console.log(prevRawConfig, props.rawConfig)
    if (prevRawConfig !== props.rawConfig) {
      console.warn("Querying database...")
      let res: React.SetStateAction<string | undefined> | null = await qDBRtoC(props.rawConfig);
      console.log(res);
      console.log("SNOWBALL")
      setCode( res || "default");
      // console.log({code})
      if (!prevRawConfig) share(code);
    } else {
      setShouldShare(!shouldShare)
      console.log("Should share?: " + shouldShare)
    }
    prevRawConfig = props.rawConfig;
  }
  
  useEffect(() => {
    console.log("new code set: " + code)
    console.log({prevRawConfig})
    console.log(`props.rawConfig ${props.rawConfig}`)
    if (mountRef.current && prevRawConfig) {
      console.log("About to share" + code)
      share(code)
    }
    mountRef.current = true;
  }, [code])

  useEffect(() => {
    console.log("Non-change useEffect ran")
    // Quit method if the pomodoro count is 31 (signifying that it is a default load)
    if (props.rawConfig[18] === "v" || !prevRawConfig) { return; }
    
    if (mountRef.current) {
      console.log("code hasn't changed, sharing now")
      share(code)
    }
  }, [shouldShare])

  const share = (code?: string): void => {
    const sharable: string = window.location.protocol + "//" + window.location.hostname + "/pomo/" + code
    console.log("Inside the share function, going to share")
    if (navigator.share) {
      navigator
        .share({
          title: "Campanula: a completely customizable pomodoro experience",
          text: `Try this pomodoro timer! - ${code}`,
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
      toast(`Link copied! ${sharable}`, {
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
          limit={5}
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