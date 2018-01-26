import React, { Component } from 'react';

class Msg extends Component {
  constructor(props) {
    super(props);
    this.clickA = this.clickA.bind(this)
  }
  
  clickA(){
    alert(1)
  }

  render() {
    return (
      <div onClick={this.clickA}>
        MSG
      </div>
    );
  }
}

export default Msg;