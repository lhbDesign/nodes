
// 数组方法重构
Object.defineProperties(Array.prototype,{
  //改变原数组
  myPush:{
    value(){
      for(let i = 0; i < arguments.length ; i++) this[this.length] = arguments[i];
      return this.length
    }
  },
  myUnshift:{
    value(){
      let alen = arguments.length
      let len = this.len
      for(let i = len + alen - 1; i >= 0; i--){
        if(i - alen >= 0) this[i] = this[ i - alen ];
        else this[i] = arguments[i]
      }
      return this.length
    }
  },
  myPop:{
    value(){
      if(!this.length) return
      let value = this[this.length - 1]
      this.length--
      return value
    }
  },
  myShift:{
    value(){
      if(!this.length) return
      let value = this[0]
      for(let i = 1 ; i < this.length ; i++) this[i-1] = this[i]
      this.length--
      return value
    }
  },
  myResver:{
    value(){
      if(this.length = 0) return
      for(let i = 0; i < ~~(this.length/2) ; i++){
        [this[i],this[this.length-1]] = [this[this.length-1],this[i]]
      }
      return this
    }
  },
  myFill:{
    value(val,start,end){
      if(start === undefined) start = 0
      start = start < 0 ? (start + this.length < 0 ? 0 : start + this.length) : start
      start = ~~start
      if(end === undefined || end > this.length) end = this.length
      end = end < 0 ? (end + this.length < 0 ? 0 : end + this.length) : end
      end = ~~end
      for(let i = start ; i < end ; i++) this[start] = val
      return this
    }
  },
  mySplice:{
    value(){
      if(!arguments) return []
      let start = arguments[0],count = arguments[1],arg = [...arguments].slice[2]
      start=~~start
      if(start < 0) start = start + this.length < 0 ? 0 : start + this.length 
      if(count === undefined || count + start > this.length) count = this.length - start
      count=~~count
      if(count < 0) count = 0
      let newArr = []
      for(let i = start ; i < this.length; i++){
        if(i < start + count) newArr[newArr.length] = this[i];
        this[i] = this[i+count]
      }
      this.length -= count
      if(!arg.length) return newArr
      for(let i = this.length + arg.length - 1; i > start; i-- ){
        if(i >= start + arg.length) this[i] = this[i - arg.length];
        else this[i] = arg[i - start]
      }
      return newArr
    }
  },
  mySort:{
    value(cb){
      for(let i = 0; i < this.length - 1; i++){
        for(let j = 0; j < this.length - 1 - i; j++){
          if(cb(this[j],this[j+1]) > 0) [this[j],this[j+1]] = [this[j+1],this[j]]
        }
      }
      if(this[j] === this[j-1]) i++
      return this
    }
  },
  //以下方法不改变原数组
  //chunk 将这个数组分成指定等分,最后不足的为一组,返回等分后的新二堆数组
  chunk:{
    value(count){
      if(typeof count !== 'number') throw new TypeError(count + 'must be a number')
      if(count < 1 || !Number.isInteger(count)) throw new RangeError('数据参数不正确')
      let arr = []
      for(let i = 0; i < this.length; i++){
        if(!arr[arr.length - 1] || arr[arr.length - 1].length === count) arr[arr.length] = []
        arr[arr.length - 1].push(this[i])
      }
      return arr
    }
  },
  myForEach:{
    value(cb,thisArg){
      for(let i = 0; i < this.length; i++){
        if(!(i in this)) continue
        cb.call(thisArg,this[i],i,this)
      }
    }
  },
  myMap:{
    value(cb,thisArg){
      let newArr = []
      for(let i = 0; i < this.length ; i++){
        if(!(i in this)) continue
        newArr[i] = cb.call(thisArg,this[i],i,this)
      }
      return newArr
    }
  },
  myReduce:{
    value(cb,init){
      let i = 0
      if(init === undefined){ init=this[0]; i++ }
      for(;i < this.length; i++){
        init = cb(init,this[i],i,this)
      }
      return init
    }
  },
  myReduceRight:{
    value(cb,init){
      let i = this.length -1
      if(init === undefined){ init=this[this.length-1]; i--}
      for(;i >= 0; i--){
        init = cb(init,this[i],i,this)
      }
      return init
    }
  },
  myIndexOf:{
    value(item,start){
      if(item === undefined || start > this.length) return -1
      start = ~~start
      if(start < 0) start = start + this.length < 0 ? 0 : start + this.length
      for(let i = start; i < this.length; i++){
        if(this[i] === item) return i
      }
      return -1
    }
  },
  myLastIndexOf:{
    value(item,start){
      if(item === undefined || start + this.length < 0 ) return -1
      if(start === undefined) start = this.length
      start = start < 0 ? start + this.length : ~~start
      for(let i = start; i >= 0; i--) {
        if(this[i] === item) return i
      }
      return -1
    }
  },
  myConcat:{
    value(){
      if(!arguments.length) return this
      let newArr = this
      for(let i = 0; i < arguments.length; i++){
        if(Array.isArray(arguments[i])){
          for(let j = 0; j < arguments[i].length; i++) newArr[newArr.length] = arguments[i][j]
        }else newArr[newArr.length] = arguments[i]
      }
      return newArr
    }
  },
  myJoin:{
    value(){
      if(arguments[0] === undefined) arguments[0] = ''
      arguments[0] = String(arguments[0])
      let str = ''
      for(let i = 0; i < this.length ; i++)  
      str += i === this.length - 1 ?  this[i] : this[i] + arguments[0];
      return str
    }
  },
  myIncludes:{
    value(){
      for(let i = 0; i < this.length ; i++){
        if(!(i in this)) continue
        if(arguments[0] === this[i]) return true
      }
      return false
    }
  },
  mySlice:{
    value(){
      if(!arguments.length || (!arguments[0] && !arguments[1])) return this
      let start = arguments[0], end = arguments[1]
      start = ~~start
      if(isNaN(end)) return []
      start = start < 0 ? (start + this.length < 0 ? 0 : start + this.length) : start
      end = end < 0 ? (end + this.length < 0 ? 0 : end + this.length) : (end > this.length ? this.length : ~~end)
      let newArr = []
      for(let i = start ; i < end ; i++){
        if(!(i in this)){
          newArr.length++
          continue
        }
        newArr[newArr.length] = this[i]
      }
      return newArr
    }
  },
  myFind:{
    value(cb,thisArg){
      for(let i = 0 ; i < this.length ; i++){
        if(!(i in this)) continue
        if(cb.call(thisArg,this[i],[i],this)) return this[i]
      }
    }
  },
  myEvery:{
    value(cb,thisArg){
      for(let i = 0; i < this.length ; i++){
        if(!(i in this)) continue
        if(!cb(thisArg,this[i],[i],this)) return false
      }
      return true
    }
  },
  mySome:{
    value(cb,thisArg){
      for(let i = 0; i < this.length; i++){
        if(!(i in this)) continue
        if(cb.call(thisArg,this[i],[i],this)) return true
      }
      return false
    }
  },
  myFlatMap:{
    value(cb,thisArg){
      let newArr = this
      let res = []
      if(cb){
        
      }
    }
  },
  myFilter:{
    value:function(cb,thisArg){
      if(typeof cb !== 'function') throw new TypeError(cb+'is not a funtion')
      let arr = []
      for(let i = 0; i < this.length ; i++){
        if(cb.call(thisArg,this[i],i,this)) arr[arr.length] = this[i]
      }
      return arr
    }
  }
})
// 函数方法重构
Object.defineProperties(Function.prototype,{
  myBind1:{
    value:function(thisArg){
      // 保存当前的 this, this 就是我们需要改造的函数
      let cb = this
      // 拿到我们 bind 传入的参数, 放到一个数组里面
      let arg = [...arguments].slice(1)
      // 返回了一个函数,  除了直接调用,还可以使用 new 的方法 调用
      return function F(){
        // 判定是否是 使用了 new 的方式来调用, 使用new 的话, 实例 就是 F 构造出来的
        if(cb instanceof F){
          return new cb(...arg,...arguments)
        }else{
          // bind()() 可以二次传参,  是按照顺序传入我们被改造的函数中
          return cb.apply(thisArg,[...arg,...arguments])
        }
      }
    }
  },
  myCall:{
    value(thisArg){
      thisArg = thisArg || window
      thisArg.fn = this
      let arg = [...arguments].slice(1)
      const result = thisArg.fn(...arg)
      delete thisArg.fn
      return result
    }
  },
  myApply:{
    value(thisArg){
      thisArg = thisArg || window
      thisArg.fn = this
      let result
      if(arguments[1]) result = thisArg.fn(...arguments[1]);
      else result = thisArg.fn()
      delete thisArg.fn
      return result
    }
  },
  // 寄生继承
  extends:{
    value(superClass){
      function F(){}
      F.prototype = superClass.prototype
      if(superClass.prototype.constructor !== superClass){
        Object.defineProperty(superClass.prototype,'constructor',{ value:superClass })
      }
      let proto = this.prototype
      this.prototype = new F()
      let names = Reflect.ownKeys(proto)
      for(let i = 0; i < names.length; i++){
        let desc = Object.getOwnPropertyDescriptor(proto,names[i])
        Object.defineProperty(this.prototype,names[i],desc)
      } 
      this.prototype.super = function(arguments){
        superClass.apply(this,arguments)
      }
      this.prototype.supers = superClass.prototype
    }
  }
})
//! 以下方法会改变原数组
// push 方法
Array.prototype.myPush = function(){
  for(let i = 0;i < arguments.length; i++){
    this[this.length] = arguments[i]
  }
  return this.length
}
// unshift 方法 首位添加数据
Array.prototype.myUnshift = function(){
  // let len = this.length + arguments.length 
  let alen = arguments.length
  len = this.length
  for(let i = len + alen -1;i >= 0; i--){
    if(i - alen >= 0) this[i] = this[i - alen];
    else this[i] = arguments[i]
  }
  return this.length
}
// pop方法 删除数组中的最后一位,
Array.prototype.myPop = function(){
  let n = this.length
  if(!n) return // 如果是一个空数组,则返回 undefined
  let value = this[this.length-1] // pop方法和shift方法会返回这个被删除的数据
  this.length--
  return value
}
// shift 方法 删除数组中的第一位
Array.prototype.myShift = function(){
  if(!this.length) return
  let res = this[0]
  for(let i = 0 ; i < this.length - 1; i++){
    this[i] = this[i+1]
  }
  this.length--
  return res
}
// fill 方法 替换数组中的参数,第二个参数是开始位置,第三个参数是结束位置
Array.prototype.myFill = function(val,start,end){
  if(!this.length) return []
  start = ~~start;
  if(end === undefined || end > this.length) end = this.length;
  end = ~~end;
  if(start < 0) start = start + this.length < 0 ? 0 : start + this.length;
  if(end < 0) end = end + this.length < 0 ? 0 : end + this.length;
  for(let i = start; i < end;i++){
    this[i] = val
  }
  return this
}
// resver 方法 反转数组 
Array.prototype.myResver = function(){
  let n = this.length
  if(n == 0) return
  for(let i = 0; i < ~~(this.leng/2) ; i++){
    [this[i],this[this.length - 1 - i]] = [this[this.length - 1 - i],this[i]]
  }
  return this
}
// splice 方法 （开始索引, 删除多少个, 插入数据1, 插入数据2,，，） 从哪里开始索引，从哪里插入，返回值：删除数据组成的数组 ， 只写一个索引，则索引后面全删除，不写则返回一个空数组
Array.prototype.mySplice = function(){
  if(!arguments) return []
  let start = arguments[0],count = arguments[1],arg = [...arguments].slice(2)
  start = ~~start;
  if(start < 0) start = start + this.length < 0 ? 0 : start + this.length ;
  if(count === undefined) count = this.length - start;
  count = ~~count ;
  if(count < 0) count = 0;
  if(count + start > this.length) count = this.length - start;
  let newArr = [];
  for(let i = start ; i < this.length; i++){
    if(i < start + count) newArr[newArr.length] = this[i];
    this[i] = this[i + count]
  }
  this.length -= count;
  if(!arg.length) return newArr;
  for(let j = this.length + arg.length - 1; j >= start ; j--){
    if(j >= start + arg.length) this[j] = this[j - arg.length];
    else this[j] = arg[j - start];
  }
  return newArr;
}
// 旧方法
Array.prototype.mySplice2 = function(){
  //先判断有没有传参,没有返回 []
  if(arguments.length == 0) return []
  // 拿到 n 是从第几位删除的下标
  let n = arguments[0]
  // 创建一个空数组  用来存返回值 返回被删除的数据
  let newArr = []
  // 如果没有写第二个参数,直接修改原数组 length 
  if(!arguments[1]){
    for(let i = n,j=0;i < this.length ; i++,j++){
      newArr[j] = this[i]
    }
    this.length = n
    return newArr
  } 
  // b 是需要删除几位,是个数
  let b = arguments[1]
  let lastArr = [] // 创建一个数组,用来存最后要覆盖原数组的数据
  for(let i = 0; i < n; i++) lastArr[i] = this[i]  // 先把最前面不删除的几个拿到
  for(let j = 2; j < arguments.length ; j++){ // 把要插入的数据,遍历,插入到新数组中
    lastArr.push(arguments[j]) 
  }
  for(let i = n,k=0; k < b ;i++,k++){
    if(n + k > this.length-1) break // 判断如果删除的个数,加上从第几位删除的个数,大于原数组长的时候,打断循环
    newArr[k] = this[i] // 得到被删除的数据组成的数组  返回值就是这个
  }
  for(let i = n + b; i < this.length; i++){ // n + b 就是最后面不需要删除的数据开始的下标 值肯定小于数组最后一位的下标,逐个遍历,push到新数组中
    lastArr.push(this[i])
  }
  // 最后修改原数组的值 先把原数组的 length 长度 修改成 新数组一样的长度,然后再遍历
  this.length = lastArr.length
  for(let i = 0; i < lastArr.length ; i++){
    this[i] = lastArr[i]
  } 
  return newArr
}
// sort 方法 这里只考虑数值的升序和降序,字符编码的比较没有考虑 sort 底层用的是冒泡排序
Array.prototype.mySort = function(cb){
  for(let i = 0; i < this.length - 1; i++){
    for(var j = 0; j < this.length - i -1; j++){
      if(cb(this[j],this[j + 1]) > 0) [this[j],this[j + 1]] = [this[j + 1],this[j]];
    }
    if(this[j] === this[j - 1]) i++;
  }
}
//! 以下方法不改变原数组
// forEach 方法 遍历
Array.prototype.myForEach = function(cb){
  for(let i = 0 ; i < this.length ; i++){
    if(!(i in this)) continue;
    cb(this[i],i,this);
  }
}
// map 方法 最终返回的新数组长度和原数组相同
Array.prototype.myMap = function(cb){
  let newArr = []
  for(let i = 0; i < this.length ; i++){
    if(!(i in this)) continue;
    newArr[i] = cb(this[i],i,this)
  }
  return newArr
}
// reduce 方法 (prev,item,index,arr) 默认值, 第一次循环开始,默认值不写 prev 是下标为 0 的数据, item 是下标为 1 的数据, index 是 1, 写了默认值, prev 就是默认值,  item 是下标为 0 的数据, index 是 0.
Array.prototype.myReduce = function(cb,init){
  let i = 0;
  if(init === undefined){
    init = this[0];
    i = 1
  }
  for(; i < this.length ; i++){
    init = cb(init,this[i],i,this)
  }
  return init
}
// reduceRight 方法 和 reduce 都一样 遍历方向相反
Array.prototype.myReduceRight = function(cb,init){
  let i = this.length - 1;
  if(init === undefined){
    init = arr[i];
    i--
  }
  for(; i >= 0 ; i--){
    init = cb(init,this[i],i,this)
  }
  return init
}
// concat 方法 数组拼接 返回值是组装好的新数组
Array.prototype.myConcat = function(){
  if(!arguments.length) return this
  let newArr = this
  for(let i = 0; i < arguments.length ; i++){
    if(Object.prototype.toString.call(arguments[i]) === '[object Array]'){
      for(let j = 0;j < arguments[i].length ; j++) newArr[newArr.length] = arguments[i][j] 
    }else
    newArr[newArr.length] = arguments[i]
  }
  return newArr
}
// join 方法 把数组链接成为字符串，返回值：链接好的字符串 什么都不填() undefined,null??
Array.prototype.myJoin = function(){
  if(arguments[0] === undefined) arguments[0] = ','
  arguments[0] = String(arguments[0])
  let str = ''
  for(let i = 0 ; i < this.length; i++){
	  str += i === this.length -1 ? this[i] : this[i] + arguments[0];
  }
  return str
}
// includes 方法 如果有这个数据 返回 true 没有 返回false
Array.prototype.myIncludes = function(){
  for(let i = 0 ; i < this.length; i++){
    if(!(i in this)) continue;
    if(arguments[0] === this[i]) return true;
  }
  return false
}
// slice 方法 截取数组内容，返回值：截取数值的新数组，包开始不包结束，可以写负数，表示倒数
Array.prototype.mySlice = function(){
  if(!arguments.length || (!arguments[0] && !arguments[1])) return this
  let start = arguments[0],end=arguments[1];
  start = ~~start // 取整 如果是非数字,直接就会转换成0
  if(isNaN(end)) return []; // 非数字,结束位置就是数组长度
  end = end > this.length ?  this.length : parseInt(end); // 取整 取整的同时转了数字
  start = start < 0 ? (start+ this.length < 0 ? 0 : start + this.length) : start;
  end = end < 0 ? (end + this.length < 0 ? 0 : end + this.length) : end;
  let newArr = []
  for(let i = start; i < end; i++){
    if(!(i in this)) {
      newArr.length++
      continue
    };
    newArr[newArr.length] = this[i];
  }
  return newArr
}
// indexOf 方法  从前向后查找,找到该数据,返回第一次查找到的下标,没有返回-1
Array.prototype.myIndexOf = function(item,from){
  if(!arguments.length) return -1
  from = ~~from
  if(from < 0) from =  from + this.length < 0 ? 0 : from + this.length
  for(let i = from ; i < this.length ; i++){
    if(this[i] === item) return i;
  }
  return -1
}
// lastIndexOf 方法 从后向前查找,找到返回该数据下标,没找到返回 -1
Array.prototype.myLastIndexOf = function(item,from){
  if(!arguments.length) return -1
  if(from === undefined) from = this.length
  from = ~~from
  if(from > this.length) from = this.length
  if(from + this.length < 0) return -1
  if(from < 0) from = from + this.length
  for(let i = from ; i >= 0; i--){
    if(this[i] === item) return i;
  }
  return -1
}
// find 方法 查找数组中满足条件的项,以return的形式书写返回条件, true 的时候 返回满足条件的第一项
Array.prototype.myFind = function(cb){
  for(let i = 0; i < this.length ; i++){
    if(!(i in this)) continue;                                                                                        if(cb(this[i],i,this)) return this[i]
  }
}
// findIndex 找下标,没找到返回 -1
// every 方法 判断数组中是否每一个都满足条件, 都满足 返回 true 有一个不满足 返回 false
Array.prototype.myEvery = function(cb){
  if(typeof cb !== 'function') return cb + 'is not a function'
  for(let i = 0 ; i < this.length ; i++){
    if(!(i in this)) continue;
    if(!cb(this[i],i,this)) return false;
  }
  return true
}
// some 方法 判断数组中是否某一个满足条件, 有一个满足 返回 true 都不满足 返回 false
Array.prototype.mySome = function(){
  if(typeof cb !== 'function') return cb + 'is not a function'
  for(let i = 0; i < this.length ; i++){
    if(!(i in this)) continue;
    if(cb(this[i],i,this)) return true
  }
  return false
}
// filter 方法 过滤数组 返回满足条件的数组
Array.prototype.myFilter = function(cb){
  let res = []
  for(let i = 0; i < this.length ; i++){
    if(!(i in this)) continue;
    if(cb(this[i],i,this)) res.push(this[i])
  }
  return res 
}
// faltMap 方法 会对原数组每一个成员执行一次map方法 返回新数组 扁平化数组 扁平一层
Array.prototype.myFlatMap = function(cb){
  let newArr = this;
  let res = [];
  if(cb){
    for(let i = 0; i < this.length ; i++){
      if(!(i in this)) continue;
      newArr[i] = cb(this[i],i,this)
    }
  }
  for(let i = 0; i < newArr.length; i ++){
    if(Object.prototype.toString.call(newArr[i]) === '[object Array]')res.concat(...newArr[i]);
    else{
      res.push(newArr[i])
    }
  }
}
// Array.isArray()
Array.isArray_ = function(item){
  return item && item.constructor === Array;
}
