var WebIM = {};
WebIM.config = {
    /*
     The global value set for xmpp server
     */
    xmppURL: 'im-api.easemob.com',
    /*
     The global value set for Easemob backend REST API
     "http://a1.easemob.com"
*/
    apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com',    // rest api地址
    /*
     连接时提供appkey
     */
    // appkey: "easemob-demo#chatdemoui",
    appkey:"1144170628115832#oklifemember",
    // appkey: "z157794218#testoklife",换成在环信注册的appkey；
    /*
     * 是否使用https
     */
    https: location.protocol === 'https:' ? 'https:' : 'http:',
    /*
     * 是否使用多resource
     */
    isMultiLoginSessions: true,              // 是否开启多页面同步收消息(多页面同时登陆一个账号)

    isAutoLogin: true                         // 自动上线，（如设置为false，则表示离线，无法收消息）
}
