import React, { Component } from 'react';
import axios from 'axios'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { connect } from 'react-redux'
import { getUserList } from './../../redux/chatuser.redux'

const Header = Card.Header
const Body = Card.Body

@connect(state => state, { getUserList })
class Boss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.props.getUserList('genius')
  }

  render() {
    return (
      <WingBlank>
        {this.props.chatuser.userlist.map(v => {
          return v.avatar
            ? <Card key={v._id}>
              <Header
                title={v.user}
                thumb={require(`../img/${v.avatar}.png`)}
                extra={<span>{v.title}</span>}
              />
              <Body>
                {v.desc.split('\n').map((v) => {
                  return <p key={v + Math.random()}>{v}</p>
                })}
              </Body>
            </Card>
            : null
        })}
      </WingBlank>
    );
  }
}

export default Boss;