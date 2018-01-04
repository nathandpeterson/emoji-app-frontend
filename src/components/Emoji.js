import React, { Component } from 'react'
import FadeIn from 'react-fade-in'
const API = process.env.REACT_APP_API_URL

class Emoji extends Component {
    constructor(){
        super()
        this.state = {
            allEmoji: [],
            userCollection: []
        }
      }
      getAllEmoji = async () => {
        //This method should filter and only pull the current user's emoji
        let results = await fetch(`${API}/emoji`)
        let json = await results.json()
        return json
      }
      componentDidMount = async () => {
        const allEmoji = await this.getAllEmoji()
        this.setState({allEmoji: [...allEmoji.results], userCollection: [...this.props.userCollection]})
      }
      render(){
          return (
            <div>
                {this.state.allEmoji.map((emoji,id) => {
                  return this.state.userCollection.includes(emoji.id) ?
                   ( <span key={id} className="emoji-container">
                   <span className="emoji-small" role="img" aria-label={emoji.name}>{emoji.image}</span>
                  </span> 
                  ) : ''
                })}
            </div>
          )
      }
}

export default Emoji


//have ternary for checking pages on this component - if quiz page - an addToStack
//like function will add the emoji to your collection after success
//if page is story, a clickHandler that will add the emoji to the story