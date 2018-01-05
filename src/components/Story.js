import React, { Component } from 'react'
import '../App.css'
const API = process.env.REACT_APP_API_URL

class Story extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allEmoji: this.props.allEmoji,
      story: {
        id: 0,
        emojis: [],
        text: [],
      },
      allStories: [],
      userStories: []
    }
  }

//////////////////////
// HELPER FUNCTIONS //
//////////////////////

matchElement = (action, array, property) => {
  return array.find(el => el[property] === action.target.innerHTML.toLowerCase())
}

randomize = (array) => {
  let randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

////////////////////
// GAME DYNAMICS //
///////////////////

// PRELIMINARIES:

  //Picks a random story that the user hasn't seen before
    pickOneStory = (stories, ids) => {
      const onlyNewStories = stories.filter(el => !ids.includes(el.id))
      const story = this.randomize(onlyNewStories)
      return story
    }
  //makes the story string into an array
    formatStory = (story) => {
      return story.match(/[\w]+|[^\w]*/gi)
    }
  //checks which emojis in the story match user's emojis so we know when to end gameplay
    findEmojis = (story, user_emojis) => {
      let result = []
      for (let i = 0; i < story.length; i++) {
        const goal = user_emojis.find(el => el.name === story[i].toLowerCase())
        if(goal)result.push(goal)
      }
      if(result.length === 0) alert("ohnoes, you have no matching emojis!");  return result
    }

    storyPreparation = (allStories, userStories) => {
      const story = this.pickOneStory(allStories, userStories)
      const text = this.formatStory(story.story)
      const storyEmojis = this.findEmojis(text, this.props.userEmojis)
      console.log(storyEmojis);
      return {
        id: story.id,
        text: text,
        emojis: storyEmojis
      }
    }

//THIS IS WHERE THE ACTION HAPPENS:

  //on click, word is replaced by an emoji, if user has a matching one
    gameplay = (e) => {
      const foundIt = this.matchElement(e, this.props.userEmojis, 'name')
      if(foundIt){
        e.target.innerHTML = foundIt.image
        ////////////////////LENA'S CHANGES///////////////////////////
        this.storyState(e)
      }
    }

//MANIPULATES STATE:

//setState in the gameplay
  storyState = (e) => {
    let situation = Object.assign({}, this.state)
    const storyEmojis = situation.story.emojis
    const foundIt = this.matchElement(e, storyEmojis, 'image')
    storyEmojis.splice(storyEmojis.indexOf(foundIt), 1)
    if(storyEmojis.length === 0) {
      console.log("success story")
      situation.userStories.push(situation.story.id)
      situation.story = this.storyPreparation(situation.allStories, situation.userStories)
      setTimeout(() => this.setState(situation), 1500)
    }
  }
  
//////////////////////
// DATA & RENDERING //
//////////////////////

//ACQUIRE DATA:
  async getStories() {
    const stories = await fetch(`${API}/stories`)
    const response = await stories.json()
    return response.results
  }

  async getStoriesByUser(id) {
    const userStories = await fetch(`http://localhost:3030/api/stories/users/${id}`)
    const response = await userStories.json()
    return response.results
  }

  async updateStoriesByUser(user_id, story_id){
    const userStories = await fetch(`http://localhost:3030/api/stories/users/${user_id}`, {
        body: JSON.stringify({story_id}),
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      })

    const response = await userStories.json()
    return response.results
  }

//UPDATE
    async componentDidMount(){
      const allStories = await this.getStories()
      const userStories = await this.getStoriesByUser(this.props.userInfo.id)
      const story = this.storyPreparation(allStories, userStories)

      this.setState({
        story,
        allStories,
        userStories
      })
    }

  render() {
    return (
    <main>
      <div className="sidebar">
        {this.props.userEmojis.map(el => <div key={el.id} className='emoji'>{el.image}</div> )}
      </div>
      <div className="story">{
          this.state.story.text.map((el,i) => <span key={i} onClick ={(e) => this.gameplay(e)}>{el}</span>)}
      </div>

    </main>
    )
  }
}

export default Story;
