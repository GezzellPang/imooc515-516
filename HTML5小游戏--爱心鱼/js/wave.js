// 白色圆圈，定义一个池，有一些圆圈，定义一个状态判断是否活着，如果活着则可以使用
var waveObj = function () {
  this.x = [];
  this.y = [];
  this.alive = []; // 是否活着,执行任务则为活着
  this.r = []; // 半径
}

waveObj.prototype.num = 10; // 数量
waveObj.prototype.init = function () {
  for (var i = 0; i < this.num; i++) {
    this.alive[i] = false;
    this.r[i] = 0;
  }
}
waveObj.prototype.draw = function () {
  ctx1.save();
  ctx1.lineWidth = 2; // 线宽
  ctx1.shadowBlur = 10;
  ctx1.shadowColor = "white"
  for (var i = 0; i < this.num; i++) {
    if(this.alive[i]){  // 判断，活着则处理
      // draw， canvas.arc()
      this.r[i] += deltaTime * 0.04;
      if(this.r[i] > 50){ // 当半径大于50，则设置半径为50，alpha值为0，则消失
        this.alive[i] = false;
        continue;
      }
      var alpha = 1 - this.r[i] / 50; // alpha和半径是反向关系
      ctx1.beginPath(); // 开始路径
      ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
      ctx1.closePath(); // 关闭路径
      ctx1.strokeStyle = "rgba(255, 255, 255, " + alpha + ")"; // 设置样式
      ctx1.stroke(); // 绘制
    }
  }
  ctx1.restore();
}
// 当大鱼吃掉果实时，需要born一个圆圈
waveObj.prototype.born = function (x, y) {
  for (var i = 0; i < this.num; i++) {
    if(!this.alive[i]){
      //born
      this.alive[i] = true; // 设置为活着
      this.r[i] = 10; // 半径20
      this.x[i] = x;
      this.y[i] = y;
      return; // 因为每次只需要一个物体，所以born之后跳出循环
    }
  }
}