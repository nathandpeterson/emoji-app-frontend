import React, { Component } from 'react';
import './App.css';
import Keyboard from './components/Keyboard.js'
import Auth0Lock from 'auth0-lock'
import {Button} from 'react-materialize'
import Header from './components/Header.js'
import Landing from './components/Landing'
import Dash from './components/Dash'
import Spinner from './components/Spinner'

class App extends Component {
  constructor(){
    super()
    this.state = {
      accessToken: '',
      profile: {},
      userInfo: []
    }
  }

  static defaultProps = {
    clientId: 'oZl3hH2eA3ohIHz62cQqNgCh9DQUzrSq',
    domain: 'emojiapi.auth0.com'
  }

  componentDidMount = async () => {
    this.lock = new Auth0Lock(this.props.clientId, this.props.domain)
    await this.lock.on('authenticated', async (authResult)=>{
      // console.log(authResult, 'authResult')
      await this.lock.getUserInfo(authResult.accessToken, async (error, profile)=>{
        if(error) {
          console.log(error)
          return
        }
        //send to api server
        //if email log user else post signup
        //log in -  return id from db
        //store id in local storage
        await this.checkForUser(profile)
        await this.setData(authResult.accessToken, profile)
      })
    })
    this.getData()
  }

  checkForUser = async (profile) => {
    let userExists = await fetch(`http://localhost:3030/api/users`,                     
                                  {body: JSON.stringify({email: profile.email}),
                                  method: 'POST',
                                  headers: {'Content-Type': 'application/json'}
                                  })
    let json = await userExists.json()
    let currentState = await Object.assign({}, this.state)
    await this.setState({...currentState, userInfo: json})
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

  renderDash = () => {
    return <Dash
      lock={this.lock}
      accessToken={this.state.accessToken}
      profile={this.state.profile}
      userInfo={this.state.userInfo}
      checkForUser={this.checkForUser}
      />
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
      {this.state.accessToken && !this.state.userInfo.id ? <Spinner /> : null}
      {this.state.accessToken && this.state.userInfo.id ? this.renderDash() :
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
