import React from 'react'

const Key = ({letter, word, gameplay, remaining, wrongLetter}) => {

const handleClick = (e) => {
  if(e.target.innerHTML === remaining[0]){
    gameplay()
  }
  else wrongLetter()
}
  return (
    <div className="key" onClick={handleClick}>{letter}</div>
  )
}


export default Key
