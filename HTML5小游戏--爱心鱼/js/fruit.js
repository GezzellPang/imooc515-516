// 果实处理，慢慢长大，成熟后向上飘，速度随机
// 使用果实池设置
var fruitObj = function(){
	this.alive = []; // 是否活着，bool
	this.x = [];	// 果实坐标x
	this.y = [];	// 果实坐标y
	this.aneNO = []; // 记录果实对应的海葵id
	this.l = [];	// 果实长度
	this.spd = [];	// 果实成长和上飘的随机速度
	this.fruitType = [];	// 果实类型
	this.orange = new Image(); // 黄色果实
	this.blue = new Image();	// 蓝色果实
};
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		this.alive[i] = false; // 初始设置所有果实状态为不活
		this.x[i] = 0;
		this.y[i] = 0;
		this.aneNO[i] = 0;
		this.spd[i] = Math.random() * 0.017 + 0.003; 
		this.fruitType[i] = "";
	}
	this.orange.src="./src/fruit.png";
	this.blue.src="./src/blue.png";
};
fruitObj.prototype.draw = function(){
	for (var i = 0; i < this.num; i++) {
		//draw
		//find an ane , grow , fly up
		if(this.alive[i]){
			// 判断果实类型，蓝色还是橙色
			if(this.fruitType[i] == "blue"){
				var pic = this.blue;
			}else{
				var pic = this.orange;
			}
			// 具体绘制果实
			if(this.l[i] <= 14){ // 成熟之前跟随海葵移动，成长过程中设置xy坐标
				var aneID = this.aneNO[i];
				this.x[i] = ane.headx[aneID];
				this.y[i] = ane.heady[aneID];
				this.l[i] += this.spd[i] * deltaTime; 
			}else{	// 大于14则向上飘
				this.y[i] -= this.spd[i] * 7 * deltaTime; 
			}
			ctx2.drawImage(pic,this.x[i] - this.l[i] * 0.5,this.y[i] - this.l[i] * 0.5,this.l[i],this.l[i]);
			if(this.y[i] < 10){ // 果实的y坐标小于-10，果实alive设为false
				this.alive[i] = false;
			}
		}
		
	}
};
fruitObj.prototype.born = function(i) {
	// var aneId = Math.floor(Math.random() * ane.num); // 随机找一个海葵,临时变量被aneNO替代
	this.aneNO[i] = Math.floor(Math.random() * ane.num); // 在果实出生的时候设置其会长在哪一个果实上
	// this.x[i] = ane.x[aneId];  // 果实的x
	// this.y[i] = canHeight - ane.len[aneId]; // 果实的y
	// 使用贝塞尔曲线生成动态海葵后之前的坐标弃用,由于需要果实绘制需跟随海葵摆动，这里不设置固定的xy值
	// this.x[i] = ane.headx[aneId];
	// this.y[i] = ane.heady[aneId];
	this.l[i] = 0;	// 果实长度，从0开始增长
	this.alive[i] = true;	
	var ran = Math.random();	// 随机数
	if(ran < 0.2){	// 随机数小于0.2则生成蓝色果实
		this.fruitType[i] = "blue";//orange,blue
	}else{
		this.fruitType[i] = "orange";
	}
};
// 果实被吃死去
fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
}
// 果实数量检测
function fruitMonitor(){
	var num = 0;
	for (var i = 0; i < fruit.num; i++) {
		if(fruit.alive[i]) num++; // 活着的果实数量统计
	}
	if(num < 15){ // 果实数量小于15，则生成一个果实
		//send fruit
		sendFruit();
		return;
	}
}
// 循环果实池，将死去的果实再次生成
function sendFruit(){
	for (var i = 0; i < fruit.num; i++) {
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}



fruitObj.prototype.update = function () {
	for (var i = 0; i < this.num; i++) {
		
	}
};