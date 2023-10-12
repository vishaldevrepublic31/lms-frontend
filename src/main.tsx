import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './redux/store';
import React from "react"
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store} >
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </Provider>
  ,
)
