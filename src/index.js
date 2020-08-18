/*
 * @Date: 2020-04-10 15:39:50
 * @LastEditors: liangchen
 * @LastEditTime: 2020-08-12 15:37:44
 */
import React from "react";
import ReactDOM from "react-dom";
import MainRouter from "./router/MainRouter.jsx";

/**
 * @method 屏幕适配，主要通过控制根节点字号大小来设置当前rem基准值
 */
function resizefn() {
  const html = document.documentElement;
  const w = Math.min(html.clientWidth, html.clientHeight);
  html.style.fontSize = Math.max(w, 320) / 7.5 + "px";
}
//添加屏幕旋转事件
if ("onorientationchange" in window) {
  window.addEventListener("orientationchange", resizefn, false);
} else {
  window.addEventListener("resize", resizefn, false);
}
resizefn();

ReactDOM.render(<MainRouter />, document.getElementById("root"));
