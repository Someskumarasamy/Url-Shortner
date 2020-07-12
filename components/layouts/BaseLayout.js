import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';

import PropTypes from 'prop-types';
import Navbar from '../navbar/NavbarComponent'
import { useRouter } from 'next/router'
const BaseLayout = (props) => {
  const { className } = props;
  var { children } = props;
  const router = useRouter();
  const pathname = router.pathname;
  return (

    <>
      <div className="layout-container">
        <Navbar pathname={pathname} />
        <main className={`cover ${className}`}>
          <div className="wrapper">
          <ToastContainer hideProgressBar={true} />
            <div className={`base-page ${className}`}>
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
BaseLayout.propTypes = {
  className: PropTypes.any.isRequired,
};
export default BaseLayout;