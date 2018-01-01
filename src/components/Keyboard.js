import React from 'react';
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

const Keyboard = ({emoji, gameplay, remaining, letters}) => {
  console.log('in the keyboard', emoji, remaining, letters)
  let keys = buildKeyboard(emoji.name) 
  return (
    <div>
      <div>We are spelling:  {emoji.name}</div>
      <div className = "keyboard">
        {keys.map(el =>
          <Key key={el}
          letter={el}
          word= {emoji.name}
          gameplay={gameplay}
          remaining={remaining}/>)}
      </div>
    </div>
  )
}

export default Keyboard;
