import React, { Component } from 'react'
import '../App.css'

class Story extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allEmoji: this.props.allEmoji,
      userEmojis: this.props.userCollection,
      story: {
        emojis: [],
        text: [],
      },
      userStories: []
    }
  }


//on click, word is replaced by an emoji, if user has a matching one
  gameplay = (e) => {
    //removes the empty space at the end of each word
    const word = e.target.innerHTML.slice(0, -1)
    const match = this.state.userEmojis.find(el => el.name === word)
    if(match) e.target.innerHTML = match.image
  }

//checks which emojis in the story match user emojis
  findEmojis = (story, user_emojis) => {
    let result = []
    for (let i = 0; i < story.length; i++) {
      const match = user_emojis.find(el => el.name === story[i])
      if(match)result.push(match)
    }
    return result
  }

  async componentDidMount(){
    //console.log(this.props.userEmojis)
    const story = await this.getStories()
    const text = this.formatStory(story.story)
    // console.log(text);
    const storyEmojis = this.findEmojis(text, this.props.userCollection)
    // console.log(storyEmojis);
    this.setState({
      story: {
        text: text,
        emojis: storyEmojis
      }
    })
  }

//currently only returns the first story in the DB
  async getStories() {
    const stories = await fetch("http://localhost:3030/api/stories")
    const response = await stories.json()
    return response.results[0]
  }

  // async getStoriesByUser(id) {
  //   const userStories = await fetch(`http://localhost:3030/api/stories/users/${id}`)
  //   const response = await stories.json()
  //   return response.results
  // }

//makes the story string into an array and removes commas -will
//need to format this to remove other special characters as well
  formatStory = (story) => {
    const storyArray = story.split(' ')
    return storyArray.map(el => el.replace(',', ''))
  }

  render() {

    return (
    <main>
      <div className="sidebar">
        {this.state.userEmojis.map(el => <div key={el.id} className='emoji'>{el.image}</div> )}
      </div>
      <div className="story">
        {this.state.story.text.map((el,i) => <span key={i} onClick ={(e) => this.gameplay(e)}>{el} </span>)}
      </div>
    </main>
    )
  }
}

export default Story;
