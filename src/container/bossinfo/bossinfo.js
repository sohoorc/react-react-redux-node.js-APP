import React, { Component } from 'react';
import { NavBar, InputItem, TextareaItem} from 'antd-mobile';
import AvatarSelector from './../../component/avatar-select/avatar-select'

class Bossinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      company:'',
      salary:'',
      desc:''
    };
  }

  onChange(key, val) {
    this.setState({[key]:val})
  }

  render() {
    return (
      <div>
        <NavBar
          mode="dark"
        >BOSS完善信息页面</NavBar>
        <AvatarSelector></AvatarSelector>
        <InputItem onChange={this.onChange.bind(this, 'title')}>招聘职位</InputItem>
        <InputItem onChange={this.onChange.bind(this, 'company')}>公司名称</InputItem>
        <InputItem onChange={this.onChange.bind(this, 'salary')}>职位薪资</InputItem>
        <TextareaItem onChange={this.onChange.bind(this, 'desc')} rows={3} title="职位要求"></TextareaItem>
      </div>
    );
  }
}

export default Bossinfo;