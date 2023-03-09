# Food_control_manager
餐饮管理平台
food_api_server 是后端文件
food_manage_client 是前端文件
mysql 是数据库文件 
使用步骤:
1.将food_api_server文件夹添加到vscode 执行npm install安装依赖
2.food_manage_client 的根目录执行npm install安装依赖
3.mysql文件进入到数据库导入即可
本地测试流程:
1.food_api_server 文件夹根目录 执行node app.js 或者安装 nodemon包 npm i nodemon -g安装后 执行nodemon app.js
2.进入food_manage_client 文件夹 执行npm run serve 启动前端
3.打开网站测试即可 测试账号:admin 密码:123

项目上线:
1.food_api_server文件夹下面的文件除了node_module文件夹下面的依赖以外的文件全部上传到服务器
2.在文件夹目录下执行npm i 安装依赖
3.food_manage_client 文件夹执行 npm run build 打包程序
4.将生成的dist文件夹下面的文件上传到网站根目录

具体效果预览:
http://food.seaandman.top
测试账号:admin
密码:123
