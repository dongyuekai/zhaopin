
const host = 'https://talent.autohome.com.cn/api/';  //生产环境

const verCodeHost = 'https://talent.autohome.com.cn/api/';  //生产环境

const urls = {
  getLastPosition: host + 'officialPosition/getLastPosition',
  getBasicNeedArray: host + 'officialPosition/getBasicNeedArray',
  deliveryPosition: host + 'delivery/deliveryPosition',
  getDeliveryList: host + 'delivery/getDeliveryList',
  getDeliveryListCount: host + 'delivery/getDeliveryListCount',
  checkDelivery: host + 'delivery/checkDelivery',
  getPositionList: host + 'officialPosition/getPositionList',
  getDeptPosition: host + 'officialPosition/getDeptPosition',
  getPositionDetail: host + 'officialPosition/getPositionDetail',
  getUserInfo: host + 'officialUser/getUserInfo',
  setUserInfo: host + 'officialUser/setUserInfo',
  updateUserLogin: host + 'officialUser/updateUserLogin',
  login: host + 'officialUser/login',
  logout: host + 'officialUser/logout',
  sendMsg: host + 'officialUser/sendMsg',
  sendRegisterMsg: host + 'officialUser/sendRegisterMsg',
  register: host + 'officialUser/register',
  getLoginName: host + 'officialUser/getLoginName',

  getExtensionListById: host + 'officialExtension/getExtensionListById',
  checkRegister: host + 'officialUser/checkRegister',
  getDataForRegister: host + 'officialUser/getDataForRegister',
  recommend: host + 'officialUser/recommend',
  checkAlreadyRegister: host + 'officialUser/checkAlreadyRegister',
  changePassword: host + 'officialUser/changePassword',
  getWebExtensionList: host + 'officialExtension/getWebExtensionList',
  getEditDetail: host + 'officialUser/getEditDetail',
  editRecommend: host + 'officialUser/editRecommend',
  updateUserInfo: host + 'officialUser/updateUserInfo',
  sendForgetCode: host + 'officialUser/sendForgetCode',
  checkForget: host + 'officialUser/checkForget',
  vercode: verCodeHost + 'officialUser/generate'

};



//获取url中的参数值
function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

function getPicByPosiId(pic) {

  // switch (deptId) {
  //   case '40206':
  //     pic =
  //       'https://efile.autoimg.cn/efile/g6/M0C/EC/38/280x280_0_starzoo__/wKjB0VlRuQGAKjT7AAG2TqTL-ik952.jpg';
  //     break;
  //   default:
  //     pic =
  //       'https://efile.autoimg.cn/efile/g6/M0C/EC/38/280x280_0_starzoo__/wKjB0VlRuQGAKjT7AAG2TqTL-ik952.jpg';
  // }
  return pic ? pic : "https://www2.autoimg.cn/g29/M04/E8/06/ChsEn1uLlu2AK9HpAAFD3D-D3WM290.png";
}

//对基础ajax的封装
/*requestPath：请求路径
    requestData：请求参数，默认为空
    requestType：请求方式("POST" 或 "GET")， 默认为 "GET"
    succCallback：请求成功回调函数
    errorCallback：请求失败回调函数
    dataType：预期服务器返回的数据类型， 默认为 JSON
    */
function baseAjax(requestPath, requestData, requestType, succCallback, errorCallback, dataType, async) {

  requestData = requestData || {}
  requestType = requestType || 'GET'
  dataType = dataType || 'JSON'
  async = async ? async : "true"
  console.log(async)
  $.ajax({
    url: requestPath,               //请求地址
    type: requestType,              //请求类型
    data: requestData,              //请求数据
    timeout: 100000,                //请求超时时间(毫秒)
    xhrFields: { withCredentials: true },
    crossDomain: true,
    async: async,
    // beforeSend:function(){
    //     load.init()                //发送请求之前，插入加载提示信息“拼命加载中···”
    // },
    success: function (res) {         //请求成功
      console.log(res)
      if (res.status == undefined || res.status == -1) {
        alert("错误的数据返回格式");
        return false;
      } else if (res.status != 1) {
        if (res.info != '' && res.status == 0) {
          if (res.code == 403) {
            //应该是去到登陆页面
            //window.location.href="index.html"
            errorCallback(res)
          } else {
            alert(res.info)
          }
          errorCallback(res)
        }
      } else {
        succCallback(res.returnObject)
      }

      // if(res.message == 'OK'){   //res.message不是唯一，也有可能是res.code 需结合项目实际场景来写入判断条件
      //     if(succCallback){
      //         succCallback(res)  //返回OK回调函数，将返回的数据res传入到该回调函数中
      //     }
      // }else{
      //     if(errorCallback){
      //         errorCallback(res) //返回不是OK时回调函数，将返回的数据res传入到该回调函数中
      //     }
      // }
    },
    complete: function (res, status) {
      //load.remove()             //请求完成 移除加载提示“拼命加载中···”
    },
    error: function () {
      //tip()                     //请求错误，弹出提示
    }
  })
}


function jPost(path, data, succCallback, errorCallback, async) {
  //再次封装-有参数
  baseAjax(path, data, 'POST', succCallback, errorCallback, async)
}
function noParameterJPost(path, succCallback, errorCallback) {
  //再次封装-无参数
  baseAjax(path, {}, 'POST', succCallback, errorCallback)
}

function jGet(path, data, succCallback, errorCallback) {
  //再次封装-有参数
  baseAjax(path, data, 'GET', succCallback, errorCallback)
}
function noParameterJGet(path, succCallback, errorCallback) {
  //再次封装-无参数
  baseAjax(path, {}, 'GET', succCallback, errorCallback)
}

