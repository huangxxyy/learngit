/**
 * 存放全局常量
 */
var constants = (function () {
    var PAGE_SEIZE = 10;  //table页显示条数
    var MSG_PAGE_SIZE = 10; //聊天消息显示条数
    var LOCAL_MSG_DAY = 3; //聊天消息缓存时间天
    var NO_SELECT_TIPS = "请勾选要批量操作的项";
    var DELETE_ITEM_TIPS = "确定要删除吗？";
    var CONFIRM_TITLE_TIPS = "温馨提示";
    var OPERATE_FAILURE_TIPS = "操作失败";

    var LOAD_SUCCESS_TIPS = "加载成功";
    var LOAD_ERROR_TIPS = "加载失败";
    var UPLOAD_SUCCESS_TIPS = "上传成功";
    var UPLOAD_ERROR_TIPS = "上传失败";

    var PATH_EMOTION = '../../../static/images/faces/';
    return{
        PAGE_SEIZE: PAGE_SEIZE,
        MSG_PAGE_SIZE: MSG_PAGE_SIZE,
        LOCAL_MSG_DAY: LOCAL_MSG_DAY,
        NO_SELECT_TIPS: NO_SELECT_TIPS,
        DELETE_ITEM_TIPS: DELETE_ITEM_TIPS,
        CONFIRM_TITLE_TIPS: CONFIRM_TITLE_TIPS,
        OPERATE_FAILURE_TIPS: OPERATE_FAILURE_TIPS,

        LOAD_SUCCESS_TIPS: LOAD_SUCCESS_TIPS,
        LOAD_ERROR_TIPS: LOAD_ERROR_TIPS,
        UPLOAD_SUCCESS_TIPS: UPLOAD_SUCCESS_TIPS,
        UPLOAD_ERROR_TIPS: UPLOAD_ERROR_TIPS,

        PATH_EMOTION: PATH_EMOTION,
    }
})();
export default constants;



