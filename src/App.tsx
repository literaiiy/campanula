import './styles/App.scss';
import './styles/normalize.min.scss';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/footer';
import { Helmet } from 'react-helmet';
import { META_DESC } from './lib/constants';

function App(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Campanula: A completely customizable pomodoro experience</title>
      </Helmet>
      <Nav />
      <main>
        <Outlet></Outlet>
      </main>
      <Footer />
    </>
  );
}

export default App;
