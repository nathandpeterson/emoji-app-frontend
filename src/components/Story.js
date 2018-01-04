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

//////////////////////
// HELPER FUNCTIONS //
//////////////////////

matchElement = (action, array, property) => {
  console.log(action.target.innerHTML);
  console.log(array);
  console.log(property);
  return array.find(el => el[property] === action.target.innerHTML)
}

randomize = (array) => {
  let randomIndex = Math.floor(Math.random()* array.length)
  return array[randomIndex]
}

////////////////////
// GAME DYNAMICS //
///////////////////

// PRELIMINARIES:

  //Picks a random story that the user hasn't seen before
    pickOneStory = (stories, ids) => {
      const onlyNewStories = ids.filter(el => !el.includes(stories.id))
      const story = this.randomize(stories)
      return story.story
    }
  //makes the story string into an array
    formatStory = (story) => {
      return story.match(/[\w]+|[^\w]*/gi)
    }
  //checks which emojis in the story match user emojis
    findEmojis = (story, user_emojis) => {
      let result = []
      for (let i = 0; i < story.length; i++) {
        const goal = user_emojis.find(el => el.name === story[i])
        if(goal)result.push(goal)
      }
      return result
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


  }

//////////////////////
// DATA & RENDERING //
//////////////////////

//ACQUIRE DATA:
  async getStories() {
    const stories = await fetch("http://localhost:3030/api/stories")
    const response = await stories.json()
    return response.results
  }
  async getStoriesByUser(id) {
    const userStories = await fetch(`http://localhost:3030/api/stories/users/${id}`)
    const response = await userStories.json()
    return response.results
  }

//UPDATE
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
