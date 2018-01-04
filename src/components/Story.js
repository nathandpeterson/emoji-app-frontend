import React, { Component } from 'react'
import '../App.css'

class Story extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allEmoji: this.props.allEmoji,
      story: {
        emojis: [],
        text: [],
      },
      allStories: [],
      userStories: []
    }
  }

  // userEmojis = ()=> {
  //   const result = this.props.allEmoji.filter(el => this.props.userCollection.includes(el.id))
  //   return result
  // }


//on click, word is replaced by an emoji, if user has a matching one
  gameplay = (e) => {
    const foundIt = this.props.userEmojis.find(el => el.name === e.target.innerHTML)
    if(foundIt){
      e.target.innerHTML = foundIt.image
    }
  }

//setState for gameplay
// let situation = Object.assign({}, this.state)
// const storyEmojis = situation.story.emojis
// storyEmojis.splice(storyEmojis.indexOf(foundIt), 1)
// this.setState({story: {emojis: storyEmojis}})


//checks which emojis in the story match user emojis
  findEmojis = (story, user_emojis) => {
    let result = []
    for (let i = 0; i < story.length; i++) {
      const goal = user_emojis.find(el => el.name === story[i])
      if(goal)result.push(goal)
    }
    return result
  }

  async getStories() {
    const stories = await fetch("http://localhost:3030/api/stories")
    const response = await stories.json()
    return response.results
  }

  //Picks a random story that the user hasn't seen before
  pickOneStory = (stories, ids) => {
    const onlyNewStories = ids.filter(el => !el.includes(stories.id))
    const story = this.randomize(stories)
    return story.story
  }

  randomize = (array) => {
    let randomIndex = Math.floor(Math.random()*array.length)
    return array[randomIndex]
  }

  async getStoriesByUser(id) {
    const userStories = await fetch(`http://localhost:3030/api/stories/users/${id}`)
    const response = await userStories.json()
    return response.results
  }

//makes the story string into an array
  formatStory = (story) => {
    return story.match(/[\w]+|[^\w]*/gi)
  }


    async componentDidMount(){
      const allStories = await this.getStories()
      const userStories = await this.getStoriesByUser(this.props.userInfo.id)
      const story = this.pickOneStory(allStories, userStories)
      const text = this.formatStory(story)
      const storyEmojis = this.findEmojis(text, this.props.userEmojis)
      this.setState({
        story: {
          text: text,
          emojis: storyEmojis
        },
        allStories: allStories,
        userStories: userStories
      })
    }

  render() {
    return (
    <main>
      <div className="sidebar">
        {this.props.userEmojis.map(el => <div key={el.id} className='emoji'>{el.image}</div> )}
      </div>
      <div className="story">
        {this.state.story.text.map((el,i) => <span key={i} onClick ={(e) => this.gameplay(e)}>{el}</span>)}
      </div>
    </main>
    )
  }
}

export default Story;
