import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
const Header = Card.Header
const Body = Card.Body


class UserCard extends Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }


  render() {
    return (
      <div>
        <WingBlank>
          {this.props.userlist.map(v => {
            return v.avatar
              ? <Card key={v._id}>
                <Header
                  title={v.user}
                  thumb={require(`../img/${v.avatar}.png`)}
                  extra={<span>{v.title}</span>}
                />
                <Body>
                  {v.type=='boss'?<div>公司:{v.company}</div>:null}
                  {v.desc.split('\n').map((item) => {
                    return <p key={item + Math.random()}>{item}</p>
                  })}
                  {v.type =='boss'?<div>薪资{v.salary}</div>:null}
                </Body>
              </Card>
              : null
          })}
        </WingBlank>
      </div>
    );
  }
}

export default UserCard;