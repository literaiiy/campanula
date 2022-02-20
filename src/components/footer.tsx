export default function Footer() {
  return (
    <footer>
      <p>
        Copyright © {new Date().getFullYear()} <a href="https://literaiiy.me">literaiiy</a>.
        Built with <a href="https://www.mongodb.com/">MongoD</a><a href="https://www.youtube.com/watch?v=b2F-DItXtZs">B</a>,
        {" "}<a href="https://expressjs.com/">Express</a>, 
        {" "}<a href="https://reactjs.org/">React</a>, 
        and <a href="https://nodejs.org/en/">Node</a>.
        Powered by <a href="https://vercel.com/">Vercel</a>.
        </p>
    </footer>
  )
}