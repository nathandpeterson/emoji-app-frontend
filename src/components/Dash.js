import React, { Component } from 'react'
import Quiz from './Quiz'
import Emoji from './Emoji'
import {Card, CardTitle, Button} from 'react-materialize'
import FadeIn from 'react-fade-in'

class Dash extends Component {
  constructor(){
    super()
    this.state = {quiz: false,
                  emoji: false,
                  allEmoji: [],
                  userCollection: []
                }
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
    console.log(this.state)
  }
  getAllEmoji = async () => {
    //Grabs all emoji from server/db
    let results = await fetch('http://localhost:3030/api/emoji')
    let json = await results.json()
    return json.results
  }

  getUserEmoji = async () => {
    //I've hard-coded a userID, but we should pull the userID from token/state/profile
    let results = await fetch(`http://localhost:3030/api/emoji`)
    let json = await results.json()
    return json.results
  }

  filterEmoji = () => {
    // Filters all emojis against emojis in the user's collection by emoji ID
    // Returns only uncollected emojis
    const userCollection = this.state.userCollection
    const filteredEmoji = this.state.allEmoji.filter(emoji => !userCollection.includes(emoji.id))
    return filteredEmoji
  }

  componentDidMount = async () => {
    const allEmoji = await this.getAllEmoji()
    const userCollection = await this.getUserEmoji()
    this.setState({allEmoji, userCollection})
  }

  render() {
    return (
      <div>
        <h1>Welcome, {this.props.profile.nickname}!</h1>
        <h2>You have collected {this.state.userCollection.length}/{this.state.allEmoji.length} emojis.</h2>
        <p>
        <img className= "profile" src = {this.props.profile.picture}></img>
        </p>
        <Button onClick={this.renderEmoji}>MY EMOJI</Button>
        <Button onClick={this.renderQuiz}>QUIZ</Button>
        <Button onClick={this.renderStories}>STORIES</Button>
        {this.state.emoji && <FadeIn><Emoji /></FadeIn>}
        {this.state.quiz && <Quiz getAllEmoji={this.getAllEmoji}
                                  getUserEmoji={this.getUserEmoji}
                                  filterEmoji={this.filterEmoji}
                                  allEmoji={ this.state.allEmoji }
                                  userCollection ={ this.state.userCollection }
          />}
      </div>
    )
  }
}

export default Dash
