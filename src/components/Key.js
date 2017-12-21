import React from 'react';

const Key = ({letter, word, gameplay, remaining}) => {

const handleClick = (e) => {
  if(e.target.innerHTML === remaining[0]){
    console.log("correct!")
    gameplay()
  }
  else console.log("WROOOOOOONG!!!!")
}
  return (
    <div className="key" onClick={handleClick}>{letter}</div>
  );
}


export default Key;
