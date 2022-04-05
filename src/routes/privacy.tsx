import { Helmet } from "react-helmet"
import "../styles/privacy.scss"
import { /*queryDB,*/ postPair } from "../lib/funcs";

export default function Privacy() {

  // async function handleDBClick() {
  //   console.log("DB testing...")
  //   const suckIt = prompt("Query")
  //   const rawponse = await queryDB("" + suckIt);
  //   if (!rawponse.ok) { return }
  //   console.log(rawponse)
  //   console.log("this may have worked")
  // }

  const handleDBClick2 = async () => {
    console.log('DB POST testing (disabled)')

    // await postPair(makeid(4), makeid(32))
  }

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Campanula</title>
      </Helmet>
      <section className='privacy-main'>
        <div className="privacy-div">
          <h1>Privacy Policy</h1>
          <p>Last updated February 21, 2022</p>
          <p>Welcome to Campanula's privacy policy. Outlined in this document are the policies and procedures that this website ("Campanula") follows on the disclosure of the user's ("your") personal information while using the Campanula service.</p>
          <p>Personal data is information that can be used to personally identify an individual.</p>
          <h2>Types of data collected</h2>
          <p>Campanula itself does not collect any personally identifiable information, but may use third party tools such as Google Analytics to better gauge audience interaction with the website. Google's privacy policies for their products (including Analytics) can be viewed <a  href="https://policies.google.com/privacy?hl=en-US">here</a>. To summarize, information such as those regarding your visit, web browser and operating system, web technologies versions, and IP address may be collected.</p>
          <h2>Use of your personal data</h2>
          <p>Personal information gathered from Google's Analytics service may be used solely for the purpose of creating a better experience by gauging audience interaction. Personal information reported through the Analytics service will never be used to attempt to identify any specific individual.</p>
          <h2>Sharing of your personal data</h2>
          <p>Campanula does not share your personal data with any third parties.</p>
          <h2>Retention of your personal data</h2>
          <p>Retention of your personal data in the Google Analytics service is outlined in <a href="https://support.google.com/analytics/answer/7667196?hl=en">this</a> support article, which is subject to change. At the time of writing, the length of retention is 26 months.</p>
          <h2>Changes to this Privacy Policy</h2>
          <p>This privacy policy is subject to change without notice. The date of last update will be posted at the top of this privacy policy.</p>
          <h2>Contact us</h2>
          <p>If you have any further inquiries regarding this privacy policy, contact us via the form located at <a href="https://literaiiy.me">literaiiy.me</a>.</p>
        </div>
      </section>

      {/* <button style={{width: "12rem", height:"6rem", alignSelf:"center", margin:"1rem"}} onClick={handleDBClick}>DB test</button> */}
      {/* <button style={{width: "12rem", height:"6rem", alignSelf:"center", margin:"1rem"}} onClick={handleDBClick2}>DB test 2</button> */}
      {/* <button style={{backgroundColor: "red", width: "12rem", height:"6rem", alignSelf:"center", margin:"1rem"}} onClick={handleDBClick3}>Flood</button> */}

    </>
  )
}