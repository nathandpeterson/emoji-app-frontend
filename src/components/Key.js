import React from 'react'
import {Button} from 'react-materialize'

const keyHover = (e) => {
  /* 
    With a front-end framework you typically want to let the framework do
    all of the DOM manipulation. In this case, you're manually changing a number of
    styles and settings.
    
    First, for any CSS changes I would tie them to a class as opposed to dynamically
    setting them. Second, I would create stand alone functions that return a new
    set of classes.
  */
  let hoverTarget = document.querySelector(`#letter-${e.target.innerHTML}`)
  hoverTarget.style.backgroundColor = 'white'
  hoverTarget.style.color = '#2EC4B6'
  hoverTarget.style['box-shadow'] = '10px 3px 36px -8px rgba(0,0,0,0.75)'
}

const keyLeave = (e) => {
  let hoverTarget = document.querySelector(`#letter-${e.target.innerHTML}`)
  hoverTarget.style.backgroundColor = '#FF9A17'
  hoverTarget.style.color = 'white'
  hoverTarget.style['box-shadow'] = ''
}

const renderKey = (letter, fn) =>
 (<Button waves="light" onMouseEnter={keyHover} onMouseLeave={keyLeave} id={'letter-'+letter} className="key" onClick={fn}>{letter}</Button>)

const wrongLetter = (letter, handleClick, e) => {
  let wrongKey = document.querySelector(`#letter-${letter}`)
  wrongKey.classList.add('animated')
  wrongKey.classList.add('shake')
  wrongKey.style.color = 'red'
  window.setTimeout(() => removeAnimationClass(letter), 750)
}

const removeAnimationClass = (letter) => {
  let wrongKey = document.querySelector(`#letter-${letter}`)
  wrongKey.classList.remove('animated')
  wrongKey.classList.remove('shake')
}

const Key = ({letter, word, gameplay, remaining}) => {
  const handleClick = (e) => {
    if(e.target.innerHTML !== remaining[0]) return wrongLetter(letter, handleClick)
    gameplay()
  }
  
  return renderKey(letter, handleClick)
}


export default Key
