import React, { Component } from 'react';
import { Grid, List } from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends Component {
  static propTypes = {
    selectAvatar:PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      icon: ''
    };
    
    this.avatarList = 'boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'.split(',')
      .map(v => ({
        icon: require(`./../img/${v}.png`),
        text: v
      }))
  }

  render() {
    const gridHeader = this.state.icon
      ? (
        <div>
          <span>已选择头像</span>
          <img src={this.state.icon} alt={'头像'} style={{ width: 20 }} />
        </div>
      ) : '请选择头像'
    return (
      <div>
        {gridHeader}
        <List renderHeader={() => { gridHeader }}>
          <Grid
            data={this.avatarList}
            columnNum={5}
            onClick={(e) => {
              this.setState({ icon: e.icon })
              this.props.selectAvatar(e.text)
            }}
          ></Grid>
        </List>
      </div>
    );
  }
}

export default AvatarSelector;