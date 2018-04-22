<<<<<<< HEAD
# vue-zhuawawa

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
=======
* BASE_URL = "https://www.iqi1.com/";
* URL_LOGIN_WEIXIN = "api/auth/AuthWith?RefSource=wechat"; //wechat登录
1.  相关函数： requestLogin, UserInfoUtil.saveUserInfo
2.  ```
     private void requestLogin(String code) {
        JSONObject object = new JSONObject();
        try {
            object.put("AppId", Constant.WEIXIN_APP_ID);
            object.put("Code", code);
            HttpUtils.getInstance().post(this, Constant.URL_LOGIN_WEIXIN, object.toString(), new HttpCallback() {
                @Override
                public void success(String result) {
                    loading.setVisibility(View.GONE);
                    isLogin = true;
                    try {
                        UserInfo userInfo = mGson.fromJson(result, UserInfo.class);
                        if (!TextUtils.isEmpty(userInfo.err)) {
                            LogUtil.log(this, "userInfo.err = " + userInfo.err);
                            showError();
                            return;
                        }
                        UserInfoUtil.saveUserInfo(LoginActivity.this, userInfo.id,
                                userInfo.firstName, userInfo.avatarUrl, userInfo.token, userInfo.balance);
                        navToHome();
                    } catch (Exception e) {
                        isLogin = false;
                        e.printStackTrace();
                        showError();
                    }

                }

                @Override
                public void error(Exception e) {
                    isLogin = false;
                    loading.setVisibility(View.GONE);
                }
            });
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
    ``` 
##  URL_TOKEN_UPDATE = "api/auth/updatetoken"; //更新token
1. 相关函数：checkToken()
-  
##  URL_HOME_LIST = "api/app/doll/room"; //房间列表

1. 	```
    var yelpUrl = 'https://cors-anywhere.herokuapp.com/' + 'https://www.iqi1.com/' + 'api/app/doll/room';
	var myYelpSecret = '6omr7-7C49v8GwsXDe0DdzfHcN1b6A1B4QBVaxjQOQaz-QiWeeeymAor8vKvw9Xgl6ulBXmOS08yE76nVKfu1HXupzlYjX3bOhyvXwR5HRg4-b5VqGKNQogAZD2nWnYx';
	var yelpInit = {       
		"async": true,
	  	"crossDomain": true,
	    "method": "GET",
	    "headers": {
	    	"authorization": "Bearer " + myYelpSecret,
	    	"cache-control": "no-cache" 
		}
	};
    fetch(yelpUrl,yelpInit).then(function(response) {
	  return response.json();
	})
	.then(data => console.log(data)).catch(e => console.log(e));
	```

##  URL_HOME_INFO = "api/app/doll/room"; // ?id= 单个房间信息
1. 相关函数： requestRoomInfo,HttpUtils.getInstance().get()
2. ```
        private void requestRoomInfo() {
        if (item == null || TextUtils.isEmpty(item.Id))
            return;
        HashMap<String, String> param = new HashMap<>();
        param.put("Id", item.Id);
        HttpUtils.getInstance().get(this, Constant.URL_HOME_INFO, param, new HttpCallback() {
            @Override
            public void error(Exception e) {
                if (isPrepareCatching) {
                    stopCatching();
                    showError(getString(R.string.request_error));
                }
            }

            @Override
            public void success(String result) {
                try {
                    RoomInfo temp = mGson.fromJson(result, RoomInfo.class);
                    if (!TextUtils.isEmpty(item.Id) && temp != null
                            && item.Id.equals(temp.Id)) {
                        refreshUserList(temp.crowd, temp.crowdCount, temp.queued, temp.actor);
                    }
                } catch (JsonSyntaxException e) {
                    e.printStackTrace();
                }
            }
        });
    }    
    ```
- instance().get() 函数 HTTP请求： 注意这里有两个get函数
1. ```public void get(final Activity activity, String api, final HashMap<String, String> params,
                    final HttpCallback callback) {
        if (params != null) {
            StringBuilder builder = new StringBuilder();
            builder.append(api);
            builder.append("?");
            Set<String> keySet = params.keySet();
            Iterator<String> it = keySet.iterator();
            try {
                while (it.hasNext()) {
                    String key = it.next();
                    String value = params.get(key);
                    builder.append(key);
                    builder.append("=");
                    builder.append(URLEncoder.encode(value, "utf-8"));
                    builder.append("&");
                }
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            api = builder.toString();
            System.out.println("api = " + api);
        }
        get(activity, api, callback);
    }

    public void get(final Activity activity, final String api,
                    final HttpCallback callback) {
        final String url = Constant.BASE_URL + api;
        final String userToken = UserInfoUtil.getStrInfo(activity.getApplicationContext(), UserInfoUtil.UserToken);
        final String token = !TextUtils.isEmpty(userToken) ? userToken : "";
        new Thread(new Runnable() {
            @Override
            public void run() {
                Request request = null;
                if (!TextUtils.isEmpty(token))
                    request = new Request.Builder()
                            .url(url)
                            .addHeader("Authorization", "Basic " + token)
                            .build();
                else
                    request = new Request.Builder()
                            .url(url)
                            .build();
                try {
                    Response response = getOkHttpClient().newCall(request).execute();
                    final String result = response.body().string();
                    LogUtil.log(this, url + " , get result = " + result);
                    if (result != null) {
                        handler.post(new Runnable() {
                            @Override
                            public void run() {
                                if (activity != null && !activity.isFinishing()) {
                                    callback.success(result);
                                }
                            }
                        });
                    }
                } catch (final IOException e) {
                    e.printStackTrace();
                    LogUtil.log(this, "error = " + url);
                    handler.post(new Runnable() {
                        @Override
                        public void run() {
                            if (activity != null && !activity.isFinishing())
                                callback.error(e);
                        }
                    });
                }
            }
        }).start();
    }```
 
-  URL_ROOM_ENTER = "api/app/doll/room/enter"; //用户进入房间
-  URL_ROOM_LEAVE = "api/app/doll/room/leave"; //用户离开房间
-  URL_ROOM_QUEUE = "api/app/doll/room/queue";//用户进入预约
-  URL_ROOM_RANK_INFO = "api/app/doll/room/caughtInfo";//该房间的排行与抓中记录
-  URL_ROOM_LEAVE_QUEUE = "api/app/doll/room/leaveQueue";//用户离开预约
-  URL_USER_GIFT = "api/gift";    //用户娃娃列表
-  URL_USER_BALANCE = "api/balance";     //查询用户余额
-  URL_USER_BILLLIST = "api/balance/log";     //用户账单
-  URL_USER_RECHARGE = "api/balance/recharge";  //充值返回订单号
-  URL_RECHARGING_LIST = "api/balance/rechargingList";  //充值返回订单号
-  URL_WECHAT_PAY = "api/wechatpay/pay";
-  URL_IMPORT_GIFT = "api/receipt/importgift"; //把礼物导入订单，走订单流程
-  URL_APP_UPDATE = "uploads/yqzzz.json";
-  URL_ADDRESS_LIST = "api/addr";
-  URL_ADD_ADDRESS = "api/addr/append";
-  URL_UPDATE_ADDRESS = "api/addr/update";
-  URL_REMOVE_ADDRESS = "api/addr/remove";
-  URL_DEF_ADDRESS = "api/addr/def";  //设置默认地址
>>>>>>> 9fadc7c9eb6d6e4a5f2106fb2c570f01b02720e2
