// 海葵相关
// 使用二次贝塞尔曲线和正弦函数制作摇摆的海葵
var aneObj = function() {
	// start point, control point, end point(sin)
	
	this.rootx = []; // 开始点，start point	
	this.headx = []; // 结束点x，头部，end point，sin函数控制
	this.heady = []; // 结束点y，高低不平
	this.amp = []; // 振幅，正弦最高点到x轴的距离，每个海葵有自己单独的振幅，有大有小
	this.alpha = 0; // 正弦函数的角度
	// this.len = []; 高度值不再需要
};
aneObj.prototype.num = 50;
aneObj.prototype.init = function() {
	for (var i = 0; i < this.num; i++) {
		// this.x[i] = i * 16 + Math.random() * 20;
		this.rootx[i] = i * 16 + Math.random() * 20;
		this.headx[i] = this.rootx[i];
		this.heady[i] = canHeight - 250 + Math.random() * 50; // 头部的y值为屏幕高度减去固定值再加上随机值
		this.amp[i] = Math.random() * 50 + 50; // 初始化振幅，随机生成
		// this.len[i] = 200 + Math.random() * 50; 
	}
};
aneObj.prototype.draw = function() {
	this.alpha += deltaTime * 0.0008; // 角度是一直变化的
	var l = Math.sin(this.alpha); // l为正弦函数的y坐标，随时间一直在变化，[-1, 1]
	ctx2.save();
	ctx2.globalAlpha = 0.6; // 透明度
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round";// 线段结束的样式
	ctx2.strokeStyle = "#3b154e"; // 描边颜色
	for (var i = 0; i < this.num; i++) {
		// beginPath , moveTo , lineTo , stroke , strokeStyle , lineWidth , lineCap , globalAlpha
		ctx2.beginPath();
		// ctx2.moveTo(this.x[i], canHeight);
		ctx2.moveTo(this.rootx[i], canHeight);
		// 控制点坐标x为rootx，y为画面高度减去固定值，结束点的xy为headx，heady
		this.headx[i] = this.rootx[i] + l * this.amp[i]; // 当前海葵头部的具体位置
		ctx2.quadraticCurveTo(this.rootx[i], canHeight - 100, this.headx[i], this.heady[i]); 
		// ctx2.lineTo(this.x[i], canHeight - this.len[i]);
		ctx2.stroke();
	}
	ctx2.restore();
};
