
import React, { Component } from 'react'

class Emoji extends Component {
    constructor(){
        super()
        this.state = {
            emojis: []
        }
      }

      componentDidMount(){
          fetch('http://localhost:3030/api/emoji')
          .then(results => {
              return results.json()
          }).then(data =>{
              let emojis = data.results.map((emoji)=>{
                  return(
                      <div key={emoji.results}>
                      <div>{emoji.symbol}</div>
                      </div>
                  )
              })
              this.setState({emojis})
              console.log("state", this.state.emojis)
          })
      }

      render(){
          return (

            <div>
                {this.state.emojis}
            </div>
            
          )
      }


}

export default Emoji


//have ternary for checking pages on this component - if quiz page - an addToStack
//like function will add the emoji to your collection after success
//if page is story, a clickHandler that will add the emoji to the story