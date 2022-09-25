/**
 * 手动实现打包器
 * 安装依赖
 * @babel/parser  用于分析源码，产出 AST
 * @babel/traverse 用于遍历 AST ， 找到 import 声明
 * @babel/core 用于编译， 将源码编译为符合 ES5 规范的代码
 * @babel/preset-env， 搭配 @babel/core 使用
 * resolve， 用于获取依赖的绝对路径
 * 安装命令 npm install --save @babel/parser @babel/traverse @babel/core @babel/preset-env resolve
 */

const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')
const resolve = require('resolve').sync

// 维护一个全局 ID 并通过遍历 AST 访问 importDeclaration 节点， 将依赖收集到 deps 数组中， 同时完成 babel 编译降级
let ID = 0;

// 该模块对应 ID ，该模块路径， 该模块的依赖数组， 该模块经过babel编译后的代码
function createModuleInfo(filePath){
  // 读取模块源码
  const content = fs.readFileSync(filePath,"utf-8")
  // 对源码进行 AST 产出
  const ast = parser.parse(content,{
    sourceType:"module"
  })
  // 相关模块依赖数组
  const deps = [];
  // 遍历 AST 将依赖收集到 deps 数组中
  traverse(ast,{
    ImportDeclaration:({node}) => {
      deps.push(node.source.value)
    }
  });
  const id = ID++;
  // 编译为 ES5规范代码
  const { code } = babel.transformFromAstAsync(ast,null,{
    presets:["@babel/preset-env"]
  });
  return {
    id,
    filePath,
    deps,
    code
  }
}

// 生成整个项目的依赖图，代码如下
function createDependencyGraph(entry){
  // 获取模块信息
  const entryInfo = createModuleInfo(entry);
  // 项目依赖树
  const graphArr = [];
  graphArr.push(entryInfo);
  // 以入口模块为起点，遍历整个项目依赖的模块，并将每个模块信息保存到 graphArr 中进行维护
  for(const module of graphArr){
    module.map = { }
    module.deps.forEach(depPath => {
      const baseDir = path.dirname(module.filePath);
      const moduleDepPath = resolve(depPath,{basedir});
      const moduleInfo = createModuleInfo(moduleDepPath);
      graphArr.push(moduleInfo);
      module.map[depPath] = moduleInfo.id;
    });
  }
  return graphArr;
}

// 基于 graphArr 内容 对项目模块进行打包
function pack(graph) {
  const moduleArgArr = graph.map( module => {
    // 创建一个对应每个模块的模板对象
    return `${module.id}:{
      factory:(exports,require)=>{
        ${module.code}
      },
      map:${JSON.stringify(module.map)}
    }`
  })

  // 在 factory 对应内容中，包裹模块代码，注入 exports 和 require 两个参数，同时构造一个 IIFE 风格的代码区块，用于将依赖图中的代码串联在一起
  /**
   * 使用 IIFE 方式 保证模块代码不会影响到全局作用域
   * 构造好的项目依赖图数组将作为形参（modules）被传递给 IIFE
   * 构造的 require（id） 方法的意义如下：
   * require(map[requireDeclarationName]) 按顺序递归调用各个依赖模块
   * 调用 factory 方法执行模块相关代码
   * 最终返回 modules.exports 对象， 初始值为空对象，但在一次次调用 工厂函数后， 其内容已经包含了模块对外暴露的内容
   */
  const iifeBundler = `(function(modules){
    const require = id => {
      const { factory, map } = modules[id];
      const localRequire = requireDeclarationName => require(map[requireDeclarationName]);
      const module = {exports:{}};
      factory(module.exports,localRequire);
      return module.exports;
    }
    require(0);
  })({${moduleArgArr.join()}})`


}