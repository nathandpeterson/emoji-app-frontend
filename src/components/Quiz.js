
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
          emoji: {id: 0, name: '', image: '', level: 0},
          letters: 0,
          remaining: ''
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
    this.setState({ allEmoji, userCollection})
  }

  gameplay = () => {
    let situation = Object.assign({}, this.state)
    console.log('sitttttuation',situation)
    situation.letters--
    situation.remaining = situation.remaining.slice(1)
    if(situation.letters === 0) this.winEmoji()
    this.setState({letters: situation.letters, remaining: situation.remaining})
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

  winEmoji = () => {
    //POST win to the server and add an animation and success message.
    console.log('WIN!!!!!',this.state)
    //Once the post request goes through, update the state with userCollection up in dash
    //To ensure that userCollection remains consistent, the post request should happen up in the dash component
    //wait two seconds and then call this.resetEmoji()
    setTimeout(this.resetEmoji, 2000)
  }
  renderCorrectLetters = () => {
    let remaining = this.state.remaining
    let word = this.state.emoji.name
    let difference = word.length - remaining.length
    return word.slice(0, difference)
  }

  render() {
    return (
      <FadeIn>
         <div>
          <div className="flip-container">
          <div className="flipper">
            <div className="front">
              <div className="emoji-lg" role="img" aria-label={this.state.emoji.name}> {this.state.emoji.image}</div>
              <div className="quiz-letters">{this.renderCorrectLetters()}</div>
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
        letters={this.state.letters}/>
        </div>
      </FadeIn>
    );
  }
}

export default Quiz
