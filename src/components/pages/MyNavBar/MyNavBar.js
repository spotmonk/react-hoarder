import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import firebase from 'firebase/app';
import 'firebase/auth';

class MyNavBar extends React.Component {
  state = {
    isOpen: false,
  }

  toggle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  loadLogOut = () => {
    const { authed } = this.props;
    if (authed) {
      return <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.logOutEvent}>Log Out <i className="fas fa-sign-out-alt"></i></button>;
    }
    return <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.logInEvent}>Log In</button>;
  }

  logInEvent = (e) => {
    e.preventDefault();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider);
  }

  logOutEvent = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  buildNavbar = () => {
    const { authed } = this.props;
    if (authed) {
      return (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={RRNavLink} to="/home">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to="/stuff">My Stuff</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to="/stuff/new">New</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.logOutEvent} >Log Me Out</NavLink>
          </NavItem>
        </Nav>
      );
    }
    return (
      <nav className="ml-auto" navbar>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.logInEvent}>Log In</button>
      </nav>
    );
  }

  render() {
    const { isOpen } = this.state;
    return (
        <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">React Hoarder!</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          {this.buildNavbar()}
        </Collapse>
      </Navbar>
    </div>
    );
  }
}

export default MyNavBar;
