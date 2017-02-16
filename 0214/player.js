		(function(){
			//创建播放器的构造函数
			function Player(url){
				//定义audioContetx
				this.audioContext = new AudioContext();
				//创建资源缓冲区对象
				this.bufferSource = this.audioContext.createBufferSource();
				//创建频谱分析仪对象
				this.analyser = this.audioContext.createAnalyser();
				//获取canvas
				this.canvasContext = document.getElementById("canvas").getContext("2d");
				this.playInit(url);
				
			}
			//画频谱分析
			Player.prototype.draw = function() {
				var this_= this;
				var Width = document.getElementById("canvas").width,
					Height = document.getElementById("canvas").height;
				var array = this.loadAnalyserArray();
				//console.log(array);
				this.canvasContext.clearRect(0,0,Width,Height);
				var itemWidth = 4;//设置音频条宽度；
				var itemSpace = 3;//设置间隔
				
				var canDrawNum = Width/(itemWidth + itemSpace);//计数条个数
				var step = parseInt(array.length/canDrawNum);//音频数组取值步长
				for (var i = 0; i < canDrawNum; i++) {				
					var itemHeight = array[i*step]/3;
					this.canvasContext.fillStyle = "rgb("+"175,"+array[i*step]+",50"+")";
					this.canvasContext.fillRect((itemSpace+itemWidth)*i,Height-itemHeight,itemWidth,itemHeight);
				}
				if(this.audioContext.state != "suspended"){
					setTimeout(function(){
						this_.draw();
					},100)
				}else {
					clearTimeout(0);
				}
			}
			//创建频谱分析数组
			Player.prototype.loadAnalyserArray = function(){
				this.analyser.fftSize = 1024;
				var array = new Uint8Array(this.analyser.frequencyBinCount);
				this.analyser.getByteTimeDomainData(array);
				return array;
			}
			//添加一份加载播放器的方法
			Player.prototype.loadAudio = function (url,callback){
				var request = new XMLHttpRequest();
				request.responseType = "arraybuffer";
				request.open("GET",url);
				request.onload = function(){
					if (callback) {
						callback(request.response);
					}
				}
				request.send();
			}
			//初始化函数
			Player.prototype.playInit = function (url) {
				var this_ = this;
				this.loadAudio(url,function(arrayBuffer){
					this_.audioContext.decodeAudioData(arrayBuffer,function(buffer){
						this_.bufferSource.buffer = buffer;
						//this_.bufferSource.connect(this_.audioContext.destination);
						this_.bufferSource.connect(this_.analyser);
						this_.analyser.connect(this_.audioContext.destination);
					})
				});
			}
			Player.prototype.play = function () {
				if (this.audioContext.state != "suspended") {
					this.bufferSource.start();			
				}else{
					this.audioContext.resume();
				}
				this.draw();
			}
			Player.prototype.pause = function () {
				this.audioContext.suspend();
			}
			//挂载到window下
			window.Player = Player;
		})()