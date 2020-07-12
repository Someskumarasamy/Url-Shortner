
import Link from 'next/link';
import React, { useState } from 'react';

import data from '../../public/data/nav_bar.json';
import FeedbackDialog from '../dialogs/LicenseDialog'

const NavBarBrand = () => {
  return (
    <a className="navbar-brand mr-auto mr-lg-0" href="/">{data.nav_bar_title}</a>
  )
}
const ToggleIcon = (props) => {
  return (
    <button className="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas" onClick={props.toggle}>
      <span className="navbar-toggler-icon">
        <i className={`fa ${props.isOpen ? 'fa-times' : 'fa-bars'}`} aria-hidden="true"></i>
      </span>
    </button>
  )
}


const UserDropDown = (props) => {
  const [isFeedbckOpen, setFeedbckOpen] = useState(false);
  const toogleFeedbck = () => {
    setFeedbckOpen(!isFeedbckOpen);
  }
  return (
    <>
      <FeedbackDialog isOpen={isFeedbckOpen} close={toogleFeedbck} />
      <div className="nav-item">
        <a className="nav-link" href="#" id="userdropdwn" onClick={toogleFeedbck}>MIT Licensed</a>
      </div>
    </>
  );
}

const UserNavLinks = (props) => {
  const linksData = data.nav_bar_items;
  return (
    Object.keys(linksData).map(key => (
      <li className={`nav-item${props.spath === linksData[key].link ? " active" : ""}`} key={linksData[key].title}>
        <Link href={linksData[key].link}>
          <a className="nav-link" >{linksData[key].title}</a>
        </Link>
      </li>
    ))
  )
}
const UserNavBar = (props) => {
  return (
    <section className="user-navbar-section">
      <nav className="navbar navbar-expand-lg fixed-top usr-navbar">
        {/* <ToggleIcon toggle={props.toggle} isOpen={props.isOpen} /> */}
        <NavBarBrand />
        <div className={`navbar-collapse offcanvas-collapse ${props.isOpen ? 'open' : ''}`} id="usernavbar">
          <ul className="navbar-nav mr-auto">
            <UserNavLinks spath={props.spath} />
          </ul>
        </div>
          <>
            {props.admin && <AdminDropDown />}
            <UserDropDown role={'User'}/>
          </>
      </nav>
    </section>
  )
}
export default function NavBar(props) {
  //--Use nav bar toogle state
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const selectedPath = props.pathname;//props.name; 
  return (
    <>
      <UserNavBar toggle={toggle} isOpen={isOpen} spath={selectedPath}/>
    </>
  );
}