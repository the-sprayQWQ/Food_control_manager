import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

//引入路由器
import VueRouter from "vue-router";
import router from "@/router";

//按需引入饿么了UI
import {
  Dialog,
  Button,
  Container,
  Header,
  Aside,
  Main,
  Submenu,
  Select,
  Menu,
  MenuItem,
  Table,
  TableColumn,
  Input,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Form,
  FormItem,
  Option
} from "element-ui";

//引入公共组件
// import Nav from "@/components/Nav.vue";
//注册公共组件
// Vue.component(Nav.name, Nav);
Vue.component(Option.name, Option);
Vue.component(Select.name, Select);
Vue.component(Dialog.name, Dialog);
Vue.component(Button.name, Button);
Vue.component(Container.name, Container);
Vue.component(Header.name, Header);
Vue.component(Aside.name, Aside);
Vue.component(Main.name, Main);
Vue.component(Submenu.name, Submenu);
Vue.component(Menu.name, Menu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Input.name, Input);
Vue.component(Breadcrumb.name, Breadcrumb);
Vue.component(BreadcrumbItem.name, BreadcrumbItem);
Vue.component(Card.name, Card);
Vue.component(Col.name, Col);
Vue.component(Row.name, Row);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);

//引入API
import * as API from "@/api";
//引入axios
import axios from "axios";
Vue.prototype.$axios = axios;
// axios.defaults.baseURL = '/api'  //自动附加在所有axios请求前面，则可以省略/api，直接写'/xxxx/xxx'。否则需要设置'/api/xxxx/xxx'

//使用路由
Vue.use(VueRouter);

new Vue({
  el: "#app",
  beforeCreate() {
    Vue.prototype.$API = API;
  },
  render: (h) => h(App),
  router: router,
});
