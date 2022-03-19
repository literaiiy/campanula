import '../styles/404.scss'
import '../styles/App.scss'

export default function NotFound() {
  return (
    <section className='main-404'>
      <h1 className='h1-404'>404</h1>
      <h2 className='h2-404'>Page not found</h2>
      <img className='not-found-svg' src="/404.svg" alt="404" />
      <p>Hmm... the page you were looking for doesn't seem to exist. </p>
      <a href="/" className='styled-a'>Back</a>
    </section>
  )
}