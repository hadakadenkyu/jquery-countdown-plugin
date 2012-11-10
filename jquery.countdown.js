/* ----------------------------------------
jquery.countdown.js 1.1.0
グリグリカウントダウン＆アップさせるjQueryプラグイン

Note:jQuery(selector)の中身が数字ではない場合は無視。
Use:カウンターが回ってる感を出したい時
Required: jQuery
Usage:

// Count Up
jQuery(selector).countUp(val,duration,fps);

// Count Down
jQuery(selector).countDown(val,duration,fps);

※fpsは省略すると12
---------------------------------------- */

jQuery.fn.extend({
	countUp: function(val,duration,fps) {
		val = (typeof(val)==='number')?val:0;
		fps = (typeof(fps)==='number')?~~(fps):12;
		fps = (fps>1)?fps:1;
		duration = (typeof(duration)==='number')?duration:1000;
		var interval = 1000/fps;
		var elem = $(this).eq(0).get(0);
		var n = Number(elem.innerHTML);
		var dfd = $.Deferred();
		// 中身が数字じゃなかったら抜ける
		if(n===NaN||val==0){
			dfd.resolve();
		} else {
			var timeOut;
			var c = 0;
			var cmax = Math.ceil(duration/interval);
			var dif = ~~(val/cmax);
			var absDif =Math.abs(dif);
			var loop = function(){
				if(c++ >= cmax){
					elem.innerHTML=n+val;
					dfd.resolve();
				} else {
					var res = String(n+=dif);
					// 一度に10以上変わるとき、一桁目の数字はバラバラにしてしまう。
					if(absDif>=10){
						var len = res.length;
						res = res.substr(0,len-1) + String(~~(Math.random()*9));
					}
					elem.innerHTML=res;
					setTimeout(loop,interval);
				}
			}
			loop();
		}
		return dfd.promise();
	},
	countDown: function(val,duration,fps) {
		return this.countUp(-1*val,duration,fps);
	}
});