import React, { Component } from 'react'
import Spell from './Spell'
import Emoji from './Emoji'
import {Card, CardTitle} from 'react-materialize'

class Dash extends Component {
  render() {
    return (
      <div>
    <h1>where you want me go?</h1>
    <h2>and link to below</h2>
    <p>dashboard will contain link to 'quiz' page and potentially stories?</p>
    <p>could have separate profile page, or just include some info on this dashboard page? </p>
    <Card className='small'
    header={<CardTitle image={this.props.profile.picture}>Profile</CardTitle>}
    actions={[<a href='#'>This is a Link</a>]}>
    <h3>{this.props.profile.nickname}</h3>
  </Card>
    <Spell />
    <Emoji />
    </div>
    
   
    );
  }
}

export default Dash