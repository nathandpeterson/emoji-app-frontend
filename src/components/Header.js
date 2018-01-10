import React, { Component } from 'react'
import {Button} from 'react-materialize'

class Header extends Component {
    loginClick(){
        // Remove dead code!
        this.props.loginClick()
    }

    logoutClick(){
        this.props.logoutClick()
    }

    render(){
        let login
        this.props.accessToken ?
          login = <Button className="login" onClick={this.logoutClick.bind(this)} href="#">Logout</Button>
        : login = <Button className="login" onClick={this.loginClick.bind(this)} href="#">Login</Button>
        return (
            login
        )
    }
}

export default Header
