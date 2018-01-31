import React, { Component } from 'react';
import { List, InputItem, NavBar,WhiteSpace } from 'antd-mobile';
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from './../../redux/chat.redux'
//const socket = io('ws://192.168.20.54:9093')

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg }
)
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      msgs: []
    }
  }

  componentDidMount() {  
    if(!this.props.chat.chatmsg.length){
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }

  handleSubmit() {
    const from = this.props.user._id
    const to = JSON.parse(this.props.match.params.user).id
    const msg = this.state.text
    this.props.sendMsg(from, to, msg)
    this.setState({ text: '' })

    let chatContainerEle = this.refs.chatContainerDom
    let eleClientHeight = chatContainerEle.clientHeight
    let eleScrollHeight = chatContainerEle.scrollHeight

    chatContainerEle.scrollTo(0,(eleScrollHeight-eleClientHeight)+64)
  }

  componentWillReceiveProps(nextProps){
    let chatContainerEle = this.refs.chatContainerDom
    let eleClientHeight = chatContainerEle.clientHeight
    let eleScrollHeight = chatContainerEle.scrollHeight
    chatContainerEle.scrollTo(0,(eleScrollHeight-eleClientHeight)+64)
  }

  render() {
    
    let user = this.props.match.params.user
      user = JSON.parse(user)
    let userId = user.id;
    let userName = user.user;

    // 聊天ID
    let chatid = [this.props.user._id,userId].sort().join('_')
    // 消息列表
    let chatList = this.props.chat.chatmsg.filter(v=>chatid===v.chatid)
    return (
      <div style={{height:'100%'}}>
        <NavBar 
          leftContent={"返回"}
          mode='dark'
          onLeftClick={()=>{this.props.history.goBack()}}
          >
          {userName}
        </NavBar>
        <div className="chat-container" ref="chatContainerDom">
          {chatList.map((v) => {
            // return <p key={v + Math.random().toString()}>{v.content}</p>
            if(userId===v.from){
              // 收到的消息
              return <p className="chat-item chat-receive" key={v._id}><span className="chat-content">{v.content}</span></p>
            }else{
              // 发出的消息
              return <p className="chat-item chat-send" key={v._id}><span className="chat-content">{v.content}</span></p>
            }
          })}
        </div>
        <WhiteSpace></WhiteSpace>
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入聊天信息"
              value={this.state.text}
              onChange={
                v => {
                  this.setState({ text: v })
                }
              }
              extra={
                <span onClick={this.handleSubmit.bind(this)}>发送</span>
              }
            >信息</InputItem>
          </List>
        </div>

      </div>
    );
  }
}

export default Chat;