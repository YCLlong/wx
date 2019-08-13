Page({
    data: {
        existCert: false,
        certInfo: {}
    },
    onLoad(query) {
        var app = getApp();
        if(app.existCert){
            this.setData({
                existCert: true,
                certInfo: app.certInfo
            });
        }
    },
    /**
     * 扫二维码
     */
    scan() {
        var msgUtils = require("/utils/msg.js");
        var paramUtils = require("/utils/param.js");
        dd.scan({
            type: 'qr',
            success: (res) => {
                var query = paramUtils.getParameter('query', res.code);
                if(query == null){
                    msgUtils.gotoErrorPage('我们不能处理这个二维码',null,'/pages/cert/cert');
                    //dd.alert({ title: '二维码内容', content: res.code });
                    return;
                }
                var paramContent = '?' + query;//decodeURIComponent();
                var codeInfo = {};
                codeInfo.webId = paramUtils.getParameter('webId',paramContent);
                codeInfo.appCode = paramUtils.getParameter('appCode',paramContent);
                codeInfo.methodType = paramUtils.getParameter('methodType',paramContent);
                if( codeInfo.webId == null ||   codeInfo.appCode == null || codeInfo.methodType == null){
                    msgUtils.gotoErrorPage('我们不能处理这个二维码',null,'/pages/cert/cert');
                    //dd.alert({ title: '二维码内容', content: res.code });
                }else{
                    getApp().certUseApply(codeInfo);
                }
            },
            fail: (res) => {
                msgUtils.errorMsg("扫码失败");
            }
        });
    }
});
