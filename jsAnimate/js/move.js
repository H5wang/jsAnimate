window.onload = function(){
    //var mDiv = document.getElementById('movebox');
    var mDiv = document.getElementsByClassName('movebox');
    for (var i = 0; i < mDiv.length; i++) {
        mDiv[i].onmouseover = function() {
            startMove(this,{left:0,opacity:1});
        }
        mDiv[i].onmouseout = function(){
            startMove(this,{left:-200,opacity:0.3});
        }
    }
}

//获取样式
//用法： parseInt(getStyle(obj,attr));
function getStyle(obj,attr){
    if (obj.currentStyle) {
        return obj.currentStyle[attr];//针对IE
    }else{
        return getComputedStyle(obj,false)[attr];//针对firefox
    }
}
//移入移出
function startMove(obj,json,fn){
    var flag = true;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        for(var attr in json){
            //获取初始属性值
            var moveX = 0,
                speed = 0;
            if (attr == 'opacity') {
                moveX = Math.round(parseFloat(getStyle(obj,attr))*100);
                iTarget = json[attr]*100;
            }else{
                moveX = parseInt(getStyle(obj,attr));
                iTarget = json[attr];
            }
            //计算速度
            speed = (iTarget - moveX)/10;
            speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);

            //检测停止
            if (moveX != iTarget) {
                flag = false;
                //缓冲动画
                if (attr == 'opacity') {
                    obj.style.filter = 'alpha(opacity:'+ (moveX+speed) +')';
                    obj.style[attr] = (moveX + speed)/100;
                }else{
                    obj.style[attr] = moveX + speed + 'px';
                }
            }
            //判断并清除
            if (flag) {
                clearInterval(obj.timer);
                //此处加链式动画
                if (fn) {
                    fn();
                }
            }
        }//for循环结束
    },50);

}
