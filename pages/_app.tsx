import React from 'react'
import '../styles/globals.css'
import '../styles/login.css'
import '../styles/createBlog.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import roorReducers from '../store/redux/reducers/index';

const store =createStore(roorReducers,applyMiddleware(thunk))


export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </React.StrictMode>
  )
}
