
import React, { Component } from 'react'
import Keyboard from './Keyboard'
import FadeIn from 'react-fade-in'

class Quiz extends Component {
    constructor(props){
        super(props)
        this.state = {
          allEmoji: [],
          userCollection: [],
          emoji: {id: 18, name: 'cow', symbol: '🐮', level: 1},
          guesses: 3,
          remaining: 'cow'
        }
      }
  getAllEmoji = async () => {
    let results = await fetch('http://localhost:3030/api/emoji')
    let json = await results.json()
    return json.results
  }

  getUserEmoji = async () => {
    //I've hard-coded a userID, but we should pull the userID from token/state
    let results = await fetch(`http://localhost:3030/api/emoji/1`)
    let json = await results.json()
    return json.results
  }

  componentDidMount = async () => {
    let allEmoji = await this.getAllEmoji()
    let userCollection = await this.getUserEmoji()
    this.setState({allEmoji, userCollection})
  }
    
  gameplay = () => {
    let situation = Object.assign({}, this.state)
    situation.guesses--
    situation.remaining = situation.remaining.slice(1)
    if(situation.guesses === 0) console.log("You got it!")
    this.setState(situation)
  }
      
  render() {
    return (
      <FadeIn>
         <div>
          <div className="emoji-container">
            <span className="emoji-med" role="img" aria-label={this.state.emoji.name}> {this.state.emoji.symbol}</span>
          </div>
        <Keyboard
        emoji={this.state.emoji}
        gameplay={this.gameplay}
        remaining={this.state.remaining}/>
        </div>
        </FadeIn>
    );
  }
}

export default Quiz









