// 漂浮物
var dustObj = function () {
  this.x = [];
  this.y = [];
  this.amp = []; // 振幅
  this.NO = []; // 漂浮物图片编号

  this.alpha; // 三角函数用的角度
}
dustObj.prototype.num = 30; // 定义30个
dustObj.prototype.init = function () {
  for (var i = 0; i < this.num; i++) {
    this.x[i] = Math.random() * canWidth; // 随机位置
    this.y[i] = Math.random() * canHeight; // 随机位置
    this.amp[i] = 20 + Math.random() * 15; // 随机振幅
    this.NO[i] = Math.floor(Math.random() * 7); // 随机0-6
  }
  this.alpha = 0;
}
dustObj.prototype.draw = function () {
  this.alpha += deltaTime * 0.0008; // 跟海葵保持一致
  var l = Math.sin(this.alpha); 
  for (var i = 0; i < this.num; i++) {
    var no = this.NO[i];
    ctx1.drawImage(dustPic[no], this.x[i] + this.amp[i] * l, this.y[i])
  }
}