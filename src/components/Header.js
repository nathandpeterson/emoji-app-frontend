import React, { Component } from 'react';
import {Button, Navbar, Nav, NavItem} from 'react-materialize'

class Header extends Component {
    loginClick(){
        //console.log('clickin')
        this.props.loginClick()
    }

    logoutClick(){
        this.props.logoutClick()
    }
    
    render(){
        let navItems
        this.props.accessToken ?
          navItems = <NavItem onClick={this.logoutClick.bind(this)} href="#">Logout</NavItem> 
        : navItems = <NavItem onClick={this.loginClick.bind(this)} href="#">Login</NavItem>
        return (
            navItems
        )
    }
}

export default Header
