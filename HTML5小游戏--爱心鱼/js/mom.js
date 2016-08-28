// 大鱼绘制
var momObj = function(){
	this.x; // 坐标x
	this.y;	// 坐标y
	this.angle;	// 角度
	this.bigEye = new Image(); // 大鱼眼睛
	this.bigBody = new Image();	// 大鱼身体
	this.bigTail = new Image();	// 大鱼尾巴

	this.bigTailTimer = 0; // 大鱼尾巴计时器
	this.bigTailCount = 0; // 大鱼尾巴当前帧

	this.bigEyeTimer = 0;	// 大鱼眼睛计时器
	this.bigEyeCount = 0; // 大鱼眼睛当前帧
	this.bigEyeInterval = 1000; // 大鱼眨眼时间间隔

	this.bigBodyCount = 0; // 大鱼身体计数器，记录帧，当大鱼吃到果实时发生变化，collision.js,并反映在大鱼身体变化上
};
momObj.prototype.init = function(){ 
	this.x = canWidth * 0.5; // 初始化x
	this.y = canHeight * 0.5;	// 初始化y
	this.angle = 0;	//初始化为0
};
momObj.prototype.draw = function() {

	//lerp x.y，使得一个值趋向一个目标值
	this.x = lerpDistance(mx, this.x, 0.98);
	this.y = lerpDistance(my, this.y, 0.98);

	//delta angle ，大鱼朝向，相关知识百度，极坐标
	//Math.atan2(y, x) 反正切api
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;

	// big tail count
	this.bigTailTimer += deltaTime;
	if(this.bigTailTimer > 50) {
		this.bigTailCount = (this.bigTailCount + 1) % 8;
		this.bigTailTimer %= 50;
	}

	// big eye 
	this.bigEyeTimer += deltaTime;
	if(this.bigEyeTimer > this.bigEyeInterval){
		this.bigEyeCount = (this.bigEyeCount + 1) % 2;
		this.bigEyeTimer %= this.bigEyeInterval;

		if(this.bigEyeCount === 0) {
			this.bigEyeInterval = Math.random() * 1500 + 2000; // [,)
		} else {
			this.bigEyeInterval = 200;
		}
	}

	//lerp angle
	this.angle = lerpAngle(beta, this.angle, 0.6);

	ctx1.save();	// 用sace和restore记录大鱼状态，仅适用于大鱼
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);	// 先移动后旋转

	// 数值用于调整眼睛和尾巴的位置
	var bigTailCount = this.bigTailCount;
	ctx1.drawImage(bigTail[bigTailCount], -bigTail[bigTailCount].width * 0.5 + 30, -bigTail[bigTailCount].height * 0.5);	
	var bigBodyCount = this.bigBodyCount;
	// 判断吃到的果实显示相应的颜色
	if(data.double === 1){
		ctx1.drawImage(bigBodyOra[bigBodyCount], -bigBodyOra[bigBodyCount].width * 0.5, -bigBodyOra[bigBodyCount].height * 0.5);
	}else{
		ctx1.drawImage(bigBodyBlue[bigBodyCount], -bigBodyBlue[bigBodyCount].width * 0.5, -bigBodyBlue[bigBodyCount].height * 0.5);
	}
	
	var bigEyeCount = this.bigEyeCount;
	ctx1.drawImage(bigEye[bigEyeCount], -bigEye[bigEyeCount].width * 0.5, -bigEye[bigEyeCount].height * 0.5);

	ctx1.restore();
};
