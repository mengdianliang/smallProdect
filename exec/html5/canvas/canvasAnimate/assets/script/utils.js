/**
 * canvas一些基本的工具函数
 */

let C = {};

// 获取鼠标在元素上的坐标
C.getOffset = function (ele){
  let mouse = {x: 0, y: 0};
  ele.addEventListener('mousemove', function (e){
    let {x, y} = C.eventWrapper(e);
    mouse.x = x;
    mouse.y = y;
  });
  return mouse;
};

// 坐标系转换
C.eventWrapper = function (ev){
  let {pageX, pageY, target} = ev;
  let {left, top} = target.getBoundingClientRect();
  return {x: pageX - left, y: pageY - top};
};

// 角度转弧度
C.toRad = function (angle){
  return angle * Math.PI / 180
};

// 弧度转角度
C.toAngle = function (rad){
  return rad * 180 / Math.PI
};

// 生成随机数
C.rp = function (arr, int){  // C.rp([10, 20], true)
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const num = Math.random() * (max - min) + min;
  return int ? Math.round(num) : num;
};

// 生成随机颜色
C.createColor = function (){
  return `rgb(${C.rp([55, 255], true)}, ${C.rp([55, 255], true)}, ${C.rp([55, 255], true)})`;
};

// 矩形之间的碰撞检测
C.rectDuang = function (rect1, rect2){ 
  return (rect1.x + rect1.w >= rect2.x && rect1.x <= rect2.x + rect2.w && rect1.y + rect1.h >= rect2.y && rect1.y <= rect2.y + rect2.h);
};

// 求俩点间的距离
C.getDist = function (x1, y1, x2, y2){
  return Math.sqrt((x2 - x1)*2 + (y2 - y1)*2);
};

// 对小球进行边界反弹处理
C.checkBallBounce = function (ball, W, H, bounce){
  if(ball.x - ball.r <= 0){
    ball.x = ball.r;
    ball.vx *= bounce;
  }else if(ball.x + ball.r >= W){
    ball.x = W - ball.r;
    ball.vx *= bounce;
  }
  if(ball.y - ball.r <= 0){
    ball.y = ball.r;
    ball.vy *= bounce;
  }else if(ball.y + ball.r >= H){
    ball.y = H - ball.r;
    ball.vy *= bounce;
  }
};
