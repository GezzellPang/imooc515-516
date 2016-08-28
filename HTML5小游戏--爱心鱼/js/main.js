
var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;
//两次绘制间隔时间
var lastTime;
var deltaTime; // 两针直接的时间间隔

var bgPic = new Image();
// 海葵对象
var ane;
// 果实对象
var fruit;
// 大鱼对象
var mom;
// 小鱼对象
var baby;
// 鼠标位置
var mx;
var my;

var babyTail = []; // 小鱼尾巴数组
var babyEye = [];	// 小鱼眼睛
var babyBody = []; // 小鱼身体

var bigTail = []; // 大鱼尾巴数组
var bigEye = [];	// 大鱼眼睛
var bigBodyOra = []; // 大鱼身体橙黄色
var bigBodyBlue = []; // 大鱼身体蓝色

var data;	// 计数

var wave; // 白色的圈，用于特效
var halo; // 大鱼喂小鱼圆圈

var dust; // 漂浮物
var dustPic = []; // 用于存放漂浮物图片

document.body.onload = game;

function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameLoop();
}
function init(){
	can1 = document.getElementById('canvas1');	// fishes, dust, UI, circle
	ctx1 = can1.getContext('2d');
	can2 = document.getElementById('canvas2');	// background, ane, fruits
	ctx2 = can2.getContext('2d');

	can1.addEventListener('mousemove', onMouseMove, false);

	bgPic.src = "./src/background.jpg";
	canWidth = can1.width;
	canHeight = can1.height;
	// 实例海葵并初始化
	ane = new aneObj();
	ane.init();
	// 实例果实并初始化
	fruit = new fruitObj();
	fruit.init();
	// 实例大鱼并初始化
	mom = new momObj();
	mom.init();
	// 实例小鱼并初始化 
	baby = new babyObj();
	baby.init();
	// 鼠标位置
	mx = canWidth * 0.5;
	my = canHeight * 0.5;
	// 加载鱼尾巴图片
	for (var i = 0; i < 8; i++) {
		bigTail[i] = new Image();
		bigTail[i].src = "./src/bigTail" + i + ".png";

		bigBodyOra[i] = new Image();
		bigBodyOra[i].src = "./src/bigSwim" + i + ".png";

		bigBodyBlue[i] = new Image();
		bigBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";

		babyTail[i] = new Image();
		babyTail[i].src = "./src/babyTail" + i + ".png";
	}
	// 加载鱼眼睛
	for (var i = 0; i < 2; i++) {
		bigEye[i] = new Image();
		bigEye[i].src = "./src/bigEye" + i + ".png";
		babyEye[i] = new Image();
		babyEye[i].src = "./src/babyEye" + i + ".png";
	}
	// 加载鱼身体
	for (var i = 0; i < 20; i++) {
		babyBody[i] = new Image();
		babyBody[i].src = "./src/babyFade" + i + ".png";
	}

	// 分值
	data = new dataObj();

	// 初始化计分字体，定义一次即可
  ctx1.font = "30px Verdana";
  ctx1.textAlign = "center";  // left, center, right

  // 实例化wave并初始化
  wave = new waveObj();
  wave.init();

  // 实例化halo并初始化
  halo = new haloObj();
  halo.init();

  for (var i = 0; i < 7; i++) {
  	dustPic[i] = new Image();
  	dustPic[i].src = "./src/dust" + i + ".png";
  }
  // 实例化漂浮物并初始化
  dust = new dustObj();
  dust.init();
}
function gameLoop(){
	requestAnimFrame(gameLoop);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	// 优化，解决浏览器切出之后deltaTime不停增大的问题
	if(deltaTime > 40) deltaTime = 40;

	drawBackground();

	// 果实检测函数
	fruitMonitor();
	// 海葵绘制
	ane.draw();
	// 果实绘制
	fruit.draw();
	// 每次绘制大鱼之前先清空画布
	ctx1.clearRect(0, 0, canWidth, canHeight);
	// 大鱼绘制
	mom.draw();
	// 绘制小鱼
	baby.draw();
	// 碰撞检测
	momFruitCollision();
	momBabyCollision();
	// 分值计数
	data.draw();
	// 白圈绘制
	wave.draw();
	// 喂小鱼圈圈绘制
	halo.draw();
	// 绘制漂浮物
	dust.draw();
}
// 控制鼠标移动函数，增加判断，gameover后不能控制
function onMouseMove(e){
	if(!data.gameOver){
		if(e.offSetX || e.layerX){
			mx = e.offSetX == undefined ? e.layerX : e.offSetX;
			my = e.offSetY == undefined ? e.layerY : e.offSetY;
		}
	}
}