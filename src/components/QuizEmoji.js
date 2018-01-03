import React from 'react'
import FadeIn from 'react-fade-in'


const emojiView = ({name, image, status}) => {
    return (
        <FadeIn>
    <span id="quiz-emoji" className="animated emoji-lg" role="img" aria-label={name}> {image}</span>
        </FadeIn>
    )
}

export default emojiView