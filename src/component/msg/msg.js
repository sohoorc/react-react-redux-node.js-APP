import React, { Component } from 'react';
import {connect} from 'react-redux';

@connect(
  state=>state
)
class Msg extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })

    const chatList = Object.values(msgGroup)
    console.log(chatList)
    return (
      <div>
        MSG
      </div>
    );
  }
}

export default Msg;