import React, { Component } from 'react';
import axios from 'axios'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
const Header = Card.Header
const Body = Card.Body
class Boss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios.get('/user/list?type=genius')
      .then(res => {
        if (res.data.code == 0) {
          this.setState({ data: res.data.data });
        }
      })

  }

  render() {
    console.log(this.state.data)
    return (
      <WingBlank>
        {this.state.data.map(v => {
          return v.avatar
            ? <Card key={v._id}>
              <Header
                title={v.user}
                thumb={require(`../img/${v.avatar}.png`)}
                extra={<span>{v.title}</span>}
              />
              <Body>
                {v.desc.split('\n').map((v)=>{
                  return <p key={v+Math.random()}>{v}</p>
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