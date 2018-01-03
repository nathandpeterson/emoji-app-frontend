import React, { Component } from 'react'
import Quiz from './Quiz'
import Emoji from './Emoji'
import Story from './Story'
import Profile from './Profile'
import {Card, CardTitle, Button} from 'react-materialize'
import FadeIn from 'react-fade-in'

class Dash extends Component {
  constructor(props){
    super(props)
    this.state = {
                  profile: true,
                  quiz: false,
                  emoji: false,
                  story: false,
                  allEmoji: [],
                  userCollection: []
                }
  }
  renderQuiz = () => {
    //this method checks state to see if quiz has been clicked, renders it if so
    this.state.quiz ?
      this.setState({
        profile:true,
        quiz:false,
        emoji:false,
        story:false
      })
    : this.setState({
        quiz: true,
        emoji:false,
        story:false,
        profile:false
      })
  }
  renderEmoji = () => {
    //this method checks state to see if MY EMOJI btn has been clicked, renders it if so
    this.state.emoji ?
      this.setState({
        emoji:false,
        quiz:false,
        story:false,
        profile:true
      })
      : this.setState({
        emoji: true,
        quiz:false,
        story:false,
        profile:false
      })
  }
  renderStories = () => {
    this.state.story ?
      this.setState({
        emoji:false,
        quiz:false,
        story:false,
        profile: true
      })
      : this.setState({
        emoji: false,
        quiz:false,
        story:true,
        profile:false
      })
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
        {this.state.profile && <Profile
          user = { this.props.profile }
          allEmoji={ this.state.allEmoji }
          userCollection ={ this.state.userCollection }/>}

        <Button onClick={this.renderEmoji}>MY EMOJI</Button>
        <Button onClick={this.renderQuiz}>QUIZ</Button>
        <Button onClick={this.renderStories}>STORIES</Button>

        {this.state.emoji && <FadeIn><Emoji /></FadeIn>}
        {this.state.quiz && <Quiz
            getAllEmoji={this.getAllEmoji}
            getUserEmoji={this.getUserEmoji}
            filterEmoji={this.filterEmoji}
            allEmoji={ this.state.allEmoji }
            userCollection ={ this.state.userCollection }/>}
        {this.state.story && <Story
            getAllEmoji={this.getAllEmoji}
            getUserEmoji={this.getUserEmoji}
            filterEmoji={this.filterEmoji}
            allEmoji={ this.state.allEmoji }
            userCollection ={ this.state.userCollection }/>}
      </div>
    )
  }
}

export default Dash
