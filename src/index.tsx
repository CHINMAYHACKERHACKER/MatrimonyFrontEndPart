import { HelmetProvider } from 'react-helmet-async';
import ReactDOM from 'react-dom';
import { BrowserRouter, Outlet, Route, Routes, HashRouter } from 'react-router-dom';
import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import Reset from './content/overview/reset/reset';
import Forgetpassword from './content/overview/forgetpassword/forgetpassword';
import React from 'react';


ReactDOM.render(
  <HelmetProvider>
    <SidebarProvider>
      {/* <BrowserRouter basename='/tothePoint_login'> */}
      <BrowserRouter>
        {/* <HashRouter> */}
        <Routes >
          <Route path="/reset-password/:token" element={<Reset />} />
          <Route path="/forgotpassword" element={<Forgetpassword />} />
        </ Routes>
        <Outlet />
        <App />
        {/* </HashRouter> */}
      </BrowserRouter>
    </SidebarProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();