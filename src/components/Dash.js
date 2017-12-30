import React, { Component } from 'react'
import Quiz from './Quiz'
import Emoji from './Emoji'
import {Card, CardTitle, Button} from 'react-materialize'
import FadeIn from 'react-fade-in'

class Dash extends Component {
  constructor(){
    super()
    this.state = {quiz: false, emoji: false}
  }
  renderQuiz = () => {
    //this method checks state to see if quiz has been clicked, renders it if so
    this.state.quiz ? this.setState({quiz:false}) : this.setState({quiz: true})
  }
  renderEmoji = () => {
    //this method checks state to see if MY EMOJI btn has been clicked, renders it if so
    this.state.emoji ? this.setState({emoji:false}) : this.setState({emoji: true})
  }
  renderStories = () => {
    //this doesn't do anything yet...
    console.log('load stories component')
  }
  getAllEmoji = async () => {
    //Grabs all emoji from server/db
    let results = await fetch('http://localhost:3030/api/emoji')
    let json = await results.json()
    return json.results
  }

  getUserEmoji = async () => {
    //I've hard-coded a userID, but we should pull the userID from token/state/profile
    let results = await fetch(`http://localhost:3030/api/emoji/1`)
    let json = await results.json()
    return json.results
  }

  render() {
    return (
      <div>
        <Button onClick={this.renderEmoji}>MY EMOJI</Button>
        <Button onClick={this.renderQuiz}>QUIZ</Button>
        <Button onClick={this.renderStories}>STORIES</Button>
        {this.state.emoji && <FadeIn><Emoji /></FadeIn>}
        {this.state.quiz && <Quiz getAllEmoji={this.getAllEmoji}
                                  getUserEmoji={this.getUserEmoji}
          />}
    <h1>where you want me go?</h1>
    <h2>and link to below</h2>
    <p>dashboard will contain link to 'quiz' page and potentially stories?</p>
    <p>could have separate profile page, or just include some info on this dashboard page? </p>
    <Card className='small'
    header={<CardTitle image={this.props.profile.picture}>Profile</CardTitle>}
    actions={[<a href='#'>This is a Link</a>]}>
    <h3>{this.props.profile.nickname}</h3>
    </Card>
    </div>
    )
  }
}

export default Dash