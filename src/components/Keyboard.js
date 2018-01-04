import React, { Component } from 'react';
import Key from './Key.js'
import shuffle from 'lodash/shuffle'
import uniq from 'lodash/uniq'

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const buildKeyboard = (emojiName) => {
  //Splits and shuffles the name of the emoji, concats it with five letters from shuffled alphabet
  // Then deduplicates and shuffles again
  let emojiLetters = emojiName.split('')
  let shuffledAlphabet = shuffle(alphabet)
  let fiveShuffled = shuffledAlphabet.slice(0, 5)
  let ourLetters = emojiLetters.concat(fiveShuffled)
  let ourUniqueLetters = uniq(ourLetters)
  let ourShuffledLetters = shuffle(ourUniqueLetters)
  return ourShuffledLetters
}

class Keyboard extends Component {
  constructor({emoji, gameplay, remaining, letters, wrongLetter}){
    super()
    this.state = {word: '',
                  keyboard: []}
  }

  componentWillReceiveProps({emoji}){
    let keyboard = buildKeyboard(emoji.name)
    if(!this.state.keyboard.length) this.setState({word: emoji.name, keyboard})
    if(this.state.word !== emoji.name) this.setState({word: emoji.name, keyboard})
  }

  render() {
  const {emoji, gameplay, remaining, wrongLetter} = this.props
  let keys = this.state.keyboard
  return (
      <div className = "keyboard">
        {keys.map(el =>
          <Key key={el}
          letter={el}
          word= {emoji.name}
          gameplay={gameplay}
          remaining={remaining}
          wrongLetter={ wrongLetter }/>)}
      </div>
  )
  }
}


export default Keyboard
