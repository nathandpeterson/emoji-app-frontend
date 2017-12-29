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
        console.log(allEmojis.results)
        this.setState({allEmojis: [...allEmojis.results]})
      }

      render(){
          return (
            <div>
                {this.state.allEmojis.map(emoji => {
                   return emoji.image
                })}
            </div>
          )
      }


}

export default Emoji


//have ternary for checking pages on this component - if quiz page - an addToStack
//like function will add the emoji to your collection after success
//if page is story, a clickHandler that will add the emoji to the story