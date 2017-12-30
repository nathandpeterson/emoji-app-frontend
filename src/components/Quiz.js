
import React, { Component } from 'react'
import Keyboard from './Keyboard'
import FadeIn from 'react-fade-in'
import {Button} from 'react-materialize'

class Quiz extends Component {
    constructor(props){
        super(props)
        this.state = {
          allEmoji: [],
          userCollection: [],
          currentGame: {
            currentEmoji: {},
            nextEmoji: {},
            letters: null,
            currentWord: ''
          },
          emoji: {id: 18, name: 'cow', symbol: '🐮', level: 1},
          letters: 3,
          remaining: 'cow'
        }
      }
  

  filterEmoji = () => {
    //Filters all emojis against emojis in the user's collection by emoji ID
    // Returns only uncollected emojis
    const userCollection = this.state.userCollection
    const filteredEmoji = this.state.allEmoji.filter(emoji => !userCollection.includes(emoji.id))
    return filteredEmoji
  }

  randomEmoji = () => {
    // Picks a random emoji not in the current player's collection
    let filteredEmoji = this.filterEmoji()
    let randomIndex = Math.floor(Math.random()*filteredEmoji.length)
    return filteredEmoji[randomIndex]
  }

  componentDidMount = async () => {
    let allEmoji = await this.props.getAllEmoji()
    let userCollection = await this.props.getUserEmoji()
    this.setState({ allEmoji, userCollection})
  }

  setRandomAndNextEmoji = () => {
    //This method doesn't work because filteredEmoji is not available in this scope
    let current = this.randomEmoji()
    let next = this.randomEmoji()
    // Check to see if the next emoji is the same as the current. If 
    if(this.state.filteredEmoji.length === 1) {
      next = null
     } else {
      while(next.id === current.id) next = this.randomEmoji()
     } 
     console.log(current, next)
    //  this.setState({currentGame :{currentEmoji: current, nextEmoji: next}})
  }
    
  gameplay = () => {
    let situation = Object.assign({}, this.state)
    situation.letters--
    situation.remaining = situation.remaining.slice(1)
    if(situation.letters === 0) console.log("You got it!")
    this.setState(situation)
  }
      
  render() {
    return (
      <FadeIn>
         <div>
          <div className="emoji-container">
            <span className="emoji-med" role="img" aria-label={this.state.emoji.name}> {this.state.emoji.symbol}</span>
          </div>
          <Button onClick={this.setRandomAndNextEmoji}> RANDOM </Button>
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