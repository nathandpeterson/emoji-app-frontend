
import React, { Component } from 'react'
import Keyboard from './Keyboard'
import FadeIn from 'react-fade-in'
import {Button} from 'react-materialize'
import QuizEmoji from './QuizEmoji'

class Quiz extends Component {
    constructor(props){
        super(props)
        this.state = {
          allEmoji: [],
          userCollection: [],
          emoji: {id: 0, name: '', image: '', level: 0},
          letters: 3,
          remaining: 'cow',
          status: 'neutral',
          userInfo: []
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
    let userCollection = await this.props.getUserEmoji(this.props.userInfo.id)
    await this.resetEmoji()
    await this.setState({ allEmoji, userCollection, userInfo: this.props.userInfo})
  }

  gameplay = () => {
    let situation = Object.assign({}, this.state)
    situation.letters--
    situation.remaining = situation.remaining.slice(1)
    if(situation.letters === 0) this.winEmoji(situation.userInfo.id)
    this.setState({letters: situation.letters, remaining: situation.remaining, status: 'correct'})
  }

  wrongLetter = () => {
    const currentState = Object.assign({}, this.state)
    this.setState({...currentState, status: 'wrong'})
  }

  resetEmoji = () => {
    const currentState = Object.assign({}, this.state)
    //Resets to a random emoji not in the current player's collection
    let currentEmoji = this.randomEmoji()
    this.setState({...currentState, emoji: {id: currentEmoji.id,
                          name: currentEmoji.name,
                          image: currentEmoji.image,
                          level: currentEmoji.level
                        },
                      letters: currentEmoji.name.length,
                      remaining: currentEmoji.name,
                      status: 'neutral'})
  }

  winEmoji = async (id) => {
    //POST win to the server and add an animation and success message.
    console.log('WIN!!!!!',this.state)
    this.props.winEmoji(id, this.state.emoji.id)
    this.setState({emoji: {image: '✨⭐️✨', name: ""}, remaining: this.state.emoji.name})
    //Once the post request goes through, update the state with userCollection up in dash
    //To ensure that userCollection remains consistent, the post request should happen up in the dash component
    //wait two seconds and then call this.resetEmoji()
    setTimeout(this.resetEmoji, 2000)
  }
  renderCorrectLetters = () => {
      let remaining = this.state.remaining || 6
      let word = this.state.emoji.name || 'ERROR'
      let difference = word.length - remaining.length
      return word.slice(0, difference)
  }

  render() {
    console.log(this.state.emoji)
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
            <div className="emoji-lg">{this.state.emoji.name}</div>
            </div>
            </div>
          </div>
          <Button onClick={this.resetEmoji}> RANDOM </Button>
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
