import { ShareFill } from "react-bootstrap-icons"
import { useState } from "react";
import copy from 'copy-to-clipboard'
import { Slide, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import "../../styles/ShareMenu.scss"

export default function ShareMenu(): JSX.Element {

  const [codeChanged, setCodeChanged] = useState(false);

  const handleShare = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    // Dev testing only
    setCodeChanged(true)
    if (navigator.share) {
      if (codeChanged) {
        navigator
          .share({
            title: "Campanula",
            text: "Share this pomodoro timer!",
            url: "https://example.com"
          })
          .then(() => {
            console.log("shared")
          })
          .catch((e) => {
            console.error(e);
          })
      } else {
        
      }
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