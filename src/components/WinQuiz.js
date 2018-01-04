import React from 'react'
import FadeIn from 'react-fade-in'

const happy = ['🌟', '✨', '⭐️', '⚡️', '💥', '🌈', '💫']

const WinQuiz = () => (
    happy.map((emoji, index) => <span key={index}>{emoji}</span>)
)

export default WinQuiz