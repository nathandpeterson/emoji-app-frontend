import React, { Component } from 'react';
import './App.css';
import Keyboard from './components/Keyboard.js'
import Auth0Lock from 'auth0-lock'
import {Button} from 'react-materialize'
import Header from './components/Header.js'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      emoji: {id: 18, name: 'cow', symbol: '🐮', level: 1},
      guesses: 3,
      remaining: 'cow'
    }
  }

  gameplay = () => {
    let situation = Object.assign({}, this.state)
    situation.guesses --
    situation.remaining = situation.remaining.slice(1)
    if(situation.guesses === 0) console.log("You got it!")
    this.setState(situation)
  }

  static defaultProps = {
    clientId: 'oZl3hH2eA3ohIHz62cQqNgCh9DQUzrSq',
    domain: 'emojiapi.auth0.com'
  }

  componentWillMount(){
    this.lock = new Auth0Lock(this.props.clientId, this.props.domain)

    this.lock.on('authenticated', (authResult)=>{
      console.log(authResult)
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
  }

  showModal(){
    this.lock.show()
  }

  render() {
    return (
      <div className="App">
      <Header loginClick={this.showModal.bind(this)}/>
        <header className="App-header">
          <h1 className="App-title">Welcome to Emoji App</h1>
        </header>
        <div className="container">
        {this.state.emoji.symbol}
        </div>
        <Keyboard
          emoji={this.state.emoji}
          gameplay={this.gameplay}
          remaining={this.state.remaining}/>
      </div>
    );
  }
}

export default App;
