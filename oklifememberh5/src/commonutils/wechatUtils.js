/**
 * Created by hh on 2017/8/1.
 */
import { Toast } from 'mint-ui'


const wechatUtils = (function () {
  /**
   * Created by hh on 2017/8/1.
   * 拍照或从手机相册中选图接口
   * callback上传成功后的回调函数
   */
  function wxChooseImage (callback, count, wx) {
    wx.chooseImage({
      count: count,//最多支持一次选9张
      needResult: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (data) {
        let localIds = data.localIds // 返回选定照片的本地ID列表数组，localId可以作为img标签的src属性显示图片
        console.log(localIds)
        if (localIds.length) {
          for (var i = 0, len = localIds.length; i < len; i++) {
            wxuploadImage(localIds[i], callback, wx)
          }
        }
      },
      fail: function (res) {
        Toast("图片选择失败")
      }
    })
  }

  /**
   * Created by hh on 2017/8/1.
   * 聊天界面从手机相册中选图接口
   * callback上传成功后的回调函数
   */
  function wxChooseImageByAlbum (callback, count, wx) {//聊天界面中通过微信相册选择照片
    wx.chooseImage({
      count: count,//最多支持一次选9张
      needResult: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (data) {
        let localIds = data.localIds // 返回选定照片的本地ID列表数组，localId可以作为img标签的src属性显示图片
        console.log(localIds)
        if (localIds.length) {
          for (var i = 0, len = localIds.length; i < len; i++) {
            wxuploadImage(localIds[i], callback, wx)
          }
        }
      },
      fail: function (res) {
        Toast("图片选择失败")
      }
    })
  }

  /**
   * Created by hh on 2017/8/1.
   * 拍照接口
   * callback上传成功后的回调函数
   */
  function wxChooseImageByCamera (callback, count, wx) {//聊天界面中通过照相选择照片
    wx.chooseImage({
      count: count,//最多支持一次选9张
      needResult: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album','camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (data) {
        let localIds = data.localIds // 返回选定照片的本地ID列表数组，localId可以作为img标签的src属性显示图片
        console.log(localIds)
        if (localIds.length) {
          for (var i = 0, len = localIds.length; i < len; i++) {
            wxuploadImage(localIds[i], callback, wx)
          }
        }
      },
      fail: function (res) {
        Toast("图片选择失败")
      }
    })
  }

  /**
   * Created by hh on 2017/8/1.
   * 上传图片到wx
   * localId本地图片ID
   * callback上传成功后的回调函数
   */
  function wxuploadImage (localId, callback, wx) {
    wx.uploadImage({
      localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success: function (res) {
        let mediaId = res.serverId // 返回图片的服务器端ID
        console.log(mediaId)
        if (mediaId) {
          callback(mediaId, localId)
        }
      },
      fail: function (error) {
        Toast("图片上传失败")
      }
    })
  }

  /**
   * Created by hh on 2017/8/1.
   * 从微信下载图片到本地
   * mediaId是微信的mediaId
   * callback上传成功后的回调函数
   */
  function wxdownloadImage (mediaId, callback, wx) {
    wx.downloadImage({
      serverId: mediaId, // 需要下载的图片的微信服务器的ID
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success: function (res) {
        let localId  = res.serverId // 返回图片的服务器端ID
        console.log(localId )
        if (localId ) {
          callback(mediaId, localId)
        }
      },
      fail: function (error) {
        Toast("图片下载失败")
      }
    })
  }


  /**
   * Created by hh on 2017/8/13.
   * 开始录音接口
   * callback上传成功后的回调函数
   */
  function wxStartRecord (wx) {
    wx.startRecord({
      success: function(){
        localStorage.oklifeuser_rainAllowRecord = 'true';
      },
      cancel: function () {
        Toast('您拒绝授权录音');
      }
    })
  }


  /**
   * Created by hh on 2017/8/13.
   * 停止录音接口
   * callback上传成功后的回调函数
   */
  function wxStopRecord (callback,wx) {
    wx.stopRecord({
      success: function (res) {
        let localId = res.localId;
        wxuploadVoice(localId,callback,wx)
      }
    })
  }


  /**
   * Created by hh on 2017/8/1.
   * 上传音频到wx
   * localId本地音频ID
   * callback上传成功后的回调函数
   */
  function wxuploadVoice (localId, callback, wx) {
    wx.uploadVoice({
      localId: localId, // 需要上传的音频本地ID，由wxStartRecord接口获得
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success: function (res) {
        let mediaId = res.serverId // 返回图片的服务器端ID
        console.log(mediaId)
        if (mediaId) {
          callback(mediaId, localId)
        }
      },
      fail: function (error) {
        Toast("音频上传失败")
      }
    })
  }




  /**
   * Created by hh on 2017/8/1.
   * wx设置title
   *
   */
  function setWechatTItle(title) {
    document.title = title
    var mobile = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(mobile)) {
      var iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      // 替换成站标favicon路径或者任意存在的较小的图片即可
      iframe.setAttribute('src', './favicon.png')
      var iframeCallback = function () {
        setTimeout(function () {
          iframe.removeEventListener('load', iframeCallback)
          document.body.removeChild(iframe)
        }, 0)
      }
      iframe.addEventListener('load', iframeCallback)
      document.body.appendChild(iframe)
    }
  }

  return {
    wxChooseImage: wxChooseImage,
    wxChooseImageByAlbum:wxChooseImageByAlbum,
    wxChooseImageByCamera:wxChooseImageByCamera,
    wxuploadImage: wxuploadImage,
    wxdownloadImage:wxdownloadImage,

    wxStartRecord:wxStartRecord,
    wxStopRecord:wxStopRecord,
    wxuploadVoice:wxuploadVoice,

    setWechatTItle:setWechatTItle,

  }
})()

export default wechatUtils
