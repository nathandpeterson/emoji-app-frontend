import React, {Component} from 'react'
import {Button, Chip, Col, Row, Card, CardPanel} from 'react-materialize'
import ProfileAvatars from './ProfileAvatars'
const API = process.env.REACT_APP_API_URL

class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {userInfo: [], avatar:false, avatarEmoji: ''}
  }
  
  componentWillReceiveProps(){
    const currentState = Object.assign({}, this.state)
    if(this.props.userInfo.avatar) this.setState({...currentState, userInfo: this.props.userInfo, avatarEmoji: this.props.userInfo.avatar})
  }
  renderAvatarButton(){
    return <Button onClick={this.handleClick} className="choose-avatar">CHOOSE AVATAR</Button>
  }
  postAvatar = async (e) => {
    let emojiAvatar = e.target.innerHTML
    const userInfo = await this.props.checkForUser(this.props.user)
    let response = await fetch(`${API}/users/${userInfo.id}`,
                                {body: JSON.stringify({avatar: emojiAvatar}),
                                method: 'PUT',
                                credentials: 'same-origin',
                                headers: {'Content-Type': 'application/json'}})
    let {result} = await response.json()
    const currentState = Object.assign({}, this.state)
    this.setState({...currentState, avatarEmoji: result.avatar})
  }
  handleClick = () => {
    let currentState = Object.assign({}, this.state)
    this.setState({...currentState, avatar: true})
  }
  renderAvatar = (user) => {
    return this.state.avatarEmoji ? <span className="animated fadeInUpBig">{this.state.avatarEmoji} </span> : <img className= "profile avatar" src = {user.picture}></img>
  }

  render(){
    const {user, userCollection, allEmoji, userInfo} = this.props
    return (
      <Row>
        <Col className="container offset-m3" m={6} s={12}>
          <div className="animated fadeInUp">
            <Card className="grey lighten-3">
              <CardPanel className="pink white-text">
                <h4>Welcome, {user.nickname}!</h4>
              </CardPanel>
            <h6>You have collected <Chip>{userCollection.length}/{allEmoji.length}</Chip> emoji.</h6>
            {this.renderAvatar(user)}
            {this.renderAvatarButton()}
            </Card>
          </div>
        </Col>
        {this.state.avatar && <ProfileAvatars allEmoji={allEmoji}
                                              postAvatar={this.postAvatar}/>}
     </Row>
    )
  }
}


export default Profile
