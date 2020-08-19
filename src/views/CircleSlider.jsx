import React, { Component } from "react";

import "./index.less";

let outerX = 0, //外圆到视口x距离
  outerY = 0, //外圆到视口y距离
  innerX = 0, //内圆到视口x距离
  innerY = 0, //内圆到视口y距离
  centerX = 0, //圆心到视口x距离
  centerY = 0, //圆心到视口x距离
  maxDistance = 0, //圆心到外圆的距离
  minDistance = 0, //圆心到内圆的距离
  handleClientX = 0, //滑块的相对宽度
  handleClientY = 0; //滑块的相对高度

class CircleSlider extends Component {
  state = {
    startX: 0, //滑块开始X位置
    startY: 0, //滑块开始Y位置
    left: 0, //滑块左偏移量
    top: 0, //滑块右偏移量
    angle: 0, //角度
    max: 100, //最大值, //todo
    min: 0, //最小值, //todo
  };
  componentDidMount() {
    //设置初始值
    outerX = this.getDomProperty(".slider-outer", "left");
    outerY = this.getDomProperty(".slider-outer", "top");
    innerX = this.getDomProperty(".slider-inner", "left");
    innerY = this.getDomProperty(".slider-inner", "top");
    centerX = this.getDomProperty(".center-dot", "left");
    centerY = this.getDomProperty(".center-dot", "top");
    handleClientX = this.getDomProperty(".handle", "width");
    handleClientY = this.getDomProperty(".handle", "height");
    //圆心到外圆的距离
    maxDistance = Math.sqrt(
      Math.pow(
        this.getDistance({ x: outerX, y: outerY }, { x: centerX, y: centerY }),
        2
      ) / 2
    );
    //圆心到内圆的距离
    minDistance = Math.sqrt(
      Math.pow(
        this.getDistance({ x: innerX, y: innerY }, { x: centerX, y: centerY }),
        2
      ) / 2
    );
    const { value = "30" } = this.props;
    const angle = this.getAngleByValue(value);
    this.setState({ angle });
    this.setLocation(angle);
  }

  /**
   * @method: touchMove事件
   * @param {function} cb 传递给父组件方法 onChange
   * @param {Event} e 事件对象
   */
  handleMove = (cb, e) => {
    const { pageX, pageY } = e.changedTouches[0];
    const angle = this.getAngle(centerX, centerY, pageX, pageY);
    this.setState({ angle });
    this.setLocation(angle);
    const value = this.getValueByAngle(angle);
    cb && cb(value);
  };
  /**
   * @method: touchend事件
   * @param {function} cb 传递给父组件方法 onAfterChange
   */
  handleEnd = (cb) => {
    const value = this.getValueByAngle(this.state.angle);
    cb && cb(value);
  };
  /**
   * @method: 设置滑块位置
   * @param {number} angle 角度
   */
  setLocation = (angle) => {
    const location = this.getLocation(
      centerX,
      centerY,
      (maxDistance + minDistance) / 2,
      angle
    );
    this.setState({
      left: location.x - outerX - handleClientX / 2,
      top: location.y - outerY - handleClientY / 2,
    });
  };
  /**
   * @method: 根据传入angle值获取角度
   * @param {number} angle 1-100
   * @return {number} value
   */
  getValueByAngle = (angle) => {
    let value = (value = parseInt(Math.abs((180 - angle) / 360) * 100));
    if (angle > 180) {
      value = 100 - value;
    }
    return value;
  };
  /**
   * @method: 根据传入value值获取角度
   * @param {number} value 1-100
   * @return {number} angle
   */
  getAngleByValue = (value) => {
    const { max, min } = this.state;
    const step = max - min;
    const angleStep = 360 / step;
    let angle = 180 - (value - min) * angleStep;
    angle = angle < 0 ? 360 + angle : angle;
    return angle;
  };
  /**
   * @method:获取两点坐标直线距离
   * @param {object} location1 {x:1, y:1}
   * @param {object} location2 {x:1, y:1}
   * @return:num
   */
  getDistance(location1, location2) {
    const dx = Math.abs(location1.x - location2.x);
    const dy = Math.abs(location1.y - location2.y);
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }
  /**
   * @method:获取两个坐标之间的角度
   * @param {number} px 坐标1 x轴
   * @param {number} py 坐标1 y轴
   * @param {number} mx 坐标2 x轴
   * @param {number} my 坐标2 y轴
   * @return {number} number 角度 0-360
   */
  getAngle(px, py, mx, my) {
    const x = Math.abs(px - mx);
    const y = Math.abs(py - my);
    const tan = y / x;
    const radina = Math.atan(tan); //用反三角函数求弧度
    let angle = Math.floor(180 / (Math.PI / radina)); //将弧度转换成角度d
    if (mx > px && my > py) {
      angle = 360 - angle;
    }
    if (mx > px && my <= py) {
      angle = angle;
    }
    if (mx < px && my >= py) {
      angle = 180 + angle;
    }
    if (mx < px && my < py) {
      angle = 180 - angle;
    }
    return angle;
  }
  /**
   * @method:已知圆心、半径、角度, 求圆上该点坐标
   * @param {number} x0 圆心x轴距离
   * @param {number} y0 圆心y轴距离
   * @param {number} r 圆的半径
   * @param {number} angle 角度
   * @return {Object} { x:1, y:1 }
   */
  getLocation(x0, y0, r, angle) {
    return {
      x: x0 + r * Math.cos((angle * Math.PI) / 180),
      y: y0 - r * Math.sin((angle * Math.PI) / 180),
    };
  }
  /**
   * @method: 获取元素属性值
   * @param {string} selectors css选择符
   * @param {string} prop 属性名
   * @return {number}  number
   */
  getDomProperty = (selectors, prop) => {
    return document.querySelector(selectors).getBoundingClientRect()[prop] || 0;
  };
  render() {
    const { angle, left, top } = this.state;
    const { onChange, onAfterChange, children } = this.props;
    const transform1 = { transform: `rotate(0deg)` };
    const transform2 = {
      transform: `rotate(${360 - angle}deg)`,
      opacity: `${angle >= 180 ? 1 : 0}`,
    };
    const transform3 = {
      transform: `rotate(${360 - angle + 180}deg)`,
      opacity: `${angle >= 180 ? 0 : 1}`,
    };
    const transform4 = { transform: `rotate(180deg)` };
    return (
      <div className="slider-wrap">
        <div className="slider-outer">
          <React.Fragment>
            <div className="range-path range1" style={transform1}></div>
            <div className="range-path range2" style={transform2}></div>
            <div className="range-path range3" style={transform3}></div>
            <div className="range-path range4" style={transform4}></div>
          </React.Fragment>
          <div className="slider-inner">
            <div className="center-dot"></div>
            <div className="content-wrap">{children}</div>
          </div>
        </div>
        <div className="mask"></div>
        <div
          className="handle"
          onTouchMove={this.handleMove.bind(this, onChange)}
          onTouchEnd={this.handleEnd.bind(this, onAfterChange)}
          style={{ left, top }}
        ></div>
      </div>
    );
  }
}
export default CircleSlider;
