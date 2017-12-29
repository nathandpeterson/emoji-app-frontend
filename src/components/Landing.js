import React, { Component } from 'react'
import {Button, Row, Col, Collection, CollectionItem} from 'react-materialize'
import Transition from 'react-transition-group/Transition'

const styles = {
  transition: 'all 1s ease-in'
}

class Landing extends Component {

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
         <CollectionItem className="name-card">WORD RUMPUS</CollectionItem>
        </Collection>
       <Button className="landing-button animated bounce">Play</Button>
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