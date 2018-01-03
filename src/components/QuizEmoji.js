import React from 'react'
import FadeIn from 'react-fade-in'

const animations = ['bounce', 'shake', 'tada', 'zoomOutUp']

const addAnimation = () => {
    console.log('changed')
}

const classNames = (status) => {
    let classes = "animated emoji-lg "
    status === 'wrong' ? classes += 'shake' : ''
    return classes
}

const emojiView = ({name, image, status}) => {
    return (
    <FadeIn>
    <span className={classNames(status)} role="img" aria-label={name}> {image}</span>
    </FadeIn>
    )
}

export default emojiView