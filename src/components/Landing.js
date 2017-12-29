import React, { Component } from 'react'
import {Button, Row, Col, Collection, CollectionItem} from 'react-materialize'

class Landing extends Component {
  constructor(props){
    super(props)
  }
  startButton = () => {
    this.props.loginClick()
  }
  render() {
    return (
    <div className='landing'>
    <Row>
      <Col s={4}>
        <div className="emoji-container">
          <span className="emoji-med" role="img" aria-label="Cat">🐱</span>
        </div>
      </Col>
      <Col s={4}>
        <div className="emoji-container">
         <span className="emoji-med" role="img" aria-label="Surf">🏄‍</span>
        </div>
      </Col>
      <Col s={4}>
      <div className="emoji-container">
        <span className="emoji-med" role="img" aria-label="Robot">🤖</span>
      </div>
      </Col>
    </Row>
    <Row>
      <Col s={4}>
       <div className="emoji-container">
         <span className="emoji-med" role="img" aria-label="Dinosaur">🦖</span>
        </div>
      </Col>
      <Col s={4}>
        <Collection>
         <CollectionItem active className="name-card">WORD RUMPUS</CollectionItem>
        </Collection>
       <Button onClick={(e) => this.startButton()} className="landing-button animated tada">Play</Button>
      </Col>
      <Col s={4}>
        <div className="emoji-container">
         <span className="emoji-med" role="img" aria-label="Chick">🐥</span>
        </div>
       </Col> 
    </Row>
    <Row>
      <Col s={4}>
       <div className="emoji-container">
          <span className="emoji-med" role="img" aria-label="Rocket">🚀</span>
        </div>
      </Col>
      <Col s={4}>
        <div className="emoji-container">
          <span className="emoji-med" role="img" aria-label="Happy">😀</span>
        </div>
      </Col>
      <Col s={4}>
        <div className="emoji-container">
          <span className="emoji-med" role="img" aria-label="Monkey">🐒</span>
          </div>
      </Col>  
    </Row>
    </div>
    )
  }
}

export default Landing