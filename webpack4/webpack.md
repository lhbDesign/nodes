# webpack

[TOC]



## 配置客户端

### 安装插件

首先创建文件夹client
在该文件夹的终端中输入

```js
npm init -y
```

生成package.json文件，在文件中分别装入插件

```js
 "devDependencies": {
    "webpack": "^4.46.0",//webpack插件
    "webpack-cli": "^3.3.12",//webpack命令插件
    "webpack-dev-server": "^3.11.2",//webpack静态服务插件
    "clean-webpack-plugin": "^3.0.0",//用于清除因配置hash名而产生上次生成的同样文件
    "html-webpack-plugin": "^4.5.1"//webpack的html生成插件
    }

写入之后保存之后npm i下载所有插件即可
```

### 配置webpack.config.js

```js
var {CleanWebpackPlugin}=require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
module.exports={
      // 开发环境或者生产环境
    mode:"development",
     // 生成map映射文件，当项目被打包后会压缩，
  	 // 有这个map文件就可以更精准的知道是哪个地方出现了错误
    devtool:"source-map",
    // 入口，在整个html页面中执行的入口js文件
  	//前面是编译过的地址，后面是编译前的地址
    entry:{
        "js/app":"./src/app.js"
    },
    // 出口配置，自动生成压缩后的文件夹
  	output: {
    // 输出路径
    path: path.join(__dirname, "./dist"),
    // 输出生成的js文件,在这里[name]是原文件名是什么就导出对应的名字
    //[hash:6] 自动增加尾缀hash值用来区分上一次的文件，减少因为缓存引入上次的文件问题
    filename: "[name]-[hash:6].js"
  }, 
    // webpage提供的插件
  plugins: [
   // 用于自动构建html页面的插件
    new HtmlWebpackPlugin({
      // 网页源目录
      template: path.join(__dirname, "./public/html/index.html"),
      // 目标文件名
      app: "index.html",
      // 注入，如果不设定这个就会造成源html内容丢失
      inject: true
    }),
      //清除上次因为使用hash名称产生的相同文件   "[name]-[hash:6].js"这里配置造成
    new CleanWebpackPlugin()
  ],
    devServer: {
    // 目标静态服务器地址指向的文件夹
    contentBase: path.join(__dirname, "./dist"),
    // 端口号
    port: 4001,
    } 
}
```

分别创建文件夹src，dist，public，以及在src文件夹下创建js文件夹和app.js文件，在public下添加css，html，img三个文件夹，并且在html文件夹中创建index.html

![Snipaste_2021-12-17_15-11-55](pic\Snipaste_2021-12-17_15-11-55.jpg)



package.json文件夹下的scripts下修改成如下代码

```js
"scripts": {
     //用于执行webpack打包项目
    "build": "webpack",
     //用于开启webpack静态服务
    "dev": "webpack-dev-server",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

### 执行

```
npm run build
npm run dev
```

执行完成后会

<img src="pic\Snipaste_2021-12-17_15-31-30.jpg" alt="Snipaste_2021-12-17_15-31-30"  />

## 配置路由器完成页面的路由变化

### 引入类似网站

![Snipaste_2021-12-17_16-01-16](pic\Snipaste_2021-12-17_16-01-16.jpg)

将index.html进行替换

之后将css，font，html，image，js，picture引入到public中

![Snipaste_2021-12-17_16-04-31](pic\Snipaste_2021-12-17_16-04-31.jpg)

将public中的文件拷贝到dist文件夹下（这个步骤手动拷贝过于麻烦）利用CopyPlugin用于复制源文件夹中指定的文件的插件
下载插件就要在package.json的"devDependencies":中插入`"copy-webpack-plugin": "^6.4.1"`,后执行`npm i`

```js
 "devDependencies": {
    //"webpack": "^4.46.0",//webpack插件
    //"webpack-cli": "^3.3.12",//webpack命令插件
    //"webpack-dev-server": "^3.11.2",//webpack静态服务插件
    //"clean-webpack-plugin": "^3.0.0",//用于清除因配置hash名而产生上次生成的同样文件
    //"html-webpack-plugin": "^4.5.1"//webpack的html生成插件
    "copy-webpack-plugin": "^6.4.1"////webpage拷贝插件
    }
```

之后再webpack.config.js中引入copy-webpack-plugin

```js
var CopyWebpackPlugin=require("copy-webpack-plugin");
//在 plugins:[]中将new CopyPlugin({}）引入

// 用于复制源文件夹中指定的文件,以对象的方式进行给入
    new CopyWebpackPlugin({
      //patterns以数组的形式进行给入
      patterns: [
        //from...,to...从。。。到。。。去，path.join()方法是将多个参数字符串合并成一个路径字符串，__dirname 表示当前路径的绝对路径
        {from:path.join(__dirname,"./public/html"),to:path.join(__dirname,"./dist/html")},
        {from:path.join(__dirname,"./public/css"),to:path.join(__dirname,"./dist/css")},
        {from:path.join(__dirname,"./public/image"),to:path.join(__dirname,"./dist/image")},
        {from:path.join(__dirname,"./public/js"),to:path.join(__dirname,"./dist/js")},
        {from:path.join(__dirname,"./public/font"),to:path.join(__dirname,"./dist/font")},
        {from:path.join(__dirname,"./public/picture"),to:path.join(__dirname,"./dist/picture")},
      ]
    })
  ],
```

之后就可以发现将public文件夹下的html，css，image，js，font，picture全部拷贝到dist文件夹下

存入到dist后的文件文件路径不一致，改变所有的路径

就会将原本这样的![Snipaste_2021-12-17_21-03-18](pic\Snipaste_2021-12-17_21-03-18.jpg)

经过改变路径去开启服务npm run dev之后执行localhost:4001就会生成如下结果![Snipaste_2021-12-17_21-02-04](pic\Snipaste_2021-12-17_21-02-04.jpg)

去掉其中不需要的部分使其变成如下部分

![Snipaste_2021-12-17_21-39-09](pic\Snipaste_2021-12-17_21-39-09.jpg)

### 使用前端路由插件SME-Router

#### 安装插件

前端页面使用的router路由    "sme-router": "^0.12.8"

在package.json的"devDependencies":中插入`"sme-router": "^0.12.8"`,后执行`npm i`

```js
 "devDependencies": {
    //"webpack": "^4.46.0",//webpack插件
    //"webpack-cli": "^3.3.12",//webpack命令插件
    //"webpack-dev-server": "^3.11.2",//webpack静态服务插件
    //"clean-webpack-plugin": "^3.0.0",//用于清除因配置hash名而产生上次生成的同样文件
    //"html-webpack-plugin": "^4.5.1"//webpack的html生成插件
    //"copy-webpack-plugin": "^6.4.1"////webpage拷贝插件     
  	"sme-router": "^0.12.8"//前端页面使用的router路由  
    }
```

#### 配置路由

使用smeRouter必须依赖于webpack，先通过webpack配好整个结构再开始继续使用**

在src-->js下创建router文件夹，之后在router文件夹下创建indexRouter.js将sme-router进行引入

![Snipaste_2021-12-18_08-59-46](pic\Snipaste_2021-12-18_08-59-46.jpg)

```js
import Router from "sme-router";
```

在页面中加入

```
index.html下加入
<div id="app"></div>
```

再次在indexRouter.js中实例化一个router

```js
import Router from "sme-router";
var router=new Router("app");//此时这个"app"就与页面中的的app一致了
router.route("/index",function(req,res,next){
    res.render(main());
})//当页面上输入http://localhost:4001/#/index这就是访问index路由 
router.route("/login",function(req,res,next){
    res.render(logins())
})//当页面上输入http://localhost:4001/#/login这就是访问login路由
router.route("/logout",function(req,res,next){
    console.log("cc")
})//当页面上输入http://localhost:4001/#/logout这就是访问logout路由
router.route("/logup",function(req,res,next){
    console.log("dd")
})//当页面上输入http://localhost:4001/#/logup这就是访问logup路由
export default router;//将router进行导出
```

做完路由的js（indexRouter.js）后需要在app.js中进行引入indexRouter

```js
import indexRouter from "./js/router/indexRouter.js";//引入indexRouter
indexRouter.go("/index");//这样也会跳转路由，go在这里就是跳转路由的含义 当然在这里go也可以传递参数
```

<font color=Aqua>例子</font>

```
//在indexRouter.js中
import Router from "sme-router";
var router=new Router("app");
router.route("/index",function(req,res,next){
    console.log("aa")
})
export default router;
//在app.js中
import indexRouter from "./js/router/indexRouter.js";
indexRouter.go("/index");

这样在访问http://localhost:4001/#/index下就可以在控制台发现aa了如下图所示
```

![Snipaste_2021-12-18_09-53-10](pic\Snipaste_2021-12-18_09-53-10.jpg)

**为啥是localhost:4001/#/index，其中#是哈希**

#### 传递参数

go是可以传递参数的

```
indexRouter.go("/index?name=EVI&age=20",{a:1,b:2});//一个是地址传参，一个是尾注内容传参
之后去indexRouter.js中改变以下index的路由
import Router from "sme-router";
var router=new Router("app");//此时这个"app"就与页面中的的app一致了
router.route("/index",function(req,res,next){
    console.log(req.body);
    console.log(req.query);
})
export default router
```

当访问localhost:4001/#/index时控制台会显示如下结果
{a: 1, b: 2}
{name: 'EVI', age: '20'}

<img src="pic\Snipaste_2021-12-18_10-06-11.jpg" alt="Snipaste_2021-12-18_10-06-11"  />

```
当router.route("/index",function(req,res,next){
   ... ...
   })中
   改变/index为"/index:abc"
   router.route("/index:abc",function(req,res,next){
   console.log(req.body);//尾注参数--->{a:1,b:2}
   console.log(req.query);//地址参数--->{name: 'EVI', age: '20'}
   console.log(req.params);//路由参数--->{abc: ':abc'}
   })
   在app.js中访问indexRouter.go("/index:abc?name=EVI&age=20",{a:1,b:2});时
   会在控制台中出现{abc: ':abc'}
```

#### 利用路由完成模板的创建

##### 模板

sme-router支持使用模板，但是必须依赖于webpack，通常在wabpack中完成配置就可以使用
使用模板就要使用art-template

安装art-template相关插件

```js
 "devDependencies": {
    //"webpack": "^4.46.0",//webpack插件
    //"webpack-cli": "^3.3.12",//webpack命令插件
    //"webpack-dev-server": "^3.11.2",//webpack静态服务插件
    //"clean-webpack-plugin": "^3.0.0",//用于清除因配置hash名而产生上次生成的同样文件
    //"html-webpack-plugin": "^4.5.1"//webpack的html生成插件
    //"copy-webpack-plugin": "^6.4.1"////webpage拷贝插件     
  	//"sme-router": "^0.12.8"//前端页面使用的router路由
    "art-template": "^4.13.2", //art模板
    "art-template-loader": "^1.4.3" //art模板加载插件，由于使用webpack来定制所以要使用加载插件
    }
```

在webpack.config.js中引入模块

```js
// var {CleanWebpackPlugin}=require("clean-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// var path = require("path");
// var CopyWebpackPlugin=require("copy-webpack-plugin");
// module.exports={
//       // 开发环境或者生产环境
//     mode:"development",
//      // 生成map映射文件，当项目被打包后会压缩，
//   	 // 有这个map文件就可以更精准的知道是哪个地方出现了错误
//     devtool:"source-map",
//     // 入口，在整个html页面中执行的入口js文件
//   	//前面是编译过的地址，后面是编译前的地址
//     entry:{
//         "js/app":"./src/app.js"
//     },
//     // 出口配置，自动生成压缩后的文件夹
//   	output: {
//     // 输出路径
//     path: path.join(__dirname, "./dist"),
//     // 输出生成的js文件,在这里[name]是原文件名是什么就导出对应的名字
//     //[hash:6] 自动增加尾缀hash值用来区分上一次的文件，减少因为缓存引入上次的文件问题
//     filename: "[name]-[hash:6].js"
//   }, 
 //模块
  module: {
    //rules是一个数组的方式
   rules: [
     //配置art-template-loader模块，用于加载所有.art的文件并且根据需求加载完成后解析
      { test: /\.art$/, use: { loader: "art-template-loader" } }
    ]
  },
//   // webpage提供的插件
//   plugins: [
//    // 用于自动构建html页面的插件
//     new HtmlWebpackPlugin({
//       // 网页源目录
//       template: path.join(__dirname, "./public/html/index.html"),
//       // 目标文件名
//       app: "index.html",
//       // 注入，如果不设定这个就会造成源html内容丢失
//       inject: true
//     }),
//       //清除上次因为使用hash名称产生的相同文件   "[name]-[hash:6].js"这里配置造成
//     new CleanWebpackPlugin(),
//     // 用于复制源文件夹中指定的文件,以对象的方式进行给入
//     new CopyWebpackPlugin({
//       //patterns以数组的形式进行给入
//       patterns: [
//         //from...,to...从。。。到。。。去，path.join()方法是将多个参数字符串合并成一个路径字符串，__dirname 表示当前路径的绝对路径
//         {from:path.join(__dirname,"./public/html"),to:path.join(__dirname,"./dist/html")},
//         {from:path.join(__dirname,"./public/css"),to:path.join(__dirname,"./dist/css")},
//         {from:path.join(__dirname,"./public/image"),to:path.join(__dirname,"./dist/image")},
//         {from:path.join(__dirname,"./public/js"),to:path.join(__dirname,"./dist/js")},
//         {from:path.join(__dirname,"./public/font"),to:path.join(__dirname,"./dist/font")},
//         {from:path.join(__dirname,"./public/picture"),to:path.join(__dirname,"./dist/picture")},
//       ]
//     })
//   ],
//     devServer: {
//     // 目标静态服务器地址指向的文件夹
//     contentBase: path.join(__dirname, "./dist"),
//     // 端口号
//     port: 4001,
//     }
// }
```

创建有关art文件，在src下创建views文件夹

![Snipaste_2021-12-18_10-39-08](pic\Snipaste_2021-12-18_10-39-08.jpg)

在views下创建a.art

```html
<ul>
{{each list}}//遍历list
    <li>{{$value}}</li>
{{/each}}
</ul>
```

在indexRouter.js中引入a.art

```js
//import Router from "sme-router";
import a from "../../views/a.art";
//var router=new Router("app");
// router.route("/index:abc",function(req,res,next){
//     //console.log("aa");
//         console.log(req.body);
//         console.log(req.query);
//         console.log(req.params);
//     //res.render(main());
// })

router.route("/index:abc",function(req,res,next){
    //console.log(a({list:[1,2,3]}));//a是一个函数需要传值，此时这里的list是a.art中需要遍历的内容
    //重新开启后,会在控制台发现以下内容，
    /*
    <ul>
    	<li>1</li>
    	<li>2</li>
    	<li>3</li>
	</ul>
    */
    res.render(a({list:[1,2,3]}));//res.render生成视图之后把视图响应给客户端渲染页面
})
//router.route("/login",function(req,res,next){
//    res.render(logins())
//})
//router.route("/logout",function(req,res,next){
//    console.log("cc")
//})
//////router.route("/logup",function(req,res,next){
////    console.log("dd")
//})

//export default router;
```

<font color="red">🌟🌟🌟注意:在修改完后要重现开启服务------->**npm run dev**</font>

##### 改变模板中的样式---css

如何引用css？？？

首先在src下创建css文件夹，创建a.css

```css
#app{
    color:red;
    font-size: 20px;
}
```

此时要在app.js中引入css

```js
import "./css/a.css"
```

会报错（报错如下）

![Snipaste_2021-12-18_11-20-22](pic\Snipaste_2021-12-18_11-20-22.jpg)

那么怎么去解决这个错误？

引入插件

```js
 "devDependencies": {
    //"webpack": "^4.46.0",
    //"webpack-cli": "^3.3.12",
    //"webpack-dev-server": "^3.11.2",
    //"clean-webpack-plugin": "^3.0.0",
    //"html-webpack-plugin": "^4.5.1",
    //"copy-webpack-plugin": "^6.4.1",
    //"sme-router": "^0.12.8",
    //"art-template": "^4.13.2",
    //"art-template-loader": "^1.4.3",
    //用于对于js中import引入的css做解析，需要版本锁定，因为不同版本的webpack所对应的插件不同
  	"css-loader":"^5.0.2",
  	"style-loader":"^1.3.0"
    }
}
```

在webpack.config.js中模块中配置CSS文件的import引入和解析

<font color="red">🌟🌟🌟配置CSS文件的import引入和解析，i不区分大小写，use必须使用数组的方式，数组中写入插件的顺序是固定的，第一个必须是"style-loader"，第二个必须是"css-loader"
</font>

<font color="teal">**{ test: /\.css$/i,use: ["style-loader", "css-loader"] }**</font>

```js
// var {CleanWebpackPlugin}=require("clean-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// var path = require("path");
// var CopyWebpackPlugin=require("copy-webpack-plugin");
// module.exports={
//       // 开发环境或者生产环境
//     mode:"development",
//      // 生成map映射文件，当项目被打包后会压缩，
//   	 // 有这个map文件就可以更精准的知道是哪个地方出现了错误
//     devtool:"source-map",
//     // 入口，在整个html页面中执行的入口js文件
//   	//前面是编译过的地址，后面是编译前的地址
//     entry:{
//         "js/app":"./src/app.js"
//     },
//     // 出口配置，自动生成压缩后的文件夹
//   	output: {
//     // 输出路径
//     path: path.join(__dirname, "./dist"),
//     // 输出生成的js文件,在这里[name]是原文件名是什么就导出对应的名字
//     //[hash:6] 自动增加尾缀hash值用来区分上一次的文件，减少因为缓存引入上次的文件问题
//     filename: "[name]-[hash:6].js"
//   }, 
 //模块
  module: {
    //rules是一个数组的方式
   rules: [
     //配置art-template-loader模块，用于加载所有.art的文件并且根据需求加载完成后解析
      //{ test: /\.art$/, use: { loader: "art-template-loader" } }，
       //配置CSS文件的import引入和解析，i不区分大小写，use必须使用数组的方式，数组中写入插件的顺序是固定的，第一个必须是"style-loader"，第二个必须是"css-loader"
      { test: /\.css$/i,use: ["style-loader", "css-loader"] }
    ]
  },
//   // webpage提供的插件
//   plugins: [
//    // 用于自动构建html页面的插件
//     new HtmlWebpackPlugin({
//       // 网页源目录
//       template: path.join(__dirname, "./public/html/index.html"),
//       // 目标文件名
//       app: "index.html",
//       // 注入，如果不设定这个就会造成源html内容丢失
//       inject: true
//     }),
//       //清除上次因为使用hash名称产生的相同文件   "[name]-[hash:6].js"这里配置造成
//     new CleanWebpackPlugin(),
//     // 用于复制源文件夹中指定的文件,以对象的方式进行给入
//     new CopyWebpackPlugin({
//       //patterns以数组的形式进行给入
//       patterns: [
//         //from...,to...从。。。到。。。去，path.join()方法是将多个参数字符串合并成一个路径字符串，__dirname 表示当前路径的绝对路径
//         {from:path.join(__dirname,"./public/html"),to:path.join(__dirname,"./dist/html")},
//         {from:path.join(__dirname,"./public/css"),to:path.join(__dirname,"./dist/css")},
//         {from:path.join(__dirname,"./public/image"),to:path.join(__dirname,"./dist/image")},
//         {from:path.join(__dirname,"./public/js"),to:path.join(__dirname,"./dist/js")},
//         {from:path.join(__dirname,"./public/font"),to:path.join(__dirname,"./dist/font")},
//         {from:path.join(__dirname,"./public/picture"),to:path.join(__dirname,"./dist/picture")},
//       ]
//     })
//   ],
//     devServer: {
//     // 目标静态服务器地址指向的文件夹
//     contentBase: path.join(__dirname, "./dist"),
//     // 端口号
//     port: 4001,
//     }
// }
```

加入css的两种方式

1. 在html中引入css----静态的
2. scss，styuls，less这种动态生成的直接通过import引入即可

##### 具体操作

分别在html页面上起不同的id

```html
	<li class="active" id="logup">
		<a hre="">
			<span>注册</span>
		</a>
	</li>
	<li id="login">
		<a hre="dashboard-2.html">
			<span>登录</span>
		</a>
	</li>
	<li id="main">
		<a hre="dashboard-3.html">
			<span>首页</span>
		</a>
	</li>
```

###### 在views下写入main.art(随意起名)

```html
<table class="table table-bordered datatable dataTable" id="table-1" aria-describedby="table-1_info">
	<thead>
		<tr role="row"><th data-hide="phone" class="sorting_asc" role="columnheader" tabindex="0" aria-controls="table-1" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending">Rendering engine</th><th class="sorting" role="columnheader" tabindex="0" aria-controls="table-1" rowspan="1" colspan="1" aria-label="Browser: activate to sort column ascending">Browser</th><th data-hide="phone" class="sorting" role="columnheader" tabindex="0" aria-controls="table-1" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending">Platform(s)</th><th data-hide="phone,tablet" class="sorting" role="columnheader" tabindex="0" aria-controls="table-1" rowspan="1" colspan="1" aria-label="Engine version: activate to sort column ascending">Engine version</th><th class="sorting" role="columnheader" tabindex="0" aria-controls="table-1" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending">CSS grade</th></tr>
	</thead>
	
	<tfoot>
		<tr><th rowspan="1" colspan="1">Rendering engine</th><th rowspan="1" colspan="1">Browser</th><th rowspan="1" colspan="1">Platform(s)</th><th rowspan="1" colspan="1">Engine version</th><th rowspan="1" colspan="1">CSS grade</th></tr>
	</tfoot>
<tbody role="alert" aria-live="polite" aria-relevant="all"><tr class="gradeA odd">
			<td class="  sorting_1">Gecko</td>
			<td class=" ">Firefox 1.0</td>
			<td class=" ">Win 98+ / OSX.2+</td>
			<td class="center ">1.7</td>
			<td class="center ">A</td>
		</tr><tr class="gradeA even">
			<td class="  sorting_1">Gecko</td>
			<td class=" ">Firefox 1.5</td>
			<td class=" ">Win 98+ / OSX.2+</td>
			<td class="center ">1.8</td>
			<td class="center ">A</td>
		</tr><tr class="gradeA odd">
			<td class="  sorting_1">Gecko</td>
			<td class=" ">Firefox 2.0</td>
			<td class=" ">Win 98+ / OSX.2+</td>
			<td class="center ">1.8</td>
			<td class="center ">A</td>
		</tr><tr class="gradeA even">
			<td class="  sorting_1">Gecko</td>
			<td class=" ">Firefox 3.0</td>
			<td class=" ">Win 2k+ / OSX.3+</td>
			<td class="center ">1.9</td>
			<td class="center ">A</td>
		</tr><tr class="gradeA odd">
			<td class="  sorting_1">Gecko</td>
			<td class=" ">Camino 1.0</td>
			<td class=" ">OSX.2+</td>
			<td class="center ">1.8</td>
			<td class="center ">A</td>
		</tr><tr class="gradeA even">
			<td class="  sorting_1">Gecko</td>
			<td class=" ">Camino 1.5</td>
			<td class=" ">OSX.3+</td>
			<td class="center ">1.8</td>
			<td class="center ">A</td>
		</tr><tr class="gradeA odd">
			<td class="  sorting_1">Gecko</td>
			<td class=" ">Netscape 7.2</td>
			<td class=" ">Win 95+ / Mac OS 8.6-9.2</td>
			<td class="center ">1.7</td>
			<td class="center ">A</td>
		</tr><tr class="gradeA even">
			<td class="  sorting_1">Gecko</td>
			<td class=" ">Netscape Browser 8</td>
			<td class=" ">Win 98SE+</td>
			<td class="center ">1.7</td>
			<td class="center ">A</td>
		</tr><tr class="gradeA odd">
			<td class="  sorting_1">Gecko</td>
			<td class=" ">Netscape Navigator 9</td>
			<td class=" ">Win 98+ / OSX.2+</td>
			<td class="center ">1.8</td>
			<td class="center ">A</td>
		</tr><tr class="gradeA even">
			<td class="  sorting_1">Gecko</td>
			<td class=" ">Mozilla 1.0</td>
			<td class=" ">Win 95+ / OSX.1+</td>
			<td class="center ">1</td>
			<td class="center ">A</td>
		</tr></tbody></table>
```

再indexRouter.js中进行导入main

```js
import main from "../../views/main.art";

router.route("/index",function(req,res,next){
    res.render(main());
})
```

在app.js中进行跳转（如下两行）即可跳转

```js
import indexRouter from "./js/router/indexRouter.js";
indexRouter.go("/index");
```



###### 在views下写入logins.art(随意起名)

```html
<div class="login-container">
	
	<div class="login-header login-caret">
		
		<div class="login-content">
			
			<a href="index.html" class="logo">
				<img src="/picture/logo@2x.png" width="120" alt="">
			</a>
			
			<p class="description">Dear user, log in to access the admin area!</p>
			
			<!-- progress bar indicator -->
			<div class="login-progressbar-indicator">
				<h3>0%</h3>
				<span>logging in...</span>
			</div>
		</div>
		
	</div>
	
	<div class="login-progressbar">
		<div></div>
	</div>
	
	<div class="login-form">
		
		<div class="login-content">
			
			<div class="form-login-error">
				<h3>Invalid login</h3>
				<p>Enter <strong>demo</strong>/<strong>demo</strong> as login and password.</p>
			</div>
			
			<form method="post" role="form" id="form_login" novalidate="novalidate">
				
				<div class="form-group">
					
					<div class="input-group">
						<div class="input-group-addon">
							<i class="entypo-user"></i>
						</div>
						
						<input type="text" class="form-control" name="username" id="username" placeholder="Username" autocomplete="off">
					</div>
					
				</div>
				
				<div class="form-group">
					
					<div class="input-group">
						<div class="input-group-addon">
							<i class="entypo-key"></i>
						</div>
						
						<input type="password" class="form-control" name="password" id="password" placeholder="Password" autocomplete="off">
					</div>
				
				</div>
				
				<div class="form-group">
					<button type="submit" class="btn btn-primary btn-block btn-login">
						<i class="entypo-login"></i>
						Login In
					</button>
				</div>
				
				<!-- Implemented in v1.1.4 -->				<div class="form-group">
					<em>- or -</em>
				</div>
				
				<div class="form-group">
				
					<button type="button" class="btn btn-default btn-lg btn-block btn-icon icon-left facebook-button">
						Login with Facebook
						<i class="entypo-facebook"></i>
					</button>
					
				</div>
				
				<!-- 
				
				You can also use other social network buttons
				<div class="form-group">
				
					<button type="button" class="btn btn-default btn-lg btn-block btn-icon icon-left twitter-button">
						Login with Twitter
						<i class="entypo-twitter"></i>
					</button>
					
				</div>
				
				<div class="form-group">
				
					<button type="button" class="btn btn-default btn-lg btn-block btn-icon icon-left google-button">
						Login with Google+
						<i class="entypo-gplus"></i>
					</button>
					
				</div> -->				
			</form>
			
			
			<div class="login-bottom-links">
				
				<a href="extra-forgot-password.html" class="link">Forgot your password?</a>
				
				<br>
				
				<a href="#">ToS</a>  - <a href="#">Privacy Policy</a>
				
			</div>
			
		</div>
		
	</div>
	
</div>
```

再indexRouter.js中进行导入logins

```js
import logins from "../../views/logins.art";

router.route("/login",function(req,res,next){
    res.render(logins())
})
```

在app.js中进行跳转（如下两行）即可跳转

```js
import indexRouter from "./js/router/indexRouter.js";
indexRouter.go("/login");
```

###### 多页面跳转使用jquery

下载jquey插件

```js
 "devDependencies": {
    //"webpack": "^4.46.0",
    //"webpack-cli": "^3.3.12",
    //"webpack-dev-server": "^3.11.2",
    //"clean-webpack-plugin": "^3.0.0",
    //"html-webpack-plugin": "^4.5.1",
    //"copy-webpack-plugin": "^6.4.1",
    //"sme-router": "^0.12.8",
    //"art-template": "^4.13.2",
    //"art-template-loader": "^1.4.3",
    //用于对于js中import引入的css做解析，需要版本锁定，因为不同版本的webpack所对应的插件不同
  	//"css-loader":"^5.0.2",
  	//"style-loader":"^1.3.0",
     "jquery": "^3.6.0"
    }
}
```

在app.js进行引入jquery，添加绑定事件即可

```js
import indexRouter from "./js/router/indexRouter.js";
import $ from "jquery";
 $("#login").on("click",function(){
     indexRouter.go("/login");
 })
 $("#main").on("click",function(){
     indexRouter.go("/index");
 })
```

## 配置服务端

通过在控制台打入express-e会自动生成bin，public，routes，views四个文件夹和app.js和package.json文件

```
express-e
```

![](pic\image-20211216000923316.png)

```js
{
  "name": "server",
  "version": "0.0.0",
  "private": true,
  "main": "./bin/www",//nodemon自动观察时直接观察main    
  "scripts": {
    "start": "cross-env PORT:4020 nodemon"//使用cross-env插件，设置端口号4020，使用nodemon插件自动观察--->main即"main": "./bin/www",
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "ejs": "~2.6.1",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "morgan": "~1.9.1",
        //以上部分在express-e后自动加载上的插件
    "multer": "^1.4.4",//multer是Nodejs中用于处理文件上传 multipart/form-data数据的中间件，用于处理任何表单提交数据(包含非multipart/form-data类型的表单); 
    "art-template": "^4.13.2",////art模板
    "express-art-template": "^1.0.1"//为了使art-template模板引擎能够更好的和Express框架配合，模板引擎官方在原art-template模板引擎的基础上封装了express-art-template.
  },
  "devDependencies": {
    "nodemon": "^2.0.15",//可在检测到目录中的文件更改时通过自动重新启动节点应用程序来帮助开发基于 node.js 的应用程序
    "cross-env": "^7.0.3"//跨平台设置和使用环境变量
  }
}
```

之后执行`npm i` 进行安装

安装完成之后进行`npm start` 即直接执行`"start": "cross-env PORT:4020 nodemon"`

当控制台出现如下界面时证明运行成功

![](pic\Snipaste_2021-12-18_16-23-29.jpg)

去修改app.js

1. 引入multer 
   var multer = require('multer')();
    app.use(multer.none());
2. 配置
       art-templateapp.engine('art',require('express-art-template'));
       app.set('view engine ','art');
       app.set('view',path.join(__dirname,'views'))；

### 服务端数据发送至客户端

在views下index.ejs和app.ejs修改成尾缀为art的文件，并在views写入一个a.art(测试使用)

```html
{
    "data":{{data}},
    "list":{{list}}
}
```

此时去routes文件夹下的index.js

当拿到数据时利用res.render()进行渲染

```js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render("a",{data:1,list:[1,2,3,4]})
});

module.exports = router;
```

### 客户端访直接去访问服务端的数据

此时让前端直接去访问，需要在客户端（client）文件夹下的src下的app.js中添加如下代码

```js
fn();
async function fn(){
var data=await fetch("http://localhost:4020");
data=await data.json();
console.log(data);
}
```

会存在跨域问题

```base
Access to fetch at 'http://localhost:4020/' from origin 'http://localhost:4001' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

![](pic\Snipaste_2021-12-18_16-35-38.jpg)

<font color="red">**那么如何解决跨域问题**</font>

首先需要在webpack.config.js中需要加找到devServer: {}之后插入入proxy，即webpack开发配置API代理解决跨域问题

```js
 devServer: {
    // 目标静态服务器地址指向的文件夹
    //contentBase: path.join(__dirname, "./dist"),
    // 端口号
    //port: 4001,
    //webpack开发配置API代理解决跨域问题
    proxy:{
      "/api":{//捕获API的标志，如果API中有这个字符串，那么就开始匹配代理，
        target: "http://localhost:4020",//代理的API地址，就是需要跨域的API地址。地址可以是域名,如：http://www.baidu.com，也可以是IP地址：http://127.0.0.1:3000
        change0rigin: true,//这个参数可以让target参数是域名。target是域名的话，需要这个参数。
        pathRewrite: {
          '^/api':'/'
        }// 路径重写，也就是说会修改最终请求的API路径。设置pathRewrite: {'^/api' : '/'},后，最终代理访问的路径，遇到api就会改成/
      }
    },
    }
```

此时让前端直接去访问需要在客户端（client）文件夹下的src下的app.js中添加如下代码应该访问4001的地址而不是4020的地址

```js
fn();
async function fn(){
var data=await fetch("http://localhost:4001/api");
data=await data.json();
console.log(data);
}
```

因而在跨域解决后控制台会输出a的结果的全过程

![](pic\Snipaste_2021-12-18_17-16-12.jpg)

## 登录验证

### 前置配置第三方插件

使用第三方插件cookie-session，在server文件夹下装入cookie-session

```js
npm install cookie-session
```

之后在server中app.js配置cookie-session

```js
var cookieSession=require("cookie-session");

app.use(cookieSession({
  name:"session",
  keys:["key1","key2"]
}))
```

### 执行访问存储

login登录时做form表单的侦听

<font color="Aqua">下面是登录的一个art的例子</font>

```html
<form method="post" role="form" id="form_login" novalidate="novalidate">
				
				<div class="form-group">
					
					<div class="input-group">
						<div class="input-group-addon">
							<i class="entypo-user"></i>
						</div>
						
						<input type="text" class="form-control" name="username" id="username" placeholder="Username" autocomplete="off">
					</div>
					
				</div>
				
				<div class="form-group">
					
					<div class="input-group">
						<div class="input-group-addon">
							<i class="entypo-key"></i>
						</div>
						
						<input type="password" class="form-control" name="password" id="password" placeholder="Password" autocomplete="off">
					</div>
				
				</div>
				
				<div class="form-group">
					<button type="submit" class="btn btn-primary btn-block btn-login">
						<i class="entypo-login"></i>
						Login In
					</button>
				</div>
				
				<!-- Implemented in v1.1.4 -->				<div class="form-group">
					<em>- or -</em>
				</div>
				
				<div class="form-group">
				
					<button type="button" class="btn btn-default btn-lg btn-block btn-icon icon-left facebook-button">
						Login with Facebook
						<i class="entypo-facebook"></i>
					</button>
					
				</div>
							
			</form>
```

<font color=red>**下面是具体的步骤**</font>

在`client`src文件夹下js中建立business文件夹专门用于侦听form表单的

bussiness中建立ajax.js(这里的ajax是随意起的名并非AJAX)创建一个方法将方法暴露出去

```js
function ajax(){
    $("form").on("submit",submitHandler);//让form绑定sumbit方法（表单的方法）并触发submitHandler方法
}

async function submitHandler(e){
    e.preventDefault();//防止默认事件
    var fd=new FormData($("form")[0]);
    /*
    	FormData 对象的使用：
		1.用一些键值对来模拟一系列表单控件：即把form中所有表单元素的name与value组装成一个queryString
		2. 异步上传二进制文件。
    	FormData对象的操作方法，全部在原型中，自己本身没任何的属性及方法。
  
    	$("选择器")[0]  得到的对象是一个DOM对象。
    */
    var data=await fetch("http://localhost:4001/api/login",{method:"post",body:fd});
    //将得到的对象通过fetch发出去，使用post在server中的接口上也要使用post，并赋值给data
    data=await data.json();
	//接收回来数据
}


export default ajax;//将方法暴露出去
```

将ajax方法引入到前端路由接口client-->src-->routes-->indexRouter.js上在渲染页面之后执行ajax方法

```js
//import Router from "sme-router";
//import a from "../../views/a.art";
//import main from "../../views/main.art";
import logins from "../../views/logins.art";//引入渲染页面的logins.art
import ajax from "../bussiness/ajax.js";//引入ajax方法
//var router=new Router("app");
// router.route("/index:abc",function(req,res,next){
//     //console.log("aa");
//         console.log(req.body);
//         console.log(req.query);
//         console.log(req.params);
//     //res.render(main());
// })

// router.route("/index:abc",function(req,res,next){
//     //console.log(a({list:[1,2,3]}));
//     //res.render(a({list:[1,2,3]}));
   
// })

//router.route("/index",function(req,res,next){
//    res.render(main());
//})
router.route("/login",function(req,res,next){
    res.render(logins())//渲染页面
    ajax();//在渲染完成之后执行ajax方法
})
//router.route("/logout",function(req,res,next){
 //   console.log("cc")
//})
//router.route("/logup",function(req,res,next){
//    console.log("dd")
//})

//export default router;
```

此时服务端没有写接口需要在`server`下的routes文件夹下创建login.js

```js
var express = require('express');
var router = express.Router();

/* GET home page. */
    router.post('/', function(req, res, next) {//fetch发出去是posth那么在服务端也要使用post，路由中是'/'因为在服务端的接口已经有了/login了即app.use("/login",loginRouter);
        console.log(req.body);
       });


module.exports = router;
```

此时需要在`server`下的app.js中需要引入路由接口

```js
var loginRouter = require('./routes/login');

app.use("/login",loginRouter);
```

<font style="color:red">**如果在server的两步都没修改执行的情况下就会出现如下错误**</font>

![](pic\Snipaste_2021-12-19_12-22-28.jpg)



在页面输入后会产生如下结果

```
在服务端接收的数据如下所示
[Object: null prototype] { q: '' }
GET / 200 1.948 ms - 41

```

<font style="color:red;background:yellow">**为什么会是{ q: '' }**</font>

<font style="color:red">**解决办法**</font>
可能会存在多个表单，就让ajax中扫描的form固定写死为id标签的内容

```js
	修改前:$("form").on("submit",submitHandler);
    修改后:$("#form_login").on("submit",submitHandler);
}

	修改前:var fd=new FormData($("form")[0]);
    修改后:var fd=new FormData($("#form_login")[0]);
```

在修改后就会得到输入的结果

```
在服务端接收的数据即
[Object: null prototype] { username: 'EVI', password: 'EVI666' }
```

当在路由访问登录成功时设置这个session

```
req.session.user=user;
```

在服务端中的login.js需要修改其样式如下

```js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    // console.log(req.body)
    req.session.user=req.body.username;//当点击时把username存起来
    res.send({status:"ok",user:req.session.user});//存入后发送一个ok，并将username同时返回出去
});
module.exports = router;
```

在前端的控制台中可以看到服务器发送回的ok

```
{"status":"ok"}
```

### 验证登录步骤

当下一次重新登录时，判断是否登录，登录即可进入主页面

在客户端(`client`)bussiness中重新再写入一个新的js即verifyLogin.js(验证登录的方法)

```js
import router from "../router/indexRouter.js";
export async function verify(){//验证登录
    var data=await fetch("http://localhost:4001/api/login/verify");//login是传用户名和密码,建立二级路由防止直接再次进入login登录,不提交
    data=await data.json();//来等返回的数据
    return data;//将返回过来的值返回出去给调用这个方法的地方
}
export default {verify};
```

在服务端`server`中的login.js中添加/verify的访问

```js
var express = require('express');
var router = express.Router();

/* GET home page. */
   // router.post('/', function(req, res, next) {
        //console.log(req.body);
       // req.session.user=req.body.username;//当点击时把username存起来
       // res.send({status:"ok",user:req.session.user});//存入后发送一个ok，并将usernameue发送回去
       //});
       router.get("/verify",function(req,res,next){
        if(req.session.user){//如果username已经存起来的时候
            res.send({status:"ok",user:req.session.user});//如果存在发送一个ok，并将usernameue发送回去以便渲染页面使用
        }else{
            res.send({status:null})//否则发送一个null
        }
    })

module.exports = router;
```

在访问前进行验证就要通过客户端(`client`)中的indexRouter.js中进行访问

```js
//import Router from "sme-router";
//import a from "../../views/a.art";
//import main from "../../views/main.art";
//import logins from "../../views/logins.art";
//import ajax from "../bussiness/ajax.js";
import{verify} from "../bussiness/verifyLogin.js";//引入verify的方法
//var router=new Router("app");
// router.route("/index:abc",function(req,res,next){
//     //console.log("aa");
//         console.log(req.body);
//         console.log(req.query);
//         console.log(req.params);
//     //res.render(main());
// })

// router.route("/index:abc",function(req,res,next){
//     //console.log(a({list:[1,2,3]}));
//     //res.render(a({list:[1,2,3]}));
   
// })

router.route("/index",async function(req,res,next){
    var data=await verify();//将verify()方法存入到data变量中
    console.log(data);
    if(!data.status){
        router.go("/login");//判断data的状态当data.status不存在时就跳转到登录页面
    }else{
        res.render(main());//否则如果存在就渲染页面
    }

    //res.render(main());
})
//router.route("/login",function(req,res,next){
//    res.render(logins())
//    ajax();
//})
//router.route("/logout",function(req,res,next){
//    console.log("cc")
//})
//router.route("/logup",function(req,res,next){
//    console.log("dd")
//})

export default router;
```

在客户端(`client`)中ajax.js中（即登录方法的js中）添加判断登录的状态，假使已经登录了，就直接跳转到index页面上

```js
import router from "../router/indexRouter.js";

//function ajax(){
  //  $("#form_login").on("submit",submitHandler);//让form绑定sumbit方法（表单的方法）并触发submitHandler方法
//}

//async function submitHandler(e){
   // e.preventDefault();//防止默认事件
   // var fd=new FormData($("#form_login")[0]);
    /*
    	FormData 对象的使用：
		1.用一些键值对来模拟一系列表单控件：即把form中所有表单元素的name与value组装成一个queryString
		2. 异步上传二进制文件。
    	FormData对象的操作方法，全部在原型中，自己本身没任何的属性及方法。
  
    	$("选择器")[0]  得到的对象是一个DOM对象。
    */
   // var data=await fetch("http://localhost:4001/api/login",{method:"post",body:fd});
    //将得到的对象通过fetch发出去，并赋值给data
   // data=await data.json();
	//接收回来数据
    if(data.status) router.go("/index");//查看数据状态如果存在就跳转到index页面上
}


//export default ajax;//将方法暴露出去
```

## 退出登录

在页面上找到退出登录的部分Log Out并加上id="logoutBN"进行引用使用

```html
<li id="logoutBN">
				<a hre="extra-login.html">
					Log Out <i class="entypo-logout right"></i>
				</a>
			</li>
```

此时写入退出的方法，写在客户端(`client`)中verifyLogin.js中

```js
import router from "../router/indexRouter.js";
//export async function verify(){//验证登录
//    var data=await fetch("http://localhost:4001/api/login/verify");//login是传用户名和密码,建立二级路由防止直接再次进入login登录,不提交
//    data=await data.json();//来等返回的数据
//    return data;//将返回过来的值返回出去给调用这个方法的地方
//}
export async function logout(){
    var data=await fetch("http://localhost:4001/api/login/logout");//当执行退出方法时访问服务器
    data=await data.json();//获取返回的数据
    router.go("/login");//重新跳转到login页面
}

export default {verify,logout};
```

退出任何时候都可以调用就将退出方法写在客户端(`client`)app.js上

```js
//import indexRouter from "./js/router/indexRouter.js";
//import $ from "jquery";
import {logout} from "./js/bussiness/verifyLogin.js"//引用logout方法
//import "./css/a.css"
//indexRouter.go("/index");
 //$("#login").on("click",function(){
 //    indexRouter.go("/login");
 //})
 //$("#main").on("click",function(){
 //    indexRouter.go("/index");
 //})
 $("#logoutBN").on("click",logout)//点击logotBN时就执行logout方法
//indexRouter.go("/index:abc?name=EVI&age=20",{a:1,b:2});
//fn();
//async function fn(){
//var data=await fetch("http://localhost:4001/api");
//data=await data.json();
//console.log(data);
//}

```

因为退出时访问服务器就要在服务器`server`中login.js中添加路由

```js
var express = require('express');
var router = express.Router();

/* GET home page. */
//    router.post('/', function(req, res, next) {
        //console.log(req.body);
//        req.session.user=req.body.username;//当点击时把username存起来
//        res.send({status:"ok",user:req.session.user});//存入后发送一个ok
//       });
//       router.get("/verify",function(req,res,next){
 //       if(req.session.user){//如果username已经存起来的时候
 //           res.send({status:"ok",user:req.session.user});//如果存在发送一个ok
//        }else{
//            res.send({status:null})//否则发送一个null
 //       }
//    })
    router.get("/logout",function(req,res,next){
        req.session.user=null;//当客户端访问路由/logout时就将存入的信息变成null
        res.send({status:null});//并向客户端发送信息为null
    })

module.exports = router;
```

