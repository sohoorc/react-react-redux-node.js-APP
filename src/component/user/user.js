import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import browserCookies from 'browser-cookies'
import { logOutSubmit } from '../../redux/user.redux';
import { Redirect } from 'react-router';
const Item = List.Item,
  Brief = Item.Brief,
  alert = Modal.alert;

@connect(state => state.user,{logOutSubmit})
class User extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
  }

  logout() {

    // console.log('logout')
    // browserCookies.erase('userid')

    alert('注销', '确认退出登录吗？', [
      { text: '取消', onPress: () => console.log('取消') },
      { text: '确认', onPress: () => { 
        browserCookies.erase('userid')
        console.log('logout')
        this.props.logOutSubmit();
      }}
    ])
  }

  render() {
    const props = this.props;
    return props.user ? (
      <div>
        <Result
          img={<img style={{ width: 50 }} src={require(`../img/${props.avatar}.png`)} />}
          title={props.user}
          message={props.type == 'boss' ? props.company : null}
        ></Result>
        <List renderHeader={() => '简介'}>
          <Item>
            {props.title}
            {this.props.desc.split('\n').map(v => <Brief key={v}>
              {v}
            </Brief>)}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={this.logout}>退出登录</Item>
        </List>
      </div>
    )
      : <Redirect to={'/login'}></Redirect>;
  }
}

export default User;