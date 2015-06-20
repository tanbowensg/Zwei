var orbit={
	r:170,
	x:320,
	y:940,
	angle:0,
	color:'grey',
	drawOrbit:function(){
		context.save();
		context.strokeStyle=this.color;
		context.beginPath();
		context.arc(orbit.x,orbit.y,orbit.r,0,Math.PI*2,false);
		context.stroke();
		context.restore();
	},
}

var startInterface={
	drawTitle:function(){
		context.save();
		context.fillStyle='white';//画标题
		context.font="250px arial ";
		context.fillText('ZWEI',0,220);
		context.restore();
	},
	drawStartButton:function(){
		context.save();
		var px=320,
		py=920,
		r1=64,
		r2=62;
		b=30.32;
		a=35;
		context.beginPath();
		context.translate(px,py);
		context.arc(0,0,r1,0,Math.PI*2,false);
		context.arc(0,0,r2,0,Math.PI*2,true);
		context.moveTo(-24,30);
		context.lineTo(38,0);
		context.lineTo(-24,-30);
		context.lineTo(-24,30);
		context.fillStyle='white';
		context.fill();
		context.restore();
	},
	drawNotice:function(){
		context.save();
		context.font='30px 宋体';
		context.fillStyle='white';
		context.fillText('拖动屏幕空白处可以调整游戏界面大小',70,1106)
		context.restore();
	}
}

var Rect=function(){
	//var rect=new Object();
	this.height=60;
	this.width=315;
	this.x=0;
	this.y=0;
	this.deltaY=0;
	this.velocityY=420;
	this.color='white';
	this.viberation=0;
	this.shadowHeight=240;
	this.shadowWidth=315;
	this.shadowViberation=10;
	this.interval=null;
	this.makeItSpecial=function() {
		var rand=Math.floor(Math.random()*6+1);
		switch (rand){
			case 1:
				this.x=35;
				break;
			case 2:
				this.x=260;
				break;
			case 3:
				this.x=225;
				this.width=190;
				this.shadowWidth=190;
				this.velocityY=470;
				break;
			case 4:
				this.x=60;
				this.width=140;
				this.height=140;
				this.velocityY=350;
				this.shadowWidth=140;
				break;
			case 5:
				this.x=440;
				this.width=140;
				this.height=140;
				this.velocityY=350;
				this.shadowWidth=140;
				break;
			case 6:
				this.x=300;
				this.width=40;
				this.height=160;
				this.shadowWidth=40;
				break;

		}
		if(Math.random()>0.5){
			//this.velocityY=2*this.velocityY;
		}
	}
	this.update=function(){
		this.deltaY=(fps.elapsedTime/1000)*this.velocityY;//乘以一个随时间增长的系数增加难度
		this.y+=this.deltaY;
		this.viberation=Math.sin(this.y/30)*1;
		this.height-=this.viberation;
		this.width-=this.viberation;
		this.shadowWidth-=this.viberation;
		this.shadowHeight-=this.viberation;
		this.shadowViberation=Math.sin(this.y/30)*10;//调整阴影抖动的频率和幅度
	}
	this.drawRect=function(){
		context.save();
		context.fillStyle=this.color;
		context.fillRect(this.x,this.y,this.width,this.height);
		context.restore();
	}
	this.drawShadow=function(){
		context.save();
		gradient=context.createLinearGradient(this.x,this.y,this.x,this.y-this.shadowHeight);
		gradient.addColorStop(0,'rgba(200,200,200,0.2)');
		gradient.addColorStop(1,'rgba(200,200,200,0)');
		context.fillStyle=gradient;

		context.beginPath();
		context.moveTo(this.x,this.y+this.height);
		context.quadraticCurveTo(this.x-this.shadowViberation,this.y-this.shadowHeight/4,
			this.x,this.y-this.shadowHeight/2);
		context.quadraticCurveTo(this.x+this.shadowViberation,this.y-this.shadowHeight*3/4,
			this.x,this.y-this.shadowHeight);
		context.lineTo(this.x+this.shadowWidth,this.y-this.shadowHeight);
		context.quadraticCurveTo(this.x+this.shadowWidth-this.shadowViberation,this.y-this.shadowHeight*3/4,
			this.x+this.shadowWidth,this.y-this.shadowHeight/2);
		context.quadraticCurveTo(this.x+this.shadowWidth+this.shadowViberation,this.y-this.shadowHeight/4,
			this.x+this.shadowWidth,this.y);
		context.lineTo(this.x,this.y+this.height);

		context.fill();

		context.restore();
	}
	this.ceshi="Rect"
	//return rect;
}

var CreateRect=function(){};

CreateRect.prototype=new Rect();//继承了Rect的所有属性和方法，在调用继承的方法的时候，是不会改动原型的，
//会创造一个新的属性。如果没有自己的属性，就会从原型访问
CreateRect.prototype.constructor='CreateRect';
CreateRect.prototype.ceshi='CreateRect';

var CreateBall=function(){
	//var this = new Object();
	this.r=25;
	this.x=50;
	this.y=0;
	this.blueX=0;
	this.blueY=0;
	this.redX=0;
	this.redY=0;
	this.angle=0;
	this.deltaAngle=0;
	this.rotate=false;
	this.rotateDirection=1;
	this.timePerRound=1.1;
	this.blueBoom=new Image();
	this.blueBoom.src='blue.png';
	this.redBoom=new Image();
	this.redBoom.src='red.png';
	this.redBoomed=false;
	this.blueBoomed=false;
	this.getTrueLocation=function(){
		this.redX=Math.cos(orbit.angle)*orbit.r+orbit.x;
		this.redY=Math.sin(orbit.angle)*orbit.r+orbit.y;
		this.blueX=Math.cos(orbit.angle+Math.PI)*orbit.r+orbit.x;
		this.blueY=Math.sin(orbit.angle+Math.PI)*orbit.r+orbit.y;		
	}
	this.updateBall=function(){
		orbit.deltaAngle=(fps.elapsedTime/1000)*2*Math.PI/this.timePerRound
			*this.rotateDirection;
		orbit.angle=orbit.angle+orbit.deltaAngle;
	};
	this.drawBall=function(){
		context.save();
		context.translate(orbit.x,orbit.y);
		context.rotate(orbit.angle);
		//画红球
		if(test.boomColor!='red'){
			context.fillStyle='red';
			context.beginPath();
			context.arc(orbit.r,0,this.r,0,Math.PI*2);
			context.closePath();
			context.fill();
		}
		//画蓝球
		if(test.boomColor!='blue'){
			context.fillStyle='blue';
			context.beginPath();
			context.arc(-orbit.r,0,this.r,0,Math.PI*2);
			context.closePath();
			context.fill();
		}

		context.restore();
	};
	this.drawBoom=function(rn,color){//矩形编号和圆的颜色
		var thisx,thisy,thisimg,rx,ry,rw,rh,opacity=1;
		if(color==='red'){
			thisx=this.redX;
			thisy=this.redY;
			thisimg=this.redBoom;
		}
		else if(color==='blue'){
			thisx=this.blueX;
			thisy=this.blueY;
			thisimg=this.blueBoom;
		}
		rx=rectArray[rn].x;
		ry=rectArray[rn].y;
		rw=rectArray[rn].width;
		rh=rectArray[rn].height;
		
		context.save();
		context.beginPath();
		context.rect(rx,ry,rw,rh);
		context.clip()
		context.drawImage(thisimg,thisx-60,thisy-60,120,120)
		context.restore();
	}
	//return this;
}

var Fps=function(){
	//var fps=new Object();
	this.timer=0;
	this.boomTimer=0;
	this.lastTime=0;
	this.time=2000;
	this.this=6;
	this.elapsedTime=1000;
	this.lastUpdateTime=0;
	this.lastRectTime=0;
	this.caculateFps=function(time){
		this.time=time;
		this.elapsedTime=this.time-this.lastTime;
		this.lastTime=this.time;

		if(time-this.lastUpdateTime>1000){
			this.this=Math.floor(1000/this.elapsedTime);
			this.lastUpdateTime=this.time;
		}
	}
	this.caculateTimer=function(time){
		this.timer+=this.elapsedTime;
	}
	this.drawFps=function(){
		context.save();
		context.fillStyle="white";
		context.font="50px Arial";
		context.fillText('FPS:'+this.this,0,50);
		context.fillText('TIME:'+(this.timer/1000).toFixed(2),0,100);
		context.restore();
	}
	//return fps;
}

var Controller=function(){
	//var ctrl=new Object();
	this.order='start';
	this.location='start';
	this.x=0;
	this.y=0;
	var that=this;
	this.returnMouseLocation=function(e){
		e.preventDefault();
		//这样一来电脑，ios安卓都可以获得page的xy
		if(e.pageX){
			that.x=e.pageX;
			that.y=e.pageY;	
		}
		else{
			that.x=e.touches[0].pageX;//ios可以识别pagex,但是安卓就不行，必须要touches.pagex
			that.y=e.touches[0].pageY;	
		}
	}
	this.returnOrder=function(e){
		e.preventDefault();
		that.returnMouseLocation(e);
		if(that.location==='game'){
			if(that.x<0.5*canvas.width){
				that.order='left';
			}
			else if(that.x>=0.5*canvas.width){
				that.order='right';
			}
		}
		else if(that.location==='start'){//点击圆形三角
			if(that.x>260&&that.x<380&&that.y>860&&that.y<980){
				that.order='startToGame';
			}
		}
		else if(that.location==='end'){//点击圆形三角
			if(that.x>260&&that.x<380&&that.y>860&&that.y<980){
				ani.reset();
				that.order='startToGame';//卡可能是这里有问题，这是两个函数
			}
		}
	}
	this.eventHandler=function(e){
		e.preventDefault();
		that.returnOrder(e);
		switch(that.order){
			case 'left':
				ball.rotateDirection=-1;
				ball.rotate=true;
				break;
			case 'right':
				ball.rotateDirection=1;
				ball.rotate=true;
				break;	
			case 'startToGame':
				that.location='startToGame';
				break;
			case 'game':
				that.location='game';
				break;
		}
	}
	//return ctrl;
	}

var Animitation=function(){
	//var ani=new Object();
	this.i=0;
	this.j=0;
	this.EndText='';
	this.tip='';
	var that=this;
	this.getEndText=function(){
		if(fps.timer<=10000){
			this.EndText='弱爆啦，再试一次吧';
			this.tip='判定点只有圆心';
		}
		else if(fps.timer<=20000){
			this.EndText='还行吧，在加把劲吧';
			this.tip='所有组合都有解';
		}
		else if(fps.timer<=30000){
			this.EndText='你超越了80%的小伙伴';
			this.tip='见缝就钻不要怂';
		}
		else if(fps.timer>30000){
			this.EndText='不愧是单身20年的手速';
			this.tip='我已经无话可说';
		}

	}
	this.playStartInterface=function(time){
		context.clearRect(0,0,canvas.width,canvas.height);

		fps.caculateFps(time);

		orbit.x=0.5*canvas.width;
		orbit.y=0.5*canvas.height;

		ball.updateBall();
		ball.drawBall();
		orbit.drawOrbit();

		startInterface.drawTitle();
		startInterface.drawStartButton();
		startInterface.drawNotice();


		window.requestNextAnimationFrame(that.playAnimitation);

	}
	this.playStartToGame=function(time){
		context.clearRect(0,0,canvas.width,canvas.height);
		fps.caculateFps(time);
		context.save();
		//调整从开始到游戏的过场动画

			orbit.y=orbit.y<940?orbit.y+(fps.elapsedTime/1000)*300:940;//调整过场动画速度
			ball.drawBall();
			orbit.drawOrbit();
			ball.updateBall();
			context.restore();
			hhh=window.requestNextAnimationFrame(that.playStartToGame);

		if(orbit.y===940&&orbit.angle%(Math.PI*2)<0.1){
			orbit.angle=0;
			window.cancelAnimationFrame(hhh);
			ctrl.location='game';
			fps.timer=0;
			
			window.requestNextAnimationFrame(that.playAnimitation);
		}
		
		
	}
	this.playGame=function(time){
		context.clearRect(0,0,canvas.width,canvas.height);

		fps.caculateFps(time);
		fps.caculateTimer(time);
		fps.drawFps();

		if(fps.time-fps.lastRectTime>900){//矩形产生的频率
			fps.lastRectTime=fps.time;
			createRectArray();
		}

		if(ball.rotate===true){
			ball.updateBall();			
		}

		for (that.j=0; that.j<rectArray.length ; that.j++) {
			rectArray[that.j].update();
			rectArray[that.j].drawRect();
			rectArray[that.j].drawShadow();	
		};

		
		orbit.drawOrbit();
		ball.drawBall();

		ball.getTrueLocation();
		test.moveSystem();
		window.requestNextAnimationFrame(that.playAnimitation);
	}

	this.playBoom=function(time){
		fps.boomTimer+=fps.elapsedTime;

		window.clearInterval(rect.interval);
		
		context.clearRect(0,0,canvas.width,canvas.height);

		fps.caculateFps(time);
		fps.drawFps();

		for (var j=0; j<rectArray.length ; j++) {
			rectArray[j].drawRect();
			rectArray[j].drawShadow();	
		};

		if(ball.rotate===true){
			ball.getTrueLocation();		
		}

		orbit.drawOrbit();
		ball.drawBall();

		test.moveSystem();

		ball.drawBoom(test.boomRect,test.boomColor);

		if(fps.boomTimer>1500){
			ctrl.location='end';
			that.getEndText();
		}

		window.requestNextAnimationFrame(that.playAnimitation);
	}
	this.playEnd=function(time){
		context.clearRect(0,0,canvas.width,canvas.height);
		context.save();

		context.fillStyle="white";

		context.font="50px Arial";

		context.fillText('你坚持了'+(fps.timer/1000).toFixed(2)+'秒',145,145);
		context.fillText(that.EndText,100,220);
		context.fillText('快分享到朋友圈',150,450);
		context.fillText('比比谁手速更快~',150,520);
		context.font='30px 楷体';
		context.fillText('小提示：'+that.tip,150,700);
		context.font='15px 宋体';
		context.fillText('Copy from DUET',265,1106);

		var px=320,//画开始按钮
		py=920,
		r1=64,
		r2=62;
		b=30.32;
		a=35;
		context.beginPath();
		context.translate(px,py);
		context.arc(0,0,r1,0,Math.PI*2,false);
		context.arc(0,0,r2,0,Math.PI*2,true);
		context.moveTo(-24,30);
		context.lineTo(38,0);
		context.lineTo(-24,-30);
		context.lineTo(-24,30);

		context.fill();

		context.restore();

		window.requestNextAnimationFrame(that.playAnimitation);
	}
	this.playAnimitation=function(time){

		switch(ctrl.location){
			case 'start':
				that.playStartInterface(time);
				break;
			case 'startToGame':
				that.playStartToGame(time);
				break;
			case 'game':
				that.playGame(time);
				break;
			case 'boom':
				that.playBoom(time);
				break;
			case 'end':
				document.title=('测试你是不是手残的时候到了，我坚持了'+(fps.timer/1000).toFixed(2)+'秒！');
				that.playEnd(time);
				break;
		}
	}
	this.reset=function(time){
		rectArray=new Array();//重置游戏
		that.i=0;
		that.j=0;
		fps.boomTimer=0;
		fps.timer=0;
		orbit.angle=0;
		test.boomColor=null;
		ball.redX=0;
		ball.redY=0;
		ball.blueX=0;
		ball.blueY=0;
	}
	//return ani;
}

var ImpactTest=function () {
	//var test=new Object();
	this.boomColor=null;
	this.boomRect=null;
	this.moveSystem=function (){
		var offsetX,offsetY;
		for (var k = 0 ; k <= rectArray.length-1; k++) {
			offsetY=rectArray[k].y+0.5*rectArray[k].height;
			offsetX=rectArray[k].x+0.5*rectArray[k].width;
			ball.ballRRelativeX=ball.redX-offsetX;
			ball.ballRRelativeY=ball.redY-offsetY;
			ball.ballBRelativeX=ball.blueX-offsetX;
			ball.ballBRelativeY=ball.blueY-offsetY;
			this.impactTest(ball.ballRRelativeX,ball.ballRRelativeY,rectArray[k].width,'red',k);
			this.impactTest(ball.ballBRelativeX,ball.ballBRelativeY,rectArray[k].width,'blue',k);
		}
	}
	this.impactTest=function(x,y,width,color,k){
		x=Math.abs(x);
		y=Math.abs(y);
		var result;

	//下面不能用switch,只能用if
		if(x<0.5*width){//这里为了降低难度，碰撞判定只有圆心
			result=0.5*rect.height;
		}
		//else if(x>0.5*.width&&x<.width+ball.r){
		//	result=Math.sqrt(ball.r*ball.r-(x-0.5*.width)*(x-0.5*.width))+0.5*.height;
	//	}
		else if(x>0.5*width){
			result=0;
		}
		if(y<result){
			ctrl.location='boom';
			this.boomColor=color;
			this.boomRect=k;
		}
	}
	//return test;
}
