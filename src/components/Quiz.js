
import React, { Component } from 'react'
import Keyboard from './Keyboard'
import FadeIn from 'react-fade-in'
import {Button} from 'react-materialize'

class Quiz extends Component {
    constructor(props){
        super(props)
        this.state = {
          allEmoji: this.props.allEmoji,
          userCollection: this.props.userCollection,
          currentGame: {
            currentEmoji: [],
            letters: '',
            currentWord: ''
          },
          emoji: {id: 18, name: 'cow', image: '🐮', level: 1},
          letters: 3,
          remaining: 'cow'
        }
      }

  randomEmoji = () => {
    // Picks a random emoji not in the current player's collection
    let filteredEmoji = this.props.filterEmoji()
    let randomIndex = Math.floor(Math.random()*filteredEmoji.length)
    return filteredEmoji[randomIndex]
  }

  componentDidMount = async () => {
    let allEmoji = await this.props.getAllEmoji()
    let userCollection = await this.props.getUserEmoji()
    this.setState({ allEmoji, userCollection})
  }

  startGame = () => {
    let current = this.randomEmoji()
    console.log(current, this.state)
    this.setState({currentGame:{currentEmoji: current.image, letter: '', currentWord: current.name,}})
    // Check to see if the next emoji is the same as the current. If 
    //  this.setState({currentGame :{currentEmoji: current, nextEmoji: next}})
  }
    
  gameplay = () => {
    console.log(this.state)
    let situation = Object.assign({}, this.state)
    console.log('sitttttuation',situation)
    situation.letters--
    situation.remaining = situation.remaining.slice(1)
    if(situation.letters === 0) console.log("You got it!")
    this.setState(situation)
    this.setState({currentGame:{letters: situation.letters}})
  }
  resetEmoji = () => {
    //Resets to a random emoji not in the current player's collection
    let currentEmoji = this.randomEmoji()
    this.setState({emoji: {id: currentEmoji.id, 
                          name: currentEmoji.name, 
                          image: currentEmoji.image, 
                          level: currentEmoji.level}})
  }

  componentDidMount = async () => {
    this.resetEmoji()
  }
      
  render() {
    console.log(this.props)
    return (
      <FadeIn>
         <div>
          <div className="game-container">
            <span className="emoji-lg" role="img" aria-label={this.state.emoji.name}> {this.state.emoji.image}</span>
            <span className="quiz-letters">{this.state.currentGame.letters}</span>
          </div>
          
          <Button onClick={this.startGame}> RANDOM </Button>
        <Keyboard
        emoji={this.state.emoji}
        gameplay={this.gameplay}
        remaining={this.state.emoji.name}/>
        </div>
        </FadeIn>
    );
  }
}

export default Quiz