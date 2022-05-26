import { Helmet } from "react-helmet";
import "../styles/document.scss"

export default function Help(): JSX.Element {

  return (
    <>
      <Helmet>
        <title>How to use - Campanula</title>
      </Helmet>
      <section className='main'>
        <div className='content'>
          <h1>How to use Campanula</h1>
          <p>Last updated April 8, 2022</p>
          <p>If you've never used the pomodoro method before or are confused with the way Campanula works, here is a short guide to aid you in using this website.</p>
          <h2>What is the pomodoro method?</h2>
          <p>The pomodoro method, invented by Italian author Francesco Cirillo in the 1980s, is a time management method that aims to separate a sizable task into more easy-to-digest intervals. Each interval, called a pomodoro, is comprised of a work session and a break session— generally 25 minutes of work and 5 minutes of rest. After a set amount of pomodoros (generally 4), a long break commences (generally 15 minutes long).</p>
          <p>Cirillo and savvy followers of the Pomodoro method generally encourage the use of a low-tech solution (Cirillo originally used a kitchen tomato timer while creating this method; hence— pomodoro— the Italian word for tomato), so Campanula intends to make the process of using the method as non-intrusive and non-distracting as possible while allowing creative and functional freedom where it should be allowed.</p>
          <h2>Getting started</h2>
          <p>To get started with creating a timer, you can either click the top right "GET STARTED" button or scroll to the bottom of the homepage and select either "BROWSE TEMPLATES" or "CREATE A TIMER". Clicking one of the former two will allow you to choose from a selection of pre-made templates so you can get started right away or customize a little. Clicking the "CREATE A TIMER" button will take you directly to the default template.</p>
          <img src="/help/how-to-use-1.webp" alt="A screenshot of the timer creation page." />
          <p>From here, you will be able to customize the length of the work, break, and long break sessions, the amount of pomodoros before a long break, the background and accent colors, and the font.</p>
          <h2>Running the timer</h2>
          <p>Once you have created the timer, you can run it straight away by clicking the play button. The first pomdoro will start to count down, so get working!</p>
          <img src="/help/how-to-use-2.webp" alt="A screenshot of the timer running on the third pomodoro." />
          <p>After each session's countdown is completed, you will hear a ding signifying the end of the current session and the start of the next one. Half of the current pomodoro (represented as one of the circles above the countdown) will fill up. If the circle is halfway filled, the break session is starting. If the circle is completely filled, the next pomodoro is starting. </p>
          <p>If you want, you can also change any of the settings while the timer is counting down.</p>
          <h2>Sharing your timer</h2>
          <p>To share your timer with someone else or to open it on a different device, you can use the share button at the bottom of the page to open the share menu on your device. Options to share with any installed apps, via email, and to copy the link should show up. If your device doesn't support share menus, the link will be copied to your clipboard.</p>
          <p>Congratulations! You now know how to create, use, and share a pomodoro timer in Campanula. Thank you for using Campanula!</p>
        </div>
      </section>
    </>
  )
}