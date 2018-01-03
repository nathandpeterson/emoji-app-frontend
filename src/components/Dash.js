import React, { Component } from 'react'
import Quiz from './Quiz'
import Emoji from './Emoji'
import {Card, CardTitle, Button} from 'react-materialize'
import FadeIn from 'react-fade-in'
import Spinner from './Spinner'

class Dash extends Component {

  constructor(){
    super()
    this.state = {quiz: false,
                  emoji: false,
                  allEmoji: [],
                  userCollection: [],
                  userInfo: []
                }
  }
  renderQuiz = () => {
    const currentState = Object.assign({}, this.state)
    //this method checks state to see if quiz has been clicked, renders it if so
    this.state.quiz ? this.setState({...currentState, quiz:false}) : this.setState({...currentState, quiz: true})
  }
  renderEmoji = () => {
    const currentState = Object.assign({}, this.state)
    //this method checks state to see if MY EMOJI btn has been clicked, renders it if so
    this.state.emoji ? this.setState({...currentState, emoji:false}) : this.setState({...currentState, emoji: true})
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

  getUserEmoji = async (userID) => {
    let results = await fetch(`http://localhost:3030/api/emoji/${userID}`)
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

  winEmoji = async (userId, emojiId) => {
    let response = await fetch(`http://localhost:3030/api/users/${userId}`,
                               {body: JSON.stringify({emoji_id: emojiId}),
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'}
                                })
    let json = await response.json()
    await this.refreshUserCollection(userId)
    console.log('just won! here is the post result', json)

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
    await this.setState({...currentState, allEmoji, userCollection})
  }

  componentDidMount = async () => {
    this.refreshUserCollection(this.props.userInfo.id)
  }
  

  render() {
    console.log('inside the dash render', this.props)
    return (
      <div>
        <h3>Welcome, {this.props.profile.nickname}!</h3>
        <h4>You have collected {this.state.userCollection.length} emojis.</h4>
        <p>
        <img className= "profile" src = {this.props.profile.picture}></img>
        </p>
        <Button onClick={this.renderEmoji}>MY EMOJI</Button>
        <Button onClick={this.renderQuiz}>QUIZ</Button>
        <Button onClick={this.renderStories}>STORIES</Button>
        {this.state.emoji && <FadeIn><Emoji userCollection={this.state.userCollection}
                                            allEmoji={this.state.allEmoji}
                              /></FadeIn>}
        {this.state.quiz && <Quiz getAllEmoji={this.getAllEmoji}
                                  getUserEmoji={this.getUserEmoji}
                                  filterEmoji={this.filterEmoji}
                                  allEmoji={ this.state.allEmoji }
                                  userCollection ={ this.state.userCollection }
                                  userInfo={ this.props.userInfo }
                                  winEmoji={ this.winEmoji }
          />}
      </div>
    )
  }
}

export default Dash
