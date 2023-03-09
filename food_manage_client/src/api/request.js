//对于axios进行二次封装
import axios from "axios";
//引入nprogress
import nprogress from "nprogress";
//引入nprogress样式
import "nprogress/nprogress.css"

//暴露重写后的axios
const request = (method, url, data = {}) => {
  const instance = axios.create({
    //配置对象
    baseURL: "/chen",
    //代表请求超时时间
    timeout: 5000,
  });
  let obj = {};
  if (method === "get") {
    obj = {
      url: url,
      method: method,
      params: {
        ...data,
      },
    };
  } else {
    obj = {
      url: url,
      method: method,
      data: {
        ...data,
      },
    };
  }
//请求拦截器
//发送请求过程      
instance.interceptors.request.use((config) => {
  //请求头携带Token
  const Token = localStorage.getItem('TOKEN')
  if(Token){
    config.headers.Authorization = Token;
  }
    //进度条开始
    nprogress.start()
    //config:配置对象，对象里面有个属性很重要，header请求头
    return config
  })

//响应拦截器
//请求结束
instance.interceptors.response.use((res) => {
    //进度条结束
    nprogress.done()
    return res.data
},(error) => {
    return Promise.reject(new Error('fail'))
})
  return instance(obj)
};
export default request;
