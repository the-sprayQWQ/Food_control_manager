import VueRouter from "vue-router";
import routes from "@/router/routes";

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//二次封装push方法
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//二次封装replace方法
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

let router = new VueRouter({
  routes,
});

router.beforeEach(async (to, from, next) => {
  let token = localStorage.getItem("TOKEN");
  //用户已经登陆
  if (token) {
    //就不能去登陆页面了
    if (to.path == "/login" || to.path == '/register') {
      next("/home");
    } else {
      try {
        next();
      } catch (error) {
        //token失效
        next("/login");
      }
    }
  } else {
    //未登录、不能去交易相关、不能去支付相关、不能去个人中心
    let toPath = to.path
    if(toPath.indexOf('/center') != -1 || toPath.indexOf('/article') != -1 || toPath.indexOf('/admin') != -1){
        //存储在地址栏
        next('/login?redirect='+toPath)
    }else{
        next();
    }
  }
});

export default router;
