import React, { Component } from 'react'

class Emoji extends Component {
    constructor(){
        super()
        this.state = {
            allEmojis: []
        }
      }
      getAllEmoji = async () => {
        let results = await fetch('http://localhost:3030/api/emoji')
        let json = await results.json()
        return json
      }
      componentDidMount = async () => {
        const allEmojis = await this.getAllEmoji()
        this.setState({allEmojis: [...allEmojis.results]})
      }

      render(){
          return (
            <div>
                {this.state.allEmojis.map((emoji,id) => {
                   return (<span key={id} className="emoji-container">
                   <span className="emoji-small" role="img" aria-label={emoji.name}>{emoji.image}</span>
                  </span>)
                })}
            </div>
          )
      }
}

export default Emoji


//have ternary for checking pages on this component - if quiz page - an addToStack
//like function will add the emoji to your collection after success
//if page is story, a clickHandler that will add the emoji to the story