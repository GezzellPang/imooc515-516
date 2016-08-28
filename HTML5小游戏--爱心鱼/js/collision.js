// 碰撞检测
// 判断大鱼和果实的距离，检测大鱼是否吃到果实
function momFruitCollision(){
	if(!data.gameOver){
		for (var i = 0; i < fruit.num; i++) {
			if(fruit.alive[i]){
				//calculate length
				var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y); // 使用封装好的函数
				if(l < 900){
					//fruit eaten
					fruit.dead(i); // 果实被吃死去
					data.fruitNum ++ ;	// 吃到的果实数量增加
					mom.bigBodyCount ++ ; // 大鱼身体颜色序列帧增加
					if(mom.bigBodyCount > 7) mom.bigBodyCount = 7;
					// 如果吃到的是蓝色果实则加倍
					if(fruit.fruitType[i] === 'blue'){
						data.double = 2;	
					}
					wave.born(fruit.x[i], fruit.y[i]); // 传递果实位置参数
				}
			}
		}
	}
}

// mom baby collision
// 大鱼没吃到果实则无法救小鱼
function momBabyCollision() {
	if(data.fruitNum > 0 && !data.gameOver){ 	// 大鱼吃到果实并且没有gameover才检测碰撞
		var l = calLength2(mom.x, mom.y, baby.x, baby.y);
		if(l < 900){
			// baby recover
			baby.babyBodyCount = 0;
			// 大鱼和小鱼碰撞时，大鱼状态归零，在addScore中处理
			// data.reset();
			// 大鱼身体恢复
			mom.bigBodyCount = 0;
			// score update
			data.addScore();
			// draw halo
			halo.born(baby.x, baby.y);
		}
	}
}