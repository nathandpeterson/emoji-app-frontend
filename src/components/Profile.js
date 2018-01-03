import React from 'react';

const Profile =({user, allEmoji, userCollection}) => {
  return (
    <div>
      <h1>Welcome, {user.nickname}!</h1>
      <h2>You have collected {userCollection.length}/{allEmoji.length} emojis.</h2>
      <p>
      <img className= "profile" src = {user.picture}></img>
      </p>
    </div>
  );
}

export default Profile;
