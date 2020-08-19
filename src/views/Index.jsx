import React, { Component } from "react";
import CircleSlider from "./CircleSlider.jsx";

class Index extends Component {
  handleChange = (val) => {
    console.log(val, "val1");
  };
  handleAfterChange = (val) => {
    console.log(val, "val2");
  };
  render() {
    return (
      <CircleSlider
        value={60}
        onChange={this.handleChange}
        onAfterChange={this.handleAfterChange}
      >
        <div>123</div>
      </CircleSlider>
    );
  }
}

export default Index;
