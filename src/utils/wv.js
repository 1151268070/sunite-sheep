function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge);
    } else {
        document.addEventListener(
            'WebViewJavascriptBridgeReady'
            , function() {
                callback(WebViewJavascriptBridge);
            },
            false
        );
    }
}

export default {
    cb:null,
    regWv(fun){
        this.cb = fun
    },
    init(){
        connectWebViewJavascriptBridge((bridge) => {
            bridge.init(function (message, responseCallback) {
              var responseData = "默认接收收到来自Java的数据，回传数据给你";
              responseCallback(responseData);
            });
            bridge.registerHandler("functionRfidTemp", (data, responseCallback) => {
              //var scjDweb = data.split("#")[0];
              //var scjTemp = data.split("#")[1];
              //document.getElementById("dweb").value= scjDweb;
              //document.getElementById("sswd").value= scjTemp;
              var responseData = "指定接收收到来自Java的数据，回传数据给你" + data;
                if(this.cb)
                    this.cb(data)
                //alert(data)
                //this.er_id = data + "";
                //this.$set(this,'er_id',data+'')
                //alert(this.er_id)
              responseCallback(responseData);
            });
          });
    }
}
