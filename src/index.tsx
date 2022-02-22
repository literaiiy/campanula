import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Pomos from "./routes/pomos";
import Pomo from "./routes/pomo";
import NotFound from "./routes/404";
import Main from "./routes/main";
import Privacy from './routes/privacy';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Main />}></Route>
        <Route path="/pomo">
          <Route path="/pomo" element={<Pomos />}></Route>
          <Route path=":id" element={<Pomo />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/privacy" element={<Privacy />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.info);
