import React, { Component } from 'react'
import Quiz from './Quiz'
import Emoji from './Emoji'
import Story from './Story'
import Profile from './Profile'
import {Card, CardTitle, Button} from 'react-materialize'
import FadeIn from 'react-fade-in'
import Spinner from './Spinner'
const API = process.env.REACT_APP_API_URL

class Dash extends Component {

  constructor(){
    super()
    this.state = {
                  profile: true,
                  story:false,
                  quiz: false,
                  emoji: false,
                  allEmoji: [],
                  userCollection: [],
                  userInfo: [],
                  userEmojis: []
                }
  }

  renderQuiz = () => {
    //this method checks state to see if quiz has been clicked, renders it if so
    const currentState = Object.assign({}, this.state)
    this.state.quiz ?
     this.setState({
       ...currentState,
       profile:true,
       quiz:false,
       emoji:false,
       story:false
     })
   : this.setState({
       ...currentState,
       quiz: true,
       emoji:false,
       story:false,
       profile:false
     })
  }
  renderEmoji = () => {
    //this method checks state to see if MY EMOJI btn has been clicked, renders it if so
    const currentState = Object.assign({}, this.state)
    this.state.emoji ?
      this.setState({
        ...currentState,
        emoji:false,
        quiz:false,
        story:false,
        profile:true
      })
      : this.setState({
        ...currentState,
        emoji: true,
        quiz:false,
        story:false,
        profile:false
      })
  }
  renderStories = () => {
    //this method checks state to see if STORY btn has been clicked, renders it if so
    const currentState = Object.assign({}, this.state)
    this.state.story ?
      this.setState({
        ...currentState,
        emoji:false,
        quiz:false,
        story:false,
        profile: true
      })
      : this.setState({
        ...currentState,
        emoji: false,
        quiz:false,
        story:true,
        profile:false
      })
  }
  getAllEmoji = async () => {
    //Grabs all emoji from server/db
    let results = await fetch(`${API}/emoji`)
    let json = await results.json()
    return json.results
  }

  getUserEmoji = async (userID) => {
    let results = await fetch(`${API}/emoji/${userID}`)
    let json = await results.json()
    return json.results
  }

  userEmojis = (numbers, objects) => {
    return objects.filter(el => numbers.includes(el.id))
  }

  filterEmoji = () => {
    // Filters all emojis against emojis in the user's collection by emoji ID
    // Returns only uncollected emojis
    const userCollection = this.state.userCollection
    const filteredEmoji = this.state.allEmoji.filter(emoji => !userCollection.includes(emoji.id))
    return filteredEmoji
  }

  winEmoji = async (userId, emojiId) => {
    let response = await fetch(`${API}/users/${userId}`,
                               {body: JSON.stringify({emoji_id: emojiId}),
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'}
                                })
    let json = await response.json()
    await this.refreshUserCollection(userId)
    // After posting, setState with new collection
  }

  refreshUserCollection = async (userID) => {
    // I just set the userID to 6 if it can't figure out what's going on
    // if(!userID) {
    //   userID = this.props.userInfo.id
    //   console.log('REFRESH STATE', userID)
    // }
    const currentState = Object.assign({}, this.state)
    const allEmoji = await this.getAllEmoji()
    const userCollection = await this.getUserEmoji(userID)
    const userEmojis = await this.userEmojis(userCollection, allEmoji)
    await this.setState({...currentState, allEmoji, userCollection, userEmojis})
  }

  componentDidMount = async () => {
    this.refreshUserCollection(this.props.userInfo.id)
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

        {this.state.emoji && <FadeIn><Emoji
          userCollection={this.state.userCollection}
          allEmoji={this.state.allEmoji}/></FadeIn>}

        {this.state.quiz && <Quiz
          getAllEmoji={this.getAllEmoji}
          getUserEmoji={this.getUserEmoji}
          filterEmoji={this.filterEmoji}
          allEmoji={ this.state.allEmoji }
          userCollection ={ this.state.userCollection }
          userInfo={ this.props.userInfo }
          winEmoji={ this.winEmoji }/>}

        {this.state.story && <Story
          userInfo={ this.props.userInfo }
          allEmoji={ this.state.allEmoji }
          userEmojis ={ this.state.userEmojis }/>}
      </div>
    )
  }
}

export default Dash
