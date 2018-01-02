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
    let results = await fetch(`http://localhost:3030/api/emoji/1`)
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