import React, { Component } from 'react';
import axios from 'axios'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { connect } from 'react-redux'
import { getUserList } from './../../redux/chatuser.redux'
import UserCard from './../usercard/usercard';

const Header = Card.Header
const Body = Card.Body

@connect(state => state, { getUserList })
class Genius extends Component {
  componentDidMount() {
    this.props.getUserList('boss')
  }

  render() {
    return <UserCard userlist ={this.props.chatuser.userlist}></UserCard>;
  }
}

export default Genius;