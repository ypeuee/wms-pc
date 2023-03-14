/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  //基础数据
  {
    path: '/basic-data',
    icon: 'form',
    name: 'basic-data',
    routes: [
      {
        path: '/basic-data',
        redirect: '/basic-data/company',
      },
      {
        name: 'company',
        icon: 'smile',
        path: '/basic-data/company',
        component: './basic-data/company',
      },
      {
        name: 'user',
        icon: 'smile',
        path: '/basic-data/user',
        component: './basic-data/user',
      },
      {
        name: 'warehouse',
        icon: 'smile',
        path: '/basic-data/warehouse',
        component: './basic-data/warehouse',
      },
      {
        name: 'material',
        icon: 'smile',
        path: '/basic-data/material',
        component: './basic-data/material',
       // hideInMenu: true,
      },
      {
        name: 'add-material',
        icon: 'smile',
        path: '/basic-data/material/add-form',
        component: './basic-data/material/add-form',
        hideInMenu: true,
      },
      {
        name: 'position',
        icon: 'smile',
        path: '/basic-data/position',
        component: './basic-data/position',
       // hideInMenu: true,
      },
    ],
  },
  {
    path: '/warehouse-in',
    name: 'warehouse-in',
    icon: 'crown',
    routes: [
      {
        path: '/warehouse-in',
        redirect: '/warehouse-in/order-form',
      },
      {
        path: '/warehouse-in/order-form',
        name: 'order-form',
        component: './warehouse-in/order-form',
      },
      {
        path: '/warehouse-in/add-form',
        name: 'add-form',
        component: './warehouse-in/add-form',
      },
      {
        path: '/warehouse-in/up-form',
        name: 'up-form',
        component: './warehouse-in/up-form',
      },
    ],
  },
  {
    path: '/warehouse-out',
    name: 'warehouse-out',
    icon: 'crown',
    routes: [
      {
        path: '/warehouse-out',
        redirect: '/warehouse-out/order-form',
      },
      {
        path: '/warehouse-out/order-form',
        name: 'order-form',
        component: './warehouse-out/order-form',
      },
      {
        path: '/warehouse-out/add-form',
        name: 'add-form',
        component: './warehouse-out/add-form',
      },
      {
        path: '/warehouse-out/dispatch-form',
        name: 'dispatch-form',
        component: './warehouse-out/dispatch-form',
      },
      {
        path: '/warehouse-out/create-pick-order',
        name: 'create-pick-order',
        component: './warehouse-out/create-pick-order',
      },
      {
        path: '/warehouse-out/pick-order',
        name: 'pick-order',
        component: './warehouse-out/pick-order',
      },
      {
        path: '/warehouse-out/check-pick',
        name: 'check-pick',
        component: './warehouse-out/check-pick',
      },   
        {
          path: '/warehouse-out/check-pick-list',
          name: 'check-pick-list',
          component: './warehouse-out/check-pick-list',
        },  
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/sub-page',
      },
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        component: './Admin',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
