
import React, { Component } from 'react'
import Keyboard from './Keyboard'
import FadeIn from 'react-fade-in'
import {Button, Row, Col} from 'react-materialize'
import QuizEmoji from './QuizEmoji'
import WinQuiz from './WinQuiz'

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
    this.props.winEmoji(id, this.state.emoji.id)
    let quizEmoji = document.querySelector('#quiz-emoji')
    quizEmoji.classList.add('zoomOutUp')
    await window.setTimeout(this.fader, 750)
    await window.setTimeout(this.resetEmoji, 850)
    await quizEmoji.classList.remove('zoomInDown')
  }

  fader = async () => {
    let quizEmoji = document.querySelector('#quiz-emoji')
    quizEmoji.classList.remove('zoomOutUp')
    quizEmoji.classList.add('zoomInDown')
  }  

  renderCorrectLetters = () => {
      let remaining = this.state.remaining || 6
      let word = this.state.emoji.name || 'ERROR'
      let difference = word.length - remaining.length
      return word.slice(0, difference)
  }

  renderWin = () => (
    <div>
      <FadeIn>
        <WinQuiz />
      </FadeIn>
   </div>
  )

  render() {
    return (
      <FadeIn>
        <Row>    
         <div className="game-container">
         <div className="emoji-small">{!this.state.remaining && this.renderWin()}</div>
          <div className="flip-container">
          <div className="flipper">
            <div className="front">
              <QuizEmoji name={this.state.emoji.name}
                          image={this.state.emoji.image}
                          status={this.state.status}/>
              <span className="quiz-letters">{this.renderCorrectLetters()}</span>
            </div>
            <div className="back">
              <div className="flip-letters">{this.state.emoji.name}</div>
              </div>
            </div>
          </div>
        </div>
        </Row>
        <br />
        <Keyboard
        emoji={this.state.emoji}
        gameplay={this.gameplay}
        remaining={this.state.remaining}
        letters={this.state.letters}
        wrongLetter={ this.wrongLetter }
        status={ this.state.status }/>
        <Button onClick={this.resetEmoji}> NEXT </Button>
      </FadeIn>
    );
  }
}

export default Quiz
