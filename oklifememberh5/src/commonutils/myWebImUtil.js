/**
 * Created by hh on 2017/7/26.
 */
var myWebImUtil = (function () {

    // var getQuestionListUrL = __loginserverUrl__ + 'third/im/listQuestionTask';
    // var getQuestionUrl = __loginserverUrl__ + 'third/im/getQuestion';
    // var getMemberListUrl = __serverUrl__ + '/member/list';
    // var getMemberUrl = __serverUrl__ + 'member/get';
    // var getMsgUrl = __loginserverUrl__ + 'third/im/listMsg';

    /**
     * 获取本地时间时间戳
     * @returns {number}
     */
    function getSendTime(){
        return 	Math.round(new Date().getTime()/1000);
    }

    /**
     * 获取uuid
     */
    function uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }

    /**
    * 清除localStorage过期数据
    */
    function clearOutTimeData(item, day){
    	var msgList = JSON.parse(localStorage.getItem(item));
    	if( null == msgList || msgList.length == 0){
    		return;
    	}
    	var curTime = getSendTime();
    	for(var i = 0; i < msgList.length; i++){
    		var time = msgList[i].msgTime;
    		var timeDiffer = (curTime - time)/(3600*24)
    		if( timeDiffer >= day){
    			msgList.splice(i, 1);//删除过期数据
    		}
    	}
    	localStorage.setItem(item, JSON.stringify(msgList));//重新设置缓存
    }

    /**
     * 判断数组是否包含某个对象
     * @param arr
     * @param obj
     * @returns {boolean}
     */
    function contains(arr, obj) {
        for( var i=0; i < arr.length; i++){
            if(typeof(arr[i]['member'].id) !== "undefined" && arr[i]['member'].id === obj){
                return true;
            }
        }
        return false;
    }

    /**
     * 返回两个数组的差集
     * @param a
     * @param b
     * @returns array
     */
    function minus(arr1, arr2){
        var len = arr1.length;
        var arr = [];
        while (len--) {
            if (arr2.indexOf(arr1[len]) < 0) {
                arr.push(arr1[len]);
            }
        }
        return arr;
    }

    /**
     *格式化特殊字符
     */
    function encode(str) {
        if (!str || str.length === 0) return "";
        var s = '';
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/<(?=[^o][^)])/g, "&lt;");
        s = s.replace(/>/g, "&gt;");
        //s = s.replace(/\'/g, "&#39;");
        s = s.replace(/\"/g, "&quot;");
        s = s.replace(/\n/g, "<br>");
        return s;
    }

    /**
     *  显示大图片弹出层
     * @param imgSrc
     * @param t
     */
    function showBigImgLayer(id){
        layer.ready(function () {
            layer.closeAll('photos');
            layer.photos({
                photos: '#'+id,
                closeBtn: 2,
                anim: 0 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
            });
        });
    }

    return {
        // getQuestionListUrL: getQuestionListUrL,
        // getQuestionUrl: getQuestionUrl,
        // getMemberListUrl: getMemberListUrl,
        // getMemberUrl: getMemberUrl,
        // getMsgUrl: getMsgUrl,
        getSendTime: getSendTime,
        contains: contains,
        minus: minus,
        showBigImgLayer: showBigImgLayer,
        encode: encode,
        uuid: uuid,
        clearOutTimeData: clearOutTimeData
    }
})();

export default myWebImUtil;
