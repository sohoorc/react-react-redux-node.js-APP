import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavBar, WhiteSpace } from 'antd-mobile'

import Boss from './../../component/boss/boss'
import Genius from './../../component/genius/genius'
import Msg from './../../component/msg/msg'
import User from './../../component/user/user'

import NavLink from './../navlink/navlink'

// function Msg(){
//   return <h1>msg</h1>
// }

// function User(){
//   return <h1>User</h1>
// }

@connect(state => state)
class DashBoard extends Component {
  render() {
    const pathname = this.props.location.pathname
    const user = this.props.user
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type == 'genius'
      }, {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type == 'boss'
      }, {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg,
      }, {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User,
      }
    ]


    return (
      <div>
        <NavBar className="fixd-header" mode="dark">
          {navList.find((item) => { return item.path == pathname }).title}
        </NavBar>
        <WhiteSpace></WhiteSpace>
        <div>
          <Switch>
            {navList.map(v => {
              return <Route key ={v.path} path={v.path} component={v.component}></Route>
            })}
          </Switch>
        </div>

        {/* <Route path='/genius' component={Genius}></Route> */}
        <NavLink data={navList}></NavLink>
      </div>
    );
  }
}

export default DashBoard;