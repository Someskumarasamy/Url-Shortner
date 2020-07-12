import React from 'react'
import App from 'next/app'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/font-awesome/scss/font-awesome.scss';
import '../styles/main.scss';
export default class CApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Component {...pageProps} />
      </>

    )
  }
}
