export default [
    {
        path:"/home",
        name:"Home",
        component:()=>import('@/pages/Home/Home'),
        children:[{
            path:"/user",
            name:"User",
            component:()=>import('@/pages/User/User')
        },
        {
            path:"/goods",
            name:"Goods",
            component:()=>import('@/pages/Goods/Goods')
        },
        {
            path:"/order",
            name:"Order",
            component:()=>import('@/pages/Order/Order')
        },
        {
            path:"/type",
            name:"Type",
            component:()=>import('@/pages/Type/Type')
        },
        {
            path:"/status",
            name:"Status",
            component:()=>import('@/pages/Status/Status')
        },
        {
            path:"/admin",
            name:"Admin",
            component:()=>import('@/pages/Admin/Admin')
        }
    ]
    },
    {
        path:"/login",
        name:"Login",
        component:()=>import('@/pages/Login/Login')
    },
    {
        path:"/register",
        name:"Register",
        component:()=>import('@/pages/Register/Register')
    },
    {
        path: "*",
        redirect: "/home",
    },
    
]