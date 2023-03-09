import request from './request'

//注册接口
export const register = (data) => {
    return request('post','http://api.seaandman.top/api/register',data)
}

//登录接口
export const login = (data) => {
    return request('post','http://api.seaandman.top/api/login',data)
}

//获取导航分类
export const getCategory = () => {
    return request('get','http://api.seaandman.top/cate/getcategory')
}

//获取个人信息
export const getPersonInfo = () => {
    return request('get','http://api.seaandman.top/my/getuserinfo')
}

//获取所有人信息
export const getAllInfo = () => {
    return request('get','http://api.seaandman.top/my/getallinfo')
}

//添加用户
export const adduserinfo = (data) => {
    return request('post','http://api.seaandman.top/my/adduserinfo',data)
}

//删除用户
export const deluserinfo = (id) => {
    return request('get',`http://api.seaandman.top/my/delusers/${id}`)
}

//更新用户信息
export const updateuserinfo = (data) => {
    return request('post','http://api.seaandman.top/my/updateuserinfo',data)
}

//查询商品列表
export const getGoods = () => {
    return request('get','http://api.seaandman.top/goods/getgoods')
}

//添加商品
export const addGoods = (data) => {
    return request('post','http://api.seaandman.top/goods/addgoods',data)
}

//删除商品
export const delGoods = (id) => {
    return request('get',`http://api.seaandman.top/goods/delgoods/${id}`)
}

//更新商品信息
export const updateGoods = (data) => {
    return request('post','http://api.seaandman.top/goods/updategoods',data)
}

//获取订单信息
export const getOrdersInfo = () =>{
    return request('get','http://api.seaandman.top/order/getorders')
}

//添加订单
export const addOrdersInfo = (data) => {
    return request('post','http://api.seaandman.top/order/addorders',data)
}

//删除订单
export const delOrdersInfo = (id) => {
    return request('get',`http://api.seaandman.top/order/delorders/${id}`)
}

//编辑订单
export const updateOrderInfo = (data) => {
    return request('post','http://api.seaandman.top/order/updateorders',data)
}

//获取分类
export const getCategoryInfo = () => {
    return request('get','http://api.seaandman.top/cate/getcategory')
}

//添加分类
export const addCategoryInfo = (data) => {
    return request('post','http://api.seaandman.top/cate/addcategory',data)
}

//删除分类
export const delCategoryInfo = (id) => {
    return request('get',`http://api.seaandman.top/cate/delcategory/${id}`)
}

//编辑订单
export const updateCategoryInfo = (data) => {
    return request('post','http://api.seaandman.top/cate/updatecategory',data)
}

//获取状态
export const getStatusInfo = () => {
    return request('get','http://api.seaandman.top/status/getstatus')
}

//添加状态
export const addStatusInfo = (data) => {
    return request('post','http://api.seaandman.top/status/addstatus',data)
}

//删除状态
export const delStatusInfo = (id)=> {
    return request('get',`http://api.seaandman.top/status/delstatus/${id}`)
}

//编辑状态
export const updateStatusInfo = (data) => {
    return request('post','http://api.seaandman.top/status/updatestatus',data)
}

//修改用户密码
export const updateUserPassword = (data)=>{
    return request('post','http://api.seaandman.top/my/updatepassword',data)
}

//修改商品图片
export const changeGoodsImg = (data) => {
    return request('post','http://api.seaandman.top/goods/updategoodsImg',data)
}

//用户信息模糊搜索
export const searchUserInfo = (username,nickname,email) => {
    return request('get',`http://api.seaandman.top/my/searchuserinfo?username=${username}&nickname=${nickname}&email=${email}`)
}

//商品信息模糊搜索
export const searchGoodsInfo = (goods_name,goods_category,price) => {
    return request('get',`http://api.seaandman.top/goods/searchgoodsinfo?goods_name=${goods_name}&goods_category=${goods_category}&price=${price}`)
}

//订单信息模糊搜索
export const searchOrdersInfo = (goods_name,order_states) => {
    return request('get',`http://api.seaandman.top/order/searchorders?goods_name=${goods_name}&order_states=${order_states}`)
}

//类型信息模糊搜索
export const searchCategoryInfo = (category_name) => {
    return request('get',`http://api.seaandman.top/cate/searchcategory?category_name=${category_name}`)
}

//状态信息模糊搜索
export const searchStatusInfo = (status_name) => {
    return request('get',`http://api.seaandman.top/status/searchStatus?status_name=${status_name}`)
}