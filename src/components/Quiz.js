
import React, { Component } from 'react'
import Keyboard from './Keyboard'
import FadeIn from 'react-fade-in'
import {Button} from 'react-materialize'
import QuizEmoji from './QuizEmoji'

class Quiz extends Component {
    constructor(props){
        super(props)
        this.state = {
          allEmoji: this.props.allEmoji,
          userCollection: this.props.userCollection,
          emoji: {id: 0, name: '', image: '', level: 0},
          letters: 3,
          remaining: 'cow',
          status: 'neutral'
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
    await this.resetEmoji()
    this.setState({ allEmoji, userCollection })
  }
    
  gameplay = () => {
    let situation = Object.assign({}, this.state)
    situation.letters--
    situation.remaining = situation.remaining.slice(1)
    if(situation.letters === 0) this.winEmoji()
    this.setState({letters: situation.letters, remaining: situation.remaining, status: 'correct'})
  }

  wrongLetter = () => {
    const currentState = {...this.state, status: 'wrong'}
    this.setState({...currentState, status: 'wrong'})
  }
  
  resetEmoji = () => {
    //Resets to a random emoji not in the current player's collection
    let currentEmoji = this.randomEmoji()
    this.setState({emoji: {id: currentEmoji.id, 
                          name: currentEmoji.name, 
                          image: currentEmoji.image, 
                          level: currentEmoji.level
                        },
                      letters: currentEmoji.name.length,
                      remaining: currentEmoji.name})
  }
  
  winEmoji = async () => {
    //POST win to the server and add an animation and success message.
    console.log('WIN!!!!!',this.state)
    this.setState({emoji: {image: '✨⭐️✨', name: "HOORAY"}, remaining: this.state.emoji.name})
    //Once the post request goes through, update the state with userCollection up in dash
    //To ensure that userCollection remains consistent, the post request should happen up in the dash component
    //wait two seconds and then call this.resetEmoji()
    setTimeout(this.resetEmoji, 2000)
  }
  renderCorrectLetters = () => {
      let remaining = this.state.remaining || 6
      let word = this.state.emoji.name || 'HOORAY'
      let difference = word.length - remaining.length
      return word.slice(0, difference)
  }
  
  render() {
    return (
      <FadeIn>
         <div className="game-container">
          <div className="flip-container">
          <div className="flipper">
            <div className="front">
              <QuizEmoji name={this.state.emoji.name}
                          image={this.state.emoji.image}
                          status={this.state.status}/>
              <span className="quiz-letters">{this.renderCorrectLetters()}</span>
            </div>
            <div className="back">
            <span className="emoji-lg">{this.state.emoji.name}</span>
            </div>
            </div>
          </div>        
          <Button onClick={this.wrongLetter}> RANDOM </Button>
        <Keyboard
        emoji={this.state.emoji}
        gameplay={this.gameplay}
        remaining={this.state.remaining}
        letters={this.state.letters}
        wrongLetter={ this.wrongLetter }
        status={ this.state.status }/>
        </div>
        </FadeIn>
    );
  }
}

export default Quiz