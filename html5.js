var canvas=document.getElementById('canvas');
var context=canvas.getContext('2d');

canvas.height=1136;
canvas.width=640;


var rect=new CreateRect();
var rectArray=new Array();
var ball=new CreateBall();
ball.getTrueLocation();//启动游戏前一定要运行， 不然redX没有默认值
var ctrl=new Controller();
var fps=new Fps();
var ani=new Animitation();
var test=new ImpactTest();

//生成矩形数组
	function createRectArray(){
		rectArray[ani.i]=new CreateRect();
		rectArray[ani.i].makeItSpecial();
		// alert(rectArray[ani.i].ceshi);
		// alert(rectArray[ani.i].hasOwnProperty('ceshi'));
		rectArray[ani.i].ceshi='xinceshi';
		// alert(rectArray[ani.i].hasOwnProperty('x'));
		ani.i++;
		if (ani.i>=5){//设定方块数量的上限
			ani.i=0;
		}
	}
//---------------

	canvas.addEventListener('mousedown',ctrl.eventHandler);
	canvas.addEventListener('touchstart',ctrl.eventHandler);
	canvas.addEventListener('mouseup',function(e){
		e.preventDefault();
		ball.rotate=false;
	});
		canvas.addEventListener('touchend',function(e){
		e.preventDefault();
		ball.rotate=false;
	});

	window.requestNextAnimationFrame(ani.playAnimitation);
/*

var Animal=function(){
	this.hhh=function(){
		alert(this.name);
	}
}
var Dog=function(){}

Dog.prototype=new Animal();

Dog.prototype.name='wang!';


var dog=new Dog();

dog.hhh();


function Foo() {
    this.value = 42;
}
Foo.prototype = {
    method: function() {}
};

function Bar() {}

// 设置Bar的prototype属性为Foo的实例对象
Bar.prototype = new Foo();
Bar.prototype.name = 'Hello World';

// 修正Bar.prototype.constructor为Bar本身
Bar.prototype.constructor = Bar;

var test = new Bar() // 创建Bar的一个新实例

alert(test.name);
*/
