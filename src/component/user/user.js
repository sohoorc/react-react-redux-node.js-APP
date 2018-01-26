import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Result, List,WhiteSpace} from 'antd-mobile'
import browserCookies from 'browser-cookies'
const Item = List.Item,
  Brief = Item.Brief;

@connect(state => state.user)
class User extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
  }
  
  logout(){
    console.log('logout')
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
      : null;
  }
}

export default User;