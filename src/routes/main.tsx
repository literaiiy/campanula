import { Link } from "react-router-dom"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import ThreeJSTomato from "../components/ThreeJSTomato"
import "../styles/main.scss"

export default function Main(): JSX.Element {
  return (
    <>
      <section className='main-top'>
        <div className='main-lines'>
          <h1 className='main-headline'>A completely <span className="gradient-customizable">customizable</span> pomodoro experience.</h1>
          <h2 className='main-subheadline'>Welcome to Campanula.</h2>
        </div>
        <div className="main-tomato">
          <Canvas>
            <Suspense fallback={null}>
              <ThreeJSTomato />
              <ambientLight intensity={0.3}/>
              <directionalLight color="white" intensity={1} position={[-2,2,2]} />
            </Suspense>
          </Canvas>
        </div>
      </section>

      <hr className='short-hr'/>

      <section className='description revolutionize'>
        <div className="subcontainer">
          <div className='desc-text-revolutionize'>
            <h2 className='main-header'>Revolutionize your productivity.</h2>
            <p>The pomodoro technique, created by Italian author Francesco Cirillo in the '80s, is a popular time-management technique generally used to split long tasks into smaller, more digestible intervals. At its most basic, the pomodoro technique utilizes a timer to break a task into work and break intervals followed by a longer break after a certain amount of work-break periods (known as "pomodoros").</p>
            <p>Campanula aims to make the process of using the pomodoro technique as simple and unintrusive as possible while allowing you to customize your timer to cater to your specification. </p>
          </div>
          <img className='desc-image-revolutionize' src="/revolutionize.svg" alt="Revolutionize" />
        </div>
      </section>

      <section className='description desc-customize-container'>
        <div className="subcontainer">
          <div className="desc-image-customize-container">
            <img src="/creative.svg" alt="" />
          </div>
          <div className='desc-text-customize'>
            <h2 className='main-header'>Customize to your heart's content.</h2>
            <p>Change everything about your pomodoro timer. Set work, break, long break, and pomodoro lengths to suit your needs. Even change the color of the text, the font, and the color of the background to make your timer really your own.</p>
          </div>
        </div>
      </section>

      <hr className='long-hr'/>

      <section className='description any-device'>
        <div className="subcontainer ">
          <div className='desc-text-any-device'>
            <h2 className='main-header'>Be productive on any device.<br />
              Even share your productivity with a friend.</h2>
              <p>As a web app, Campanula can be used on any device with a browser and internet connection without the need to download an app. Each pomodoro timer has its own custom link that can be opened on any other device or shared with other people.</p>
          </div>
          <img className='desc-text-any-device-image' src="share.svg" alt="" />
        </div>
      </section>

      <section className='description desc-intuitive'>
        <img className='full-width-svg' src="velvet-svg-top.svg" alt="" />
        <div className="intuitive">
          <div className="subcontainer">
            <img className='desc-text-intuitive-image' src="intuitive-2.svg" alt="" />
            <div className='desc-text-intuitive'>
              <h2 className='main-header'>Enjoy an intuitive and elegant interface.</h2>
              <p>Campanula has an easy-to-use but slick user interface that makes it easy for anyone to use. Just open a pre-made template or start with a fresh timer to get started— no sign-up is required! Customize anything you want about your timer just by changing some colors or numbers.</p>
            </div>
          </div>
        </div>
        <img className='full-width-svg' src="velvet-svg-bottom.svg" alt="" />
      </section>

      <hr className="short-hr" />

      <section className='description desc-template'>
          <img className='desc-text-template-image' src="premadetemplates.svg" alt="" />
          <div className='desc-text-template'>
            <h2 className='main-header'>Choose from pre-made templates or create your own.</h2>
            <p>Choose a pre-made template to get started quickly or start customizing your own pomodoro timer.</p>
            <div className='desc-text-template-button-container'>
              <Link className='button' to='/pomo'>Browse templates</Link>
              <Link className='button' to='/pomo/default'>Create a timer</Link>
            </div>
          </div>
      </section> 

    </>
  )
}