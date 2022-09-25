// 自定义 npm init
const desc = prompt('请输入项目描述','项目描述...')
module.exports = {
  key:'value',
  name:prompt('name',process.cwd().split('/').pop()),
  version:prompt('version?','0.0.1'),
  description:desc,
  main:'index.js',
  repository:prompt('github repository url','',function(url){
    if(url){
      run('touch README.MD');
      run('git init');
      run('git add REAME.MD');
      run('git commit -m "first commit"');
      run('git remote add origin $(url)');
      run('git push -u origin master');
    }
    return url
  })
}

// CSR 应用的 Babel 编译流程， 业务方使用代码： webpack.config.js
module.exports={
  presets:['@lucas/babel-preset/app']
}
//相关 wepack 配置
module.exports = {
  module:{
    rules:[
      {
        test:/\.js$/, // 对于js文件，使用以下其中的一种方式进行编译，这里对 依赖 和应用 进行和区分
        oneOf:[
          { // 此处用于编译 非依赖
            exclude:/node_modules/,
            loader:'babel-loader',
            options:{
              cacheDirectory:true, // 开启缓存
            }
          },
          {
            loader:'babel-loader',
            options:{
              cacheDirectory:true,
              configFile:false,
              presets:['@lucas/bable-preset/dependencies'],
              compact:false
            }
          }
        ]
      },
    ]
  }
}



