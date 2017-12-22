import React, { Component } from 'react';
import {Button, Navbar, Nav, NavItem} from 'react-materialize'

class Header extends Component {
    loginClick(){
        //console.log('clickin')
        this.props.loginClick()
    }
    
    render(){
        return (
               
            <NavItem onClick={this.loginClick.bind(this)} href="#">Login</NavItem>
   
        )
    }

}

export default Header
