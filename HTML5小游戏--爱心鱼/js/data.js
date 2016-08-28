// 分值计算，改变发生在碰撞时
var dataObj = function () {
  this.fruitNum = 0; // 果实数量
  this.double = 1; // 蓝色果实，翻倍
  this.score = 0; // 分值保存，当大鱼和小鱼碰撞时，当前分值计入score
  this.gameOver = false; // 游戏状态，初始false，当小鱼身体变白后设为true
  this.alpha = 0; // 透明度，用于文字渐现
};
// 在addScore中reset，这里不需要了
// dataObj.prototype.reset = function() {
//   this.fruitNum = 0;
//   this.double = 1;
// }

dataObj.prototype.draw = function() {
  var w = can1.width;
  var h = can1.height;

  ctx1.save(); // 文字设定，只适用于此处
  ctx1.showBlur = 10; // 设置阴影
  ctx1.showColor = "white"; // 设置阴影颜色
  ctx1.fillStyle = "white";
  ctx1.fillText("SCORE: " + this.score, w * 0.5, h - 20);

  if(data.gameOver){
    // 使用rgba来实现渐渐显示的文字效果
    this.alpha += deltaTime * 0.0005;
    if(this.alpha > 1) {
      this.alpha = 1;
    }
    ctx1.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";
    ctx1.fillText("GAME OVER", w * 0.5,  h * 0.5);
  }
  ctx1.restore();
}

dataObj.prototype.addScore = function() {
  this.score += this.fruitNum * 100 * this.double; // 一个果实100分并计算是否吃到蓝色果实
  this.fruitNum = 0;
  this.double = 1;
}