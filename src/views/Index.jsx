import React, { Component } from "react";
import CircleSlider from "./CircleSlider.jsx";

class Index extends Component {
  state = { value: 60 };
  handleChange = (value) => {
    this.setState({ value });
    //dosomething
  };
  handleAfterChange = (value) => {
    //dosomething
  };
  render() {
    return (
      <CircleSlider
        value={this.state.value}
        onChange={this.handleChange}
        onAfterChange={this.handleAfterChange}
      >
        <div>{this.state.value}</div>
      </CircleSlider>
    );
  }
}

export default Index;
