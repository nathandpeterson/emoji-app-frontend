import React, { Component } from 'react';
import './App.css';
import Keyboard from './components/Keyboard.js'
import Auth0Lock from 'auth0-lock'
import {Button} from 'react-materialize'
import Header from './components/Header.js'
import Landing from './components/Landing'
import Dash from './components/Dash'

class App extends Component {
  constructor(){
    super()
    this.state = {
      accessToken: '',
      profile: {}
    }
  }

  static defaultProps = {
    clientId: 'oZl3hH2eA3ohIHz62cQqNgCh9DQUzrSq',
    domain: 'emojiapi.auth0.com'
  }

  componentWillMount(){
    this.lock = new Auth0Lock(this.props.clientId, this.props.domain)
    this.lock.on('authenticated', (authResult)=>{
      console.log(authResult, 'authResult')
      this.lock.getUserInfo(authResult.accessToken, (error, profile)=>{

        if(error) {
          console.log(error)
          return
        }
        //send to api server
        //if email log user else post signup
        //log in -  return id from db
        //store id in local storage
        console.log(profile)
        this.setData(authResult.accessToken, profile)
      })
    })

    this.getData()
  }

  //function for setting token and profile data
  setData(accessToken, profile){
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('profile', JSON.stringify(profile))
    this.setState({
      accessToken: localStorage.getItem('accessToken'),
      profile: JSON.parse(localStorage.getItem('profile'))
    })
  }

  //token check and grab profile
  getData(){
    if(localStorage.getItem('accessToken') != null){
      this.setState({
        accessToken: localStorage.getItem('accessToken'),
        profile: JSON.parse(localStorage.getItem('profile'))
      }, ()=>{
        console.log(this.state)
      })
    }
  }

  //auth0 modal
  showModal(){
    this.lock.show()
  }

  //delete token in state and local storage
  logout(){
    this.setState({
      accessToken: '',
      profile: ''
    }, () => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('profile')
    })

  }

  render() {

    return (
      <div className="App">
      {/* header is essentially the nav, it doesn't actually have to be a header, . . . .*/}
      <Header
      lock={this.lock}
      accessToken={this.state.accessToken}
      profile={this.state.profile}
      logoutClick={this.logout.bind(this)}
      loginClick={this.showModal.bind(this)}
      />
      {/* this below is the page from the ternary below render */}

      {this.state.accessToken ? <Dash
            lock={this.lock}
            accessToken={this.state.accessToken}
            profile={this.state.profile}
            logout={this.logout.bind(this)}
            /> :
      <Landing loginClick={this.showModal}
                lock={this.lock}
                accessToken={this.state.accessToken}
                profile={this.state.profile}
                />
      }
      </div>
    );
  }
}

export default App;
