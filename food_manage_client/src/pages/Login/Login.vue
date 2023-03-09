<template>
<div class="box">
     <div class="shell">
        <div class="box-left">
            <h2>Login</h2>
            <span>Just log in,you can enjoy more services,interact with me here,and publish your opinions</span>
        </div>
        <div class="box-right">
            <div class="form">
                <label for="email">Username</label>
                <input type="email" id="email" v-model="username">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password">
                <input type="submit" id="submit" value="Submit" @click="userLogin">
            </div>
        </div>
    </div>
</div>
 
</template>

<script>
export default {
    name:"Login",
    data() {
        return {
            username:'',
            password:'',
            userInfo:{},
        }
    },
    methods: {
        async userLogin(){
            let res  = await this.$API.login({
                username: this.username,
                password: this.password
            })
            this.userInfo = res
            alert(res.message)
            if(res.status == 0){
                localStorage.setItem('TOKEN',res.token)
                this.$router.push('/home')
            }

        }
    },
}
</script>

<style scoped>
    .box{
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: linear-gradient(to bottom right,#bdbef8,#b9a3fd);
        margin: auto;
    }

    .shell{
        height: 320px;
        width: 640px;
        display: flex;
    }
    .box-left{
        background-color: #fff;
        height: 280px;
        position: relative;
        width: 50%;
        top: 20px;
    }
    .box-left h2{
        font: 900 50px '';
        margin: 50px 40px 40px;
    }
    .box-left span{
        display: block;
        color: #999;
        font-style: 14px;
        margin: 40px;
    }
    .box-right{
        background-color: #474a59;
        box-shadow: 0 0 40px 16px rgba(0,0,0,.2);
        color: #f1f1f2;
        width: 50%;
    }
    .form{
        margin: 40px;
        position: absolute;
    }
    label{
        color: #c2c2c5;
        display: block;
        font-size: 14px;
        height: 16px;
        margin-top: 20px;
        margin-bottom: 5px;
        position: relative;
    }
    input{
        background: transparent;
        border: 0;
        color: #f2f2f2;
        font-style: 20px;
        height: 30px;
        line-height: 30px;
        width: 100%;
        outline: none !important;
    }
    label::before{
        content: '';
        display: block;
        position: absolute;
        top: 52px;
        width: 100%;
        height: 3px;
        background-image: linear-gradient(to right, #44ffff,#b888ff);
    }
    #submit{
        color: #fff;
        margin-top: 40px;
        width: 100px;
        height: 35px;
        background-color: rgba(255,255,255,.1);
        border-radius: 20px;
        float: right;
        transition: .3s;
    }
    #submit:hover{
        letter-spacing: 2px;
        color: #000;
        background-color: #fff;
    }
</style>