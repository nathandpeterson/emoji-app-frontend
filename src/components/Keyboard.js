import React from 'react';
import Key from './Key.js'

const keys = [
  "a","b","c","o","y","w"
]

const Keyboard = ({emoji, gameplay, remaining}) => {
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
