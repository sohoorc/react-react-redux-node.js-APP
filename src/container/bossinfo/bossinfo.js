import React, { Component } from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import AvatarSelector from './../../component/avatar-select/avatar-select'
import { connect } from 'react-redux'
import { update } from './../../redux/user.redux'
import { Redirect } from 'react-router-dom';

@connect(
  state => state.user,
  {update}
)
class Bossinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      company: '',
      salary: '',
      desc: '',
      avatar: ''
    };
  }

  onChange(key, val) {
    this.setState({ [key]: val })
  }

  render() {
    return (
      <div>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
        <NavBar
          mode="dark"
        >BOSS完善信息页面</NavBar>
        <AvatarSelector
          selectAvatar={(imgname) => {
            this.setState({ avatar: imgname });
          }}
        ></AvatarSelector>
        <InputItem onChange={this.onChange.bind(this, 'title')}>招聘职位</InputItem>
        <InputItem onChange={this.onChange.bind(this, 'company')}>公司名称</InputItem>
        <InputItem onChange={this.onChange.bind(this, 'salary')}>职位薪资</InputItem>
        <TextareaItem
          onChange={this.onChange.bind(this, 'desc')}
          rows={3}
          title="职位要求"
          autoHeight
          maxLength={400}
        ></TextareaItem>
        <Button onClick={()=>this.props.update(this.state)} type="primary">保存</Button>
      </div>

    );
  }
}

export default Bossinfo;