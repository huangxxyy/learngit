/**************************************************************
 @author huanghuang
 @date: 2017-03-04
 @description 通用方法export default common;
 ******************************************************************/

var config = {
    "isDebug": false,
    "islocal": true,
    "localTimeOut": "30",
    "timeOut": "3000" // 请求超时
};

var common = (function () {

    /**
     *
     * @描述：获取sessionStorage信息，session级别缓存
     * @作者：huanghuang
     * @版本: 1.0
     * @创建时间: 2017-3-5
     * @param key 设置的key,
     * @returns value值
     */
    function getSStorageInfo(key) {
        try {
            var keys = "";
            var value = sessionStorage.getItem(keys);
            if (isEmpty(value)) {
                value = sessionStorage.getItem(key);
            }
            return value ? value : null;
        }
        catch (e) {
            alert("您的浏览器版本太低，或者您开启了隐身/无痕浏览模式，或者WebView组件不支持sessionStorage！");
        }
    }


    /**
     *
     * @描述：保存sessionStorage信息，session级别缓存
     * @作者：huanghuang
     * @版本: 1.0
     * @创建时间: 2015-3-27
     * @param key 设置的key
     * @param value 设置的值
     */
    function setSStorageInfo(key, value) {
        try {
            sessionStorage.setItem(key, value);
        }
        catch (e) {
            alert("您的浏览器版本太低，或者您开启了隐身/无痕浏览模式，或者WebView组件不支持sessionStorage！");
        }
    }

    /**
     *
     * @描述：清除sessionStorage中的数据，这里分3种情况：
     * 1、如果不传key，则清除所有的sessionStorage数据
     * 2、如果key为字符串变量，则清除key对应的sessionStorage数据
     * 3、如果key为Boolean类型变量true，则清除所有的sessionStorage数据（支持多模块）
     * @作者：huanghuang
     * @版本: 1.0
     * @创建时间: 2016-3-27
     * @param key 设置的key
     */
    function clearSStorage(key) {
        try {
            if (key === true) {
                sessionStorage.clear();
            }
            else {
                if (key) {
                    sessionStorage.removeItem(key);
                }
                else {
                    for (var pkey in sessionStorage) {
                        sessionStorage.removeItem(pkey);
                    }
                }
            }
        }
        catch (e) {
            alert("您的浏览器版本太低，或者您开启了隐身/无痕浏览模式，或者WebView组件不支持sessionStorage！");
        }
    }
//----------------------------------------------------------
//    功能：根据身份证号获得出生日期1987-03-28
//    参数：身份证号 idCard
//    返回值：
//    出生日期
//----------------------------------------------------------
    function getBirthdayByIdCard(idCard){
        var birthdayno,birthdaytemp;
        if(idCard.length==18){
            birthdayno=idCard.substring(6,14)
        }else if(idCard.length==15){
            birthdaytemp=idCard.substring(6,12);
            birthdayno="19"+birthdaytemp
        }else{
            alert("错误的身份证号码，请核对！");
            return false
        }
        var birthday=birthdayno.substring(0,4)+"-"+birthdayno.substring(4,6)+"-"+birthdayno.substring(6,8);
        return birthday
    }



//----------------------------------------------------------
//    功能：根据身份证号获得性别
//    参数：身份证号 idCard
//    返回值：1男性，2女性
//    性别
//----------------------------------------------------------
    function getsexByIdCard(idCard){
        var sexno,sex;
        if(idCard.length==18){
            sexno=idCard.substring(16,17)
        }else if(idCard.length==15){
            sexno=idCard.substring(14,15)
        }else{
            alert("错误的身份证号码，请核对！");
            return false
        }
        var tempid=sexno%2;
        if(tempid==0){
            sex=1
        }else{
            sex=2
        }
        return sex
    }


    /**
     * 获取url ? 之后的参数
     * @returns {Object}
     */
    function getRequest() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }


    /**
     * 传入字符串url，获取?之后的参数
     * @returns {Object}
     */
    function getRequestByUrl(url) {
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.split('?')[1];
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }

    /**
     * 往history中压入#连接
     */
    function pushHistory() {
        var state = {
            title: "title",
            url: "#"
        };
        window.history.pushState(state, "title", "#");
    }

    /**
     * 获取时间戳
     * @time 日期字符串；'1987-03-28'，'1987/03/28'
     * @returns {string}
     */
    function getTimeStamp(time) {//注意后台给我们的时间戳是秒为单位，所以要乘以1000，转换成毫秒
        if (time == '' || time == null || time == undefined){
            time=new Date();
        }else {
            time = new Date(time);
        }
        var timeStr = Math.round(time.getTime() / 1000);
        var timestamp = timeStr.toString();//一定要转换字符串
        return timestamp;
    }


    /**author:huanghuang *day:2017-03-15
     * 将时间戳转换成yyyy-MM-dd hh：ii:ss,注意后台给我们的时间戳是秒为单位，所以要乘以1000，转换成毫秒
     * @param   value  时间戳的字符串
     * @param bool true带时分秒，false不带时分秒,为string
     */
    function getDate(value, bool) {
        //要附带时分秒
        var d = new Date(Number(value * 1000));
        var day = [d.getFullYear(), (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1), d.getDate() < 10 ? '0' + d.getDate() : d.getDate()].join('-');
        var timer = [d.getHours(), d.getMinutes(), d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()].join(':');
        bool = bool || 'true';
        var getdate = (bool === 'true') ? day + ' ' + timer : day;
        return getdate;
    }


    /**
     * JSON转成字符串
     * @param jsonData
     * @returns {string}
     */
    function jsonToString(jsonData) {
        if (isNotEmpty(jsonData)) {
            return JSON.stringify(jsonData);
        }
        return "";
    }

    /**
     * 字符串转成JSON
     * @param strData
     * @returns {*}
     */
    function stringToJson(strData) {
        if (isNotEmpty(strData)) {
            var str = '(' + strData + ')'; //json字符串
            return eval(str);
        }
        return "";
    }

    /**
     * 判断参数是否不为空
     * @param param
     * @returns {boolean}
     */
    function isNotEmpty(param) {
        if (param == null || param == undefined || typeof(param) == "undefined" || param == "" || param == "undefined" || param == "null") {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 判断参数是否为空
     * @param param
     * @returns {boolean}
     */
    function isEmpty(param) {
        if (param == null || param == undefined || typeof(param) == "undefined" || param == "" || param == "undefined" || param == "null") {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 保存数据到本地缓存
     * @param key
     * @param value
     */
    function setLStorageInfo(key, value) {
        if (config.islocal) {
            var timestamp = getTimeStamp();//存储的时间戳
            var storageinfo = {
                "timestamp": timestamp,
                key: value
            };
            var infotxt = jsonToString(storageinfo);
            try {
                localStorage.setItem(key, infotxt);
            } catch (e) {
                alert("您的浏览器版本太低，或者您开启了隐身/无痕浏览模式，或者WebView组件不支持localStorage！");
            }
        } else {
            if (config.isDebug) {
                alert("未开启离线缓存模式，不支持localStorage缓存！");
            }
        }
    }

    /**
     * 获取本地缓存，如果缓存超时，清除本地缓存
     * @param key
     * @returns {*}
     */
    function getLStorageInfo(key) {
        if (config.islocal) {
            var timestamp1 = getTimeStamp();//存储的时间戳
            var timeout = config.localTimeOut;//离线缓存数据超时时间(分钟为单位)
            var value = null;
            try {
                value = localStorage.getItem(key);
            } catch (e) {
                alert("您的浏览器版本太低，或者您开启了隐身/无痕浏览模式，或者WebView组件不支持localStorage！");
            }
            var storageinfo = stringToJson(value);//转换成json对象
            var timestamp2 = storageinfo.timestamp;//获取时间戳
            var time = (timestamp1 - timestamp2) / 1000 / 60;
            var keyValue = storageinfo.key;//获取数据
            if (time > timeout) {
                clearLStorage(key);//清理本地离线缓存数据
                if (config.isDebug) {
                    alert(key + "【离线缓存已经超时" + Math.round(time - timeout) + "分钟,已经被清理！】");
                }
                return null;
            }
            else {
                keyValue = keyValue ? keyValue : null
                if (config.isDebug && isNotEmpty(keyValue)) {
                    alert("获得离线缓存数据" + key + "=" + keyValue + "【数据将在" + Math.round(timeout - time) + "分钟后失效！】");
                }
                return keyValue;
            }
        }
        else {
            if (config.isDebug) {
                alert("未开启离线缓存模式，不支持localStorage缓存！");
            }
        }
    }

    /**
     * 清除本地缓存
     * @param key
     */
    function clearLStorage(key) {
        try {
            if (config.islocal) {
                if (key === true) {
                    localStorage.clear();
                }
                else {
                    if (key) {
                        localStorage.removeItem(key);
                    }
                    else {
                        for (var pkey in localStorage) {
                            localStorage.removeItem(pkey);
                        }
                    }
                }
            } else {
                if (config.isDebug) {
                    alert("未开启离线缓存模式，不支持localStorage缓存！");
                }
            }
        }
        catch (e) {
            alert("您的浏览器版本太低，或者您开启了隐身/无痕浏览模式，或者WebView组件不支持localStorage！");
        }
    }


    /**
     *上传资源到七牛服务器
     * @param type是上传的资源种类
     * @param callback是上传成功后并从后台请求到fileURL后的回调函数,拿到fileid，以便于后续处理
     * @param是文件资源的信息需要渲染时的回调函数
     * **/
    function uploadMedia(e, type, callback,index,widthHeight) {//上传本地媒体资源到服务器上
        //type是上传的资源种类1图片，2视频，3音频,4PDF,5APK,99文件；callback是上传成功后并从后台请求到fileURL后的回调函数,拿到fileid，以便于后续处理是文件资源的信息需要渲染时的回调函数
        // domain 为七牛空间（bucket)对应的域名，选择某个空间后，可通过"空间设置->基本设置->域名设置"查看获取
        var key='';
        var layerIndex;
        var uploader = new QiniuJsSDK().uploader({//每次初始化的时候，都new QiniuJsSDK()，以达到不同的七牛sdk
            runtimes: 'html5,flash,html4',   //上传模式,依次退化
            browse_button:'pickfiles'+index,       //上传选择的点选按钮，**必需**
            // uptoken: getSStorageInfo("uptoken"), //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
            // uptoken_url:__webappserverUrl__ + "/third/file/getUploadToken",
            uptoken_func: function (file) {    // 在需要获取 uptoken 时，该方法会被调用
                // do something
                var uptoken = "";
                var domain = "";
                var getUploadToken = {};
                var url =  "third/file/getUploadToken";//需要改成项目中的实际url
                $.ajax({
                    url: url,
                    type: 'post',
                    data: JSON.stringify(getUploadToken),
                    dataType: 'json',
                    timeout: config.timeOut,
                    async: false,//同步
                    contentType: 'application/json',
                    success: function (data) {
                        if (data.code == 0) {
                            var result = data.body;
                            console.log(result);
                            key = result.key;
                            var audioDomain = result.audioDomain;
                            var audioUpToken = result.audioUpToken;
                            var imgDomain = result.imgDomain;
                            var imgUpToken = result.imgUpToken;
                            var videoDomain = result.videoDomain;
                            var videoUpToken = result.videoUpToken;
                            setSStorageInfo("qiniuKey"+key, key);
                            switch (type) {
                                case 1:
                                    uptoken = imgUpToken;
                                    domain = imgDomain;
                                    break;
                                case 2:
                                    uptoken = audioUpToken;
                                    domain = audioDomain;
                                    break;
                                case 3:
                                    uptoken = videoUpToken;
                                    domain = videoDomain;
                                    break;
                            }
                            setSStorageInfo("domain"+key, domain);
                            setSStorageInfo("uptoken"+key, uptoken);
                        } else {
                            config.isDebug && console.log("获取上传凭证失败1");
                        }
                    },
                    error: function () {
                        config.isDebug && console.log("获取上传凭证失败2");
                    }
                });
                config.isDebug && console.log({'key':key,'uptoken':uptoken});
                return uptoken;
            },
            // filters: {
            //     mime_types: [
            //         {title: "图片文件", extensions: "jpg,jpeg,gif,png"}, // 限定jpg,gif,png后缀上传
            //         {title: "视频文件", extensions: "mp4,avi,mov,rvmb"}, // 限定jpg,gif,png后缀上传
            //         // {title: "其它文件", extensions: "apk"}               //其它
            //     ]
            // },
            unique_names: false, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
            save_key: false,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
            domain: "oc4yq4v74.bkt.clouddn.com",
            // domain: getSStorageInfo("domain"),   //bucket 域名，下载资源时用到，**必需**
            get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
            container: 'container',           //上传区域DOM ID，默认是browser_button的父元素，
            max_file_size: '100mb',           //最大文件体积限制
//        flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
            max_retries: 3,                   //上传失败最大重试次数
            dragdrop: true,                   //开启可拖曳上传
            drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
            chunk_size: '4mb',                //分块上传时，每片的体积
            multi_selection: false, //         设置一次只能选择一个文件,ture设置可上传多张，false设置传一张
            auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
            init: {
                'FilesAdded': function (up, files) {
                    plupload.each(files, function (file) {
                        // 文件添加进队列后,处理相关的事情
                    });
                },
                'BeforeUpload': function (up, file) {
                    // 每个文件上传前,处理相关的事情
                    layerIndex = layer.load(1, {
                        shade: [0.1, '#000'],
                        title: ['正在上传，请稍等...',true]
                    });
                },
                'UploadProgress': function (up, file) {
                    // 每个文件上传时,处理相关的事情
                },
                'FileUploaded': function (up, file, info) {
                    // 每个文件上传成功后,处理相关的事情
                    // 其中 info 是文件上传成功后，服务端返回的json，形式如
                    // {
                    //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                    //    "key": "gogopher.jpg"
                    if (document.querySelector('.pic')) {
                        let testImgSrc=file.getNative();
                        let temUrl=window.URL.createObjectURL(testImgSrc);
                        let objImg = document.querySelector('.pic');
                        objImg.src = temUrl;
                        setTimeout(()=>{
                            console.log(objImg.naturalWidth);
                            console.log(objImg.naturalHeight);
                            layer.close(layerIndex);
                            if (widthHeight.width!=objImg.naturalWidth||widthHeight.height!=objImg.naturalHeight) {
                                console.log('图片尺寸不符');
                                //layer.msg('图片尺寸不符', {time: 500});
                                return
                            }else{
                                console.log('图片尺寸符合');
                            }
                            getMediaUrl(e,type,callback,index,key,file);
                            config.isDebug && console.log('上传成功');
                        },100);
                    }else{
                        //layer.close(layerIndex);
                        getMediaUrl(e,type,callback,index,key,file);
                        config.isDebug && console.log('上传成功');
                    }
                },
                'Error': function (up, err, errTip) {
                    //上传出错时,处理相关的事情
                    config.isDebug && console.log("上传失败！");
                },
                'UploadComplete': function () {
                    //队列文件处理完毕后,处理相关的事情
                },
                'Key': function (up, file) {
                    // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                    // 该配置必须要在 unique_names: false , save_key: false 时才生效
                    var newkey = "";
                    // do something with key here
                    newkey = getSStorageInfo("qiniuKey"+key);
                    return newkey
                }
            }
        });
    }

    //从服务器上获取上传后的媒体资源Url，需要对应的key
    function getMediaUrl(e,type,callback,index,key,file) {
        var getMediaUrlParams = {
            "type": type,
            "key": key,
            "token":token
        };
        config.isDebug && console.log(getMediaUrlParams);
        var url = __webappserverUrl__ + "third/file/getFileUrl";
        e.$http.post(url, getMediaUrlParams).then(function (response) {
            var body = response.body;
            config.isDebug && console.log(JSON.stringify(body));
            if (body.code == 0) {
                var result = body.body;
                var fileURL = result.url;
                var fileId = result.id;
                setSStorageInfo("fileId"+key, fileId);
                //callback从服务器请求成功fileURL/fileId后的回调函数
                callback(e,fileURL,fileId,index,file);
            } else {
                config.isDebug && console.log("请求图片fileurl失败");
            }
        }, function (response) {
            config.isDebug && console.log(JSON.stringify(response));
        });
    }


    /**author:CaoAnlong *day: 2017-06-12
     *去掉字符串前后的所有空格
     *@param str 传入的字符串
    */
    function Trim(str){
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

    return {
        version: "1.0",
        getSStorageInfo: getSStorageInfo,
        setSStorageInfo: setSStorageInfo,
        clearSStorage: clearSStorage,
        getBirthdayByIdCard:getBirthdayByIdCard,
        getsexByIdCard:getsexByIdCard,
        getRequest: getRequest,
        getRequestByUrl:getRequestByUrl,
        getTimeStamp: getTimeStamp,
        getDate: getDate,
        pushHistory: pushHistory,
        isNotEmpty: isNotEmpty,
        isEmpty: isEmpty,
        jsonToString: jsonToString,
        stringToJson: stringToJson,
        setLStorageInfo: setLStorageInfo,
        getLStorageInfo: getLStorageInfo,
        clearLStorage: clearLStorage,
        uploadMedia: uploadMedia,
        getMediaUrl: getMediaUrl,
        Trim: Trim,
    };
})();
export default common;
