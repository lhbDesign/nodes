## 写入JS的方法

1. 使用script标签直接在内部写入

2. 使用外部格式写js并使用<script src = "./js/a.js"></script>导入外部js文件

3. 模块加载js文件（后面会学）

   <!--js代码只能写在head和body里面-->

   <!--虽然把js代码写到这两个位置之外的地方在代码执行的时候并不会报错，这是因为在代码执行的时候浏览器会识别并把错误纠正，但是这是一个很麻烦的过程，所以尽量别找这个麻烦-->

引入外部js文件相当于把js文件的代码写入了当前文件中

同步：把前面的加载并执行结束后再去执行下面的     默认     

异步：加载时不会等这一部分执行完成，会继续向下执行     在引入js来源的代码后加“async”即可触发该代码段异步

<u>如果引入js文件的这一句代码需要等前面的代码加载并渲染结束后才执行，那么就可以在这句代码的js引入路径后加“defer”，这表示这句代码要等它前面的那句渲染结束后才能执行     它并不改变这一句代码本身的异步或同步情况</u>

代码的加载是需要时间的

加载文件头、加载文件内容、关闭加载通道      这是加载文件的完整过程

### 阻止超链接页面刷新              

`<a href="JavaScript:void(0)"`



行注释      //      Ctrl+/

块注释     /*    */     Alt+Shift+A

## JS变量命名规则

1. 变量必须以 字母 或 下划线 或 $ 开头

2. 变量名不能使用 关键词 或 保留字

3. 变量命名时使用驼峰命名法   getObjectName

   如果是临时变量或参数，可以使用下划线开头进行区分    _name

4. 常量在命名时使用全大写，定义常量使用const    

   `const EVENT_ID = 01;`

   常量一经定义就不能再进行赋值等操作改变常量

   <!--css和标签中使用横线命名法，因为html是不区分大小写的-->

   

# **数据类型**

​	js中一共有五种<u>基础数据类型</u>和一种<u>复杂数据类型</u>	

```
String       字符串            Object  对象
Number       数值
Boolean      布尔
undefined
null
```

<!--使用  typeof(变量)  来判断这个变量的 **值** 的类型-->

### 定义一个变量  a

1. 如果在此之前并没有对a的任何声明及赋值，那么计算机将开辟出一个空间给a，并且由于没有给a任何声明，此时a的类型为undefined
2. 如果在定义a之前已经有了对a的赋值或其他声明，那么在对a的这个定义之后，计算机将使a继续沿用之前的声明
3. 函数的优先级要高于变量定义及声明



# 数据类型转换

<!--隐式转换其实是强制转换-->

## **转换为字符串**

**变量 = String(变量)**

数值

```javascript
var a=3; 
console.log(String(a));              // 字符串3
```



对象

```js
var a={a:1,b:2};   
console.log(String(a));         // [object Object]

var a={a:1};   
console.log(String(a));         // [object Object]
```

​			<!--所有对象转换为字符串都是[object Object]-->

数组

```js
var arr=[1,2,3];     
console.log(String(arr));             // 字符串1，2，3

var arr=[1];    
console.log(String(arr));            // 字符串1

var arr=[];    
console.log(String(arr));         // 空字符串
```



toString()

```js
// 数值变量.toString(进制)
var a=255;    
console.log(a.toString(16));         // ff
// toString会把变量按指定的进制转换为该进制下的数，然后再将这个数转换为字符串
```



toFixed()

```js
//  变量.toFixed(保留小数位)
var a=123.4567;    
console.log(a.toFixed(2));            // 123.46

//  toFixed()会把变量按照要求的小数位保留，并进行四舍五入
```



## **转换为数值**

**number(变量)**

<!--以下均console.log(Number(a));-->

字符串

```js
var a="10";           10
var a="10c";          NaN
var a="c10";      	  NaN
var a="";			  0
```

###### 			

布尔型				

```js
var a=true;        1
var a=false;		0
```

###### 				

对象		

```js
var a={a:1,b:2};		    // NaN
var a={a:1};		    // NaN
var a={};		    // NaN
```

​	<!--对象会先转换为字符串类型[Object Object] 然后再由字符串转换为数值  所以对象转换为数值都为NaN-->

###### 				

数组

```js
var a=[1,2,3];		    // NaN
var a=[1];		    // 1
var a=[];		    // 0
```

​		<!--数组在转换时也是先转换为字符串，再由字符串转换为数值-->

###### 				

其他

```js
var a=undefined;		   // NaN
var a=null;		    // 0
```

​		<!--null表示将a中的内容清空，所以a并不是没有定义-->

### **parseFloat(字符串) **

将变量字符串转换为10进制小数，且只能是十进制小数

### **parseInt()**

当只有一个变量时        

默认，将变量当成10进制下的字符串，再转换为10进制下的整数

```js
var a="10";		
console.log(parseInt(a));		//10

var a="10.123";		
console.log(parseInt(a));		//10

var a="10a";		
console.log(parseInt(a));		//10

var a="a10";		
console.log(parseInt(a));		//NaN

var a=true;		
console.log(parseInt(a));		//NaN

var a=false;		
console.log(parseInt(a));		//NaN

var a=undefined;		
console.log(parseInt(a));		//NaN

var a=null;		
console.log(parseInt(a));		//NaN
```

​				当有两个变量时        后面的数字表示进制				

```js
var a="10";		
console.log(parseInt(a,2));		// 2
<!--把字符串当做二进制下的字符串，将它转成十进制下的整数-->
```

```js
var a="ff";		
console.log(parseInt(a,16));		// 255
```



### **转换为布尔型      **

Boolean()    

​	""	  0  false  null  undefined  NaN  强制转换为布尔值都是false

​	除上述之外全部为true

### **转换为对象型      **

Object()    

​	var a=3;   //布尔、字符串也一样，分别转换为数值对象、布尔对象、字符串对象

​    console.log(Object(a)); 



# ***<u>任何一个运算符都是有返回结果的</u>*       刻烟吸肺！！！**

赋值

## 加法运算符

数值相加

加字符串       隐式转换为字符串类型，然后进行字符串的拼接

- ##### 有对象参与

  ```js
  var a={a:1};	
  console.log(a+"aa"=={}+"aa");		//true
  ```

  <!--加一个字符串，进行字符串的拼接，对象在转换为字符串时无论内容是什么都会转换成[Object Object] 然后在后面拼接上字符串“aa",所以两个相等，输出为true-->

- ##### 有数组参与

  ​	

  ```js
  console.log([1,2,3,4]+4);	//字符串 1,2,3,44
  conbsole.log([1]+4);		//字符串  14
  ```

  ​	<!--数组转换为字符串类型，然后进行字符串的拼接-->

## ！表示隐式转换为布尔值并取反

```js
var x=1;		
console.log(!x + "aa");		//字符串falseaa
```



## 减法、乘法、除法、取模

​	<!--任何类型做减法、乘法、除法、取模都优先隐式转换为数值运算-->

```js
var x="a";	
var y=3;	
var n;

console.log(x-y);		//NaN
//x是字符串，转换为数值为NaN,NaN参与运算结果还是NaN

console.log(null-10);	//-10		
//null转换为0

console.log(n-2);		//NaN
//n没有声明，所以n是undefined，先转换为字符串“undefined”，然后再转换为数值是NaN	
```

```js
var x="32a";
console.log(x-2);     //NaN
```

​		<!--只有  !"" 、!0 、!NaN 、!false 、!null 、!undefined  可以转换为true（因为这些先转换为布尔型false，然后取反得到true）-->

```js
console.log({a:10}-5);		//NaN
console.log([10]/2);		//5
console.log([]/2);			//0
console.log(![10]/2);		//0
console.log(![]/2);			//0
```

```js
var x=4;
console.log(x-4+"a");				//字符串0a
console.log(x+"a"-4);				//NaN
console.log(x-(x+5)+(x+"a"));		 //字符串-54a
console.log(x-(x+5)+""+(x+"a"));	  //字符串-54a
```



<!--赋值运算符和一元运算符进行的都是赋值处理，所以应该是对变量进行操作-->

<!--赋值运算符的运算与算术运算符保持一致  += --> 

<!-- 赋值运算符的优先级是除了  ","  之外最低的  -->

<!-- 可以利用隐式转换实现类型的快速转换 --> 			

```
如数值变字符串就  +="" 
字符串变数值就  -=0
```



## 一元运算符

##### x++ 

会只按数值运算，不会进行字符拼接

```js
var x=3;
console.log(x++);        //x++等同于 x=x+1,它和 x+=1 不同	
```

```js
var x="4";
console.log(x++);		//5
console.log(x+=1);		//字符串41
```

​	

##### x++ 和 ++x

 对x来说是一样的，但是它俩的返回值是不同的

```js
var x=1;
console.log(x++);			 // 1  先返回x,再让x+1
console.log(++x); 			 // 2  先让x+1,然后返回x+1的结果
// 同理，--x 与 x-- 也是如此
```

```js
var x=1;
var y=x+++x+++x+++x---x+x+++x+++x-x+++2;
console.log(x,y);
```

## 关系运算符

关系运算符  >  >=  <  <=  ==  ====  !=  !==         关系运算符返回的是布尔值

## 隐式转换为数值

```js
var a="5";
console.log(a>6);		//false    与6进行比较，将字符串"5"转换为数值5，再与6比较，输出false
```

```js
var a="b";
console.log(a>4);		//NaN    与数值4进行比较，将变量a转换为数值，转换后是NaN，NaN与任何数值比较都是false
```

```js
// 如果关系运算符两边都是字符串，那么就会隐式转换为Unicode编码后再进行比较
console.log("a">"F");	//true
console.log("aa">"ab");		//true	第一个比完就比第二个
```

```js
console.log(true>null);		// true  true会转换为1,null转换为0
console.log(1>false);		//true    false会隐式转换为0
console.log(true>undefined);		//false		undefined转换为字符串，然后转换为数值，转换后是NaN，NaN与任何数值比较都是false
```

有数组参与

```js
console.log([]>-2);		//true	[]转换为数值是0,0>-2
console.log(![]>0);		//false    ![]的意思是布尔型，而![]转换为布尔型是false，再用false 和0进行比较，false转换为0，比较结果false
console.log(![]>[]);		//false		![]是false,[]转换为布尔型是true，再进行比较，转换为数值false为0，true为1
```

涉及到优先级的关系运算符运算

```js
var x=3;
var y=3;
//	优先级中，赋值是最低的    赋值 低于 > < 低于 + - 
x+=3-x>2;	// 先算3-x为0,再算0>2为false,最后x+=false,即x+=0
console.log(x);		//3

y+=(3-x>2)+"";		// 先算括号里的,括号里的先算3-x为0,再算0>2为false,然后再加上空字符串隐式转换为字符串类型,即x+="false"
console.log(y);		// 字符串 3false

```

## 判断相等

两种方法

1. ==  判断的时候会把两边的内容进行主动地隐式转换，转换之后再进行比较
2. ===  进行判断的时候是直接进行比较

```js
// 两边内容类型相同，直接比较内容
console.log({}=={a:1});		// false  类型相同，都是对象，内容不同

// 两边类型不同，隐式转换成字符串或数值或布尔型
console.log("[object Object]"=={a:1});		// true 进行隐式转换，对象转换换为[object Object]
console.log([1]==1);		// true  前面是数组，后面是数值，进行隐式转换，数组转换为数值1
console.log([]==0);		// true  前面是空数组，后面是数值，隐式转换，空数组转换为0

// 两个空数组，比较地址
console.log([]==[]);		// false


console.log(![]==[]);		// false
// ![]是布尔值，[]为true，![]为false       
// 此时，要把右边的[]也转换为布尔值   []先转字符串"",再由""转为布尔型false

console.log(5+([]+0));		// 字符串50  加法，转换为字符串    

var y=3;
var x=y>3;
console.log(x);		// false
```

##### ==的隐式转换规则：

```js
0==false;
0=="";
false=="";
undefined==null;		//undefined和null在进行相等判断时是相等的，都是表示变量没有值

 var x=1;
if(!x){
// 能进来的有   "" NaN  null undefined 0 false
}

if(x==undefined){
// 能进来的有null  undefined
}

if(x===undefined){
// 能进来的  undefined
}

//因为 == 的转换规则很麻烦，所以在比较时一律使用 ===
```

## 逻辑运算符

### 逻辑与     &&

```js
// true   && true      true    
// true   && false     false
// false  && true      false
// false  && false     false   

// &&  遇到false即返回，没有false继续往后找直到最后

console.log(1 && 0);
console.log("" && "a");

console.log(3 && 5);
console.log(0 && "");

var x=3;
var y=x-3 && 3;			// 当x=3时y返回值为0，其他情况y返回值都是3
var y=x-3 && x-2 && 3;		// 当x=3时或y=2时y返回值为0，其他情况y返回值都是3
console.log(y);
```

### 逻辑或  ||

```js
// true   || true      true   
// true   || false     true
// false  || true      true
// false  || false     false
// 遇到true直接返回第一个true      没有true则继续向后找，直到最后

console.log(0 || "");		// ""

var o={a:10};
console.log(o=o || {a:1});		// {a:10}
// 这句 o=o || {a:1} 其实就相当于下面的这个条件判断
if(!o){			// 如果为false    因为o是对象，布尔值为true，!o就是false
    o={a:1};		// 对o进行赋值操作
}
```

```js
// 使用逻辑或就可以实现以下功能
class Box{
    static _instance;
    static getInstance(){
        return Box._instance || (Box._instance=new Box());		// 如果Box._instance为空，那么就创建一个新的Box._instance
    }
}
```

## 位运算符

### 进制运算

```js
// 二进制
// 1  0
```

```js
// 八进制	
//	0	1	 2	  3	 	4	  5		 6		7
//	0	1	10	 11	   100	  101	 110	111
// 二进制和十六进制的转换		三位一分
// 111 011 010 110
// 7	3	2	6        
// 转换结果 二进制数 111011010110 就是八进制数 7326
```

```js
// 十六进制
//	0	1	 2	  3	 	4	  5		 6		7		8		9	  10    11	 12	  13   14	15
//	0	1	10	 11	   100	  101	 110	111		1000	1001	a	 b	  c    d	e	 f
// 二进制和十六进制的转换		四位一分
// 110 1011 0110 1101 0110
// 6	 b	  6	  d		6
// 转换结果 二进制数 110101101101101011 转换为十六进制为 6b6d6
```

### 位与运算		&

```js
// 1	&	1	=	1
// 1	&	0	=	0
// 0	&	1	=	0
// 0	&	0	=	0
// 同时为 1 则为1    表现出 0 的特征

var a=true;
for(var i=10;i<100;i++){
    console.log(i&1);		// 实现开关的效果    即交叉输出 true 和 false
    // console.log(a=!a);		
}
```

### 位或运算		|

```js
// 1	|	1	=	1
// 1	|	0	=	1
// 0	|	1	=	1
// 0	|	0	=	0
// 同时为 0 才为 0		表现出 1 的特征

for(var i=1;i<100;i++){
    console.log(i|7);		// 输出值的间隔是8      7 是 111  所以可以进行锁位
}

var x=3;  
x&=2;		//x=x&2
console.log(x);		// 2

var x=7;
x|=10;		//x=x|10;
console.log(x);		// 15

```

### 异或运算

```js
// 	1	^	1	=	0
// 	0	^	1	=	1
//	1	^	0	=	1
//	0	^	0	=	0
// 异或运算，相同为 0，不同为 1 


//用来加密		确定密钥后，异或一次得到密文，再异或一次即可实现解密

// 设置 秘钥 key 53672
console.log(43657^53672);		// 密码
console.log(31521^53672);		// 解密

var str="i love javascript";
// String.fromCharCode(i)   将第i个的Unicode编码转换为字符串
// String.charCodeAt(i)     将第i个字符转化为Unicode编码
// 随便设置一个  密钥  如下面的是设的173
var s="";
for(var i=0;i<str.length;i++){
    s+=String.fromCharCode(str.charCodeAt(i)^173);
}
console.log(s);     // 得到密文

var s1="";
for(var j=0;j<s.length;j++){
    s1+=String.fromCharCode(s.charCodeAt(j)^173);
}
console.log(s1);        // 进行解密
```

### 位非操作		~

对数值

简单来说，对数值，位非操作就是对数值  +1  再取相反数        根据这个，就可以用它作为条件进行判断

```js
var arr=[1,2,3,4,5];
// array.indexOf(x)  在数组array中查找x，找到就返回1，没找到就会返回-1
if(~(arr.indexOf(-2))){		// 数组中没有2，返回值是-1    位非操作后是0  那么这个的意思就是，如果是false，就输出aaa
	console.log("aaa");
}
```

##### ~~

~~可以实现取整功能

```js
// 在取整的时候不会进行四舍五入
console.log(~~3.25);
console.log(~~278.7812);
// 过大数据不要使用     会发生错误
console.log(~~127312371237123.23);
```

### 位移操作

```js
// << 左移     >> 右移
console.log(1<<8);
console.log(1<<4);
console.log(1<<16);
console.log(1<<3);
console.log(1<<31);
console.log(256>>6);
console.log(17>>1);
```

### 三目运算符

```js
var x=3;
// y=条件?条件是true返回这个结果:条件是false返回这个结果
var y=x>2 ? 4 : 5;
x+=x>0 ? 3 : 4;
console.log(x);

x+=5 ? x+=3 : 4;
console.log(x);
```



# **NaN问题**

**NaN和NaN永远不相等**

## 判断是否是NaN的方法

isNaN()

```js
var a="a";
console.log(isNaN(Number(a)));		// true	使用Number()进行转换，再判断是不是NaN

console.log(isNaN(a));		// true		isNaN()方法会主动地对需要判断的变量进行隐式转换为数值，然后判断转换后的结果是否是NaN

```

Number.isNaN()

```js
var a="a";
console.log(Number.isNaN(Number(a)));		// true	使用Number()进行转换，再判断是不是NaN

console.log(Number.isNaN(a));		// false	Number.isNaN()方法不会主动地转换，而是直接判断变量是不是数值型,如果不是数值型，直接返回false，如果是数值型，再继续判断是否为数值型的NaN
// 使用Number.isNaN()方法判断有点像 === 判断，不主动转换，直接判断
```

Object.is()

```js
var a="a";
// Object.is(a,b)		进行隐式转换，先转换为对象，再判断对象a和对象b的内容是否一致
console.log(Object.is(2,2));		// true
console.log(Object.is(Number(a),NaN));		// true
console.log(Object.is(a,NaN));		// false
```

# **条件语句**





# **OSI参考模型**

![image-20211109222237650](D:\QianFeng\笔记\image-20211109222237650.png)

IP  网络层		TCP传输层				IP涉及到重定位，所以更加底层

TCP是面向对象连接的通信协议，通过3次握手4次挥手建立连接，通信完成后要拆除连接		只用于**端到端的通信**

UDF是面向无连接通信的H5不会用到

DNS域名解析系统    在浏览器输入域名的时候，由于域名是不具备IP的，所以输入域名并不能直接访问，而是需要进入DNS进行IP解析，解析之后再进行访问/404

IP现在是买不到的，因为早就已经派发完毕了。我们现在搭建服务器实际是    买网络空间（云服务）=>获得一个IP（这个IP是一个虚拟IP，并不是固定IP）=>购买域名（IP和域名 存到DNS服务器中）		DNS实质上就是一个数据库，里面存放了IP与域名的映射

输入域名访问的过程

```js
//	浏览器输入域名 ——> hosts(本地域名解析系统) ——> 本地可以找到，访问本地
//										|
//								本地没有找到，就去DNS中查找，找到了就访问，没有就404
```



## HTTP与HTTPS的区别

1.https协议需要申请CA证书，一般是不免费的，需要一定的费用

2.http是超文本传输协议，信息是明文传输		https是具有安全性的SSL加密传输

3.二者是完全不同的连接方式，默认端口也不一样    http默认端口是80，https默认端口号是443

4.http连接很简单，是无状态的		https是SSL+http协议构建的可进行加密传输、身份认证的网络协议，比http更安全

# **cookie**

```
### 程序中存储的变量在页面卸载时就会被销毁

### 本地存储中存储的变量不存储在程序中，不受页面销毁的影响。

它们存储在本地文件中，但这个本地文件是找不到的
```

document.cookie="a=1"		存储"a=1"这个字符串，执行程序时就会存储在本地文件中

document.cookie.split("=")    	可以获取到[a,1]

cookie存储不首页面卸载影响，可以一直存在

cookie只能存储字符串，如果是数组、对象这些需要存储的话就需要使用JSON.Stringfy()	转换为字符串

JSON.parse()	可以转换为数组			

### cookie不会主动清除

但是当我们关闭浏览器时它会自动清除（这里的关闭不是指点叉关闭，而是在任务栏中结束进程）

### 可以通过手动清除cookie    

1.设置浏览器选择清除cookie

2.设置浏览器不保存cookie

3.控制台——应用——cookie——删除此项/清除所有cookie

### cookie其他

cookie在存储时如果名字相同就会被覆盖，名字不同就会在后面依次增加并且两个之间用**;**分开

cookie理论上只能临时存储，但是如果需要的话是可以指定时间的

```js
var date =new date;
date.setMinutes(date.getMinutes()+10)   //设置到十分钟之后
date.setFullYear(date.setFullYear(2121))		//设置到2121年
document.cookie="name=A;exprise="+date.toUTCString();		//存储内容还是“name=A”，但是我们设置了一个时间，就是+date.toUTCString(需要加上的时间)，这样就会把存储时间转换为对应的格林尼治时间
```

如果在设置cookie存储时设置成了当前时间，也就意味着cookie在存储的时候就会过期，意思也就是清除掉了这个cookie



## cookie的重要特征

1.可以在同一个域的客户端和服务端之间进行传递。在网页访问或者跳转到服务端的程序中，cookie会自动携带到服务端

IP和port一样就是同域，同域访问都能获取到域中存的cookie

2.由于cookie会自动携带并且在客户端和服务端之间实现自动传递，所以cookie不能太大，一般会小于5K

3.关闭浏览器时，会话级的cookie会被清除，有时间设置的会被保留

4.cookie存储时按照域来存储，即不同域间的cookie不能相互访问。且cookie存储时也是根据目录结构存储的，这样的目录分为顶级域、一级域、二级域等。低级域可以访问高级域的数据，但是高级域不能访问低级域的数据			通过document.cookie="key=value,path=/路径"可以在cookie存储时设置cookie的值和路径，实现cookie的跨目录存储

5.cookie是明文，不安全。因此需要考虑加密



# **localstorage**

存(一般用第二种)

```js
localStorage.setItem("name","a");
localStorage.name="a";
```

取(一般也是用第二种)

```js
localStorage.getItem("name");
localStorage.name;
```

可以把localStorage看成一个对象，所以对象方法都能用

localStorage的一些方法：localStorage.clear()、getItem()、key、length、removeItem()

遍历localStorage：

```js
Object.keys(localStorage).forEach(item=>{

})
```

# **sessionStorage**

基本和localStorage一样

## localStorage和sessionStorage的区别

1.session是会话级存储，在浏览器关闭的时候会销毁；localStorage是长期存储，除非手动清除，否则会一直存在

2.localStorage和sessionStorage合称为webStorage，与cookie相比存储量更大，最多能达到5M左右。但不能在客户端和服务端之间传输

3.sessionStorage是区分窗口的，也就是即使浏览器不关闭只是换了个窗口，存储的这个数据也会丢失。不同窗口数据不共享				localStorage按域存储，与cookie不同的是它不区分路径

4.localStorage有事件驱动，可以跨页面处理事件。比如我们在一个页面添加监听事件，把数据存储起来，在另一个窗口上添加事件，一个窗口上的事件触发时就可以跨页面得到另一个页面的数据等				与cookie一样，这俩也是只存字符串



# **promise**

```js
var p=new Promise(function(resolve,reject){
  resolve();
})
p.then(function(){
  //函数执行正确就继续执行这段语句块
}).catch(function(){
  //函数执行错误的话就执行这段语句块
})
```

或者

```js
var p=new Promise(function(resolve,reject){
  resolve();
})
p.then(function(){
  
},function(){
  
})
```

promise方法

```js
promise.all().then(function(){
  // 加载所有promise
})
promise.race().then(function(){
  // 谁先执行结束就先执行谁后面的
})
promise.resolve()		// 直接加载resolve
promise.reject()		// 直接加载reject
```



## **Promise状态结构**

​		状态机分为三种，pending、fulfilled、rejected

​		默认状态下的状态是pending。当执行resolve方法时，状态被修改为fulfilled。继续执行下面reject方法就会判断此时状态是不是pending状态，如果是pending状态就会执行下去，如果不是pending状态就不会接着执行reject方法。

​		如果当前状态是pending的话，执行了reject方法，状态被修改为rejected，后面再执行resolve方法时判断此时状态不是pending状态，就会跳出不再执行

​		在promise中只执行一次resolve或者reject（除非你人为设置返回新的promise）



# async

async函数执行后返回的是一个promise对象

async中可以出现await（等待）				await只能出现在async中

async+await	阻塞式同步    因为它是通过等待当前这一步来实现同步的



```js
//		加载若干张图片
function loadImage(src){
  return new Promise(functiuon(resolve,reject){
    var img =new Image();
  	img.src=src;
  	img.load=function(){
      resolve();
		}
  	img.onerror=function(){
      reject(err);
    }
 	})
}

async function loads(){
  	var arr=[];
  	for(var i=0;i<10;i++){
      var img=await loadImage(`./img/${i}.jpg`);
      arr.push(img.src);
    }
}

loads();

//最后得到的数组arr就是顺序的地址，因为在每一次加载的时候都会等待，等之前的执行结束
```



## **npm init   初始化配置**

在过程中会蹦出来很多需要和回答的问题，所以可以直接设置npm init -y 设置默认全为yes

执行上面配置文件之后会出现一个package.json    配置文件

1.可以把当前的项目上传到npmjs官方网站的库里，为所有人提供当前项目的共享。package.json就是上传所需要的配置文件

2.可以在执行node文件时通过这个配置文件的命令来执行node代码，完成传参需要

3.项目中将会大量使用其他包（插件），这些包对于当前的这个项目来说就是依赖，这些依赖配置需要分门别类地归纳，以方便再次更新对应的包。在项目上线打包时对于依赖确认打包

4.用来处理ES6下的模块化

```js
/*															package.json文件中的内容
name						项目名 自动显示的是当前的文件夹名。在自己设置的时候要注意，不许使用大写，不使用数字，区分单词时使用-、/、@

version					当前的项目版本	
		格式是1.2.3 其中，1是大版本，大的结构发生改变时会修改大版本。要求是在修改的时候注意兼容问题    频繁迭代的话，一般会三年改一次大版本，一般大版本是不需要修改太快的，大版本修改越快越容易死掉
		2是小版本，大版本中代码需要迭代（添加、修改）时修改这个版本
		3是微版本，修改各版本中的bug，优化性能
		
description			描述  说明包的作用，以便于别人检索

main						执行文件的入口

script					所有脚本的集合（后面讲）

keywords				关键词    在检索时会出现在结果后面

author					署名		英文花名，中文花名

license					版权证		一般不写

dependencies		项目依赖
deDependencies	开发依赖

type					  当使用ES6下的模块化开发时，自己设置为module

*/
```

```js
/*
npm i 插件名				i是install的简写				-g全局安装，这样安装之后这个插件主要适用就是命令类型插件（CLI）
nrm  							可以切换镜像
npm i nrm -g			切换npm下的镜像源


npm i yarn -g 		yarn和npm一样，也是包管理器，但是它和npm不同的是，yarn没有库		不过，和npm相比，yarn支持断点下载和多点下载。
断点下载：网断之后再次联网可以接着上次下载的继续下
多点下载：同时下载，提高下载速度


这个全局会安装在node所在文件夹下，因为该node是全局环境变量中，所以直接可以执行命令
npm i anywhere -g  							web服务工具		可以自定义端口号，anywhere 端口号
npm i http-server -g 						web服务工具,可以做代理    会有提示，可以看到缓存时间、索引、跨域等，可以完成跨域
npm i nodemon -g 								如果修改了node文件，自动重新执行该node文件


下面两个都会安装在当前文件夹的node_modules文件夹中,
dependencies 									在package.json中dependencies就是项目依赖，安装后都会在这里显示
npm i 插件名  --save/S					安装项目依赖插件
npm i 插件名  --save-dev/D			 安装开发依赖插件（默认）
依赖插件分为项目依赖插件（项目上线后依然需要使用的插件）和开发依赖插件（插件在开发时使用，上线时就不再需要，如打包工具、测试工具这些）


npm i jquery -S  js中DOM的快速开发插件（只要用于DOM开发）
npm i lodash -S 


npm i gulp -D
npm uninstall 插件名  -g
npm uninstall 插件名  -S
npm uninstall 插件名  -D


ErrorNo -4048  错误代码为4048时就需要：
npm cache verify 清除缓存
npm cache clean  --force 强制清除缓存

全局的安装会安装在node所在文件夹下，因为该node是全局环境变量，所以可以直接使用
-S安装的会在node_module里
*/
```

## nodejs		开发应用程序的API

1.可以操作数据库				js是不可以操作数据库的，前端不能操作数据库

2.可以读取和写入当前服务器的文件夹和文件				js不能，不会给js开放这个权限

3.处理二进制流文件

4.不能操作DOM和BOM内容以及相关的事件部分，nodejs是没有事件的

5.可以执行js文件				node 正确路径下的文件 回车		即可执行

## 模块化开发

nodejs是一个应用程序，只有主入口文件。在入口文件中需要调用其他的js文件，这些js就要写成模块化

nodejs的模块化叫**commonjs**  只适用于ES5下的模块化

### **ES5下的js模块化开发**

```js
// js导出
module.exports=_______;						// 相当于ES6中的export default class
var a=require("./a");		//  ./ 表示是相对当前文件的路径,如果不加的话，系统会默认为node路径或者node_module的路径下，就会报错  	在这里不需要加a文件的扩展名		这一句相当于ES6下的import a from "./a.js"


// 导出的时候可以导出多个，exports.名   相同格式并排往下写就行				只是如果我们导出多个时，在主入口函数index.js前面导入的时候要解构
var{a,b:b1,c}=require("./a");				// 如果我们解构的时候有名字的重复，那么就需要取别名。commonJS中的取别名和ES6下的解构赋值语法是一样的，使用冒号而不是像ES6下用as
```

### **nodeJS    在ES6下的模块化开发**

```js
// 如果我们要用到ES6，那么我们就需要在开始的时候执行 npm init -y，然后在生成的配置文件中添加"type":modules;  并且在文件命名时要把扩展名改为.mjs
// 在执行ES6下的模块化开发时，必须在文件后面添加扩展名        node ./a.mjs
// 在index.mjs文件中导入时也需要添加扩展名        import a from "./a.mjs"
```

# **使用http创建服务**

```js
var http = require("http")
// req 请求	类型是IncomingMassage    请求头
// res 响应	类型是ServerResponse			响应头
// 消息分两部分，一个消息头，一个消息尾

http.createServer(function(req,res){
 // 创建服务  createServer中的参数是一个回调函数，回调函数的参数有两个，一个req,一个res
  res.write("");				// 响应的消息
	res.end();					  // 表示响应结束    必须写在最末尾
// 如果响应消息比较少（只有一条），就可以直接在res.end()里写，相当于写入响应消息发送并结束
  
// 如果我们在写入的时候有中文，有两种解决方法
	// 一次只能设置一个头消息，且只能写在writeHead前面
  1.res.setHeader("Content-Type","text/html;charset=utf-8");
  // 可以设置很多消息头，并且包含了返回消息码
  2.res.writeHead(200,{
    'Content-Type','text/html;charset=utf-8'
  })
}).listen(4000,"10.9.28.131",function(){
  // 当我们创建服务之后有一个listen方法，开启服务监听
  // listen方法的参数 有三个，第一个是port端口号，设置我们创建的这个服务的端口号，这个必须有
  // 第二个参数是设置的域名  域名的设置有三种    localhost--->在访问的时候也用localhost		自己的IP地址10.9.28.131--->在访问的时候也必须用IP访问			什么也不写--->在访问的时候用localhost和IP都可以
  // 第三个参数是一个函数，是我们指定地加入我们服务创建成功后想要执行的函数
  console.log("创建服务成功");
})




```

# **创建数据库并连接数据库**

1.打开小皮，启动数据库

2.找到小皮软件管理，找到phpMyAdmine，点击管理，进入数据库创建管理页面

3.在数据库管理页面上进行创建数据库，创建表，添加数据······进行数据库的操作

4.使用js代码进行数据库管理

```js
async function init(){
  // 创建数据库连接，创建变量db接收连接结果	
  // url				数据库位置		
  // port   		数据库端口（在小皮首页MySQL配置里可以看到数据库端口）
  // user    		数据库用户
  // password		数据库密码				这两个在小皮的数据库里可以找到
  // database		数据库				是我们想要连接的数据库名字
    var db=mysql.createConnection({
        url:"localhost",
        port:3306,
        user:"root",
        password:"root",
        database:"tn"
    
    });
  // 执行isConnect函数，如果返回值是false连接失败的话，直接跳出，不然就说明连接成功，输出“数据库连接成功”
    if(!await isConnect()) return;
    console.log("数据库连接成功！");
}

// 创建连接函数
function isConnect(){
  // 返回一个Promise  对于db.connect（数据库的连接），传入的参数是err，也就是连接失败
  // 如果err存在，即连接失败，那么就返回false
  // 不然就说明连接成功，返回true
    return new Promise(function(resolve,reject){
        db.connect(function(err){
            if(err){
                resolve(false);
            }else{
                resolve(true);
            }
        })
    })
}

/***************************数据库的一些操作****************************/
// 向数据库中插入数据
function insertDB(arr){
    return new Promise(function(resolve,reject){
        var sqlstr="INSERT INTO `user`(`user`, `password`, `name`,  `age`, `tel`, `email`) VALUES (?,?,?,?,?,?)"
   
        db.query(sqlstr,arr,function(err,res){
            if(err){
                resolve(false);
            }else{
                resolve(true);
            }
        })
    })
}

// 在数据库中查找数据
function selectAll(){
    return new Promise(function(resolve,reject){
        var str="SELECT * FROM `user` WHERE 1"  
        db.query(str,function(err,res){
            if(err){
                resolve(false);
            }else{
                resolve(res);
            }
        })
    })
}

// 模块化导出，需要什么导出什么    也可以全导出，看需要什么就在前面导入的时候导入什么
// exports.db=db;
exports.insertDB=insertDB;
exports.selectAll=selectAll;
```

```js

var http=require("http");
const {insertDB,selectAll}=require("./sql")
http.createServer(async(req,res)=>{
    res.writeHead(200,{
        "Content-Type":"text/html;charset=utf-8"
    })
    // var arr=["zzz","19911007","张艺兴",30,"19911991007","1234532@xxx.com"]; 
    // var bool=await insertDB(arr);
    // res.end(bool?"插入成功":"插入失败")
    var result=await selectAll();
    if(!result){
        res.end("没有查到");
        return;
    }
    res.write("<table>");
    res.write("<th>用户名</th><th>姓名</th><th>性别</th><th>年龄</th><th>电话</th><th>邮箱</th></tr>")
    for(var i=0;i<result.length;i++){
        res.write("<tr>");
        for(var key in result[i]){
            if(/^pid$|^password$/.test(key)) continue;
            res.write(`<td>${result[i][key]}</td>`)
        }
        res.write("</tr>")
    }
    res.write("</table>");
    res.end();
}).listen(4020);


```

# **宏任务和微任务**

在程序运行时，遇到script，将会如下执行：

1.对于var 变量、function 函数  会进行预解析。函数有限存储在缓存中

2.函数在执行的时候会一条一条往下执行，这也说明程序是一种解释型语言

​		async、加载图片的load、setTimeout、setInterval	这些都是异步，代码并不是全部按顺序一条接一条执行的，有同步有异步

​		promise本身也是个异步

​		函数预解析，并不属于任何任务流，预解析的时候它会把函数内容存到自己的一个小空间里。在执行的时候，每一条函数都是一个任务，执行的时候遇到函数时，先把函数插在函数在的这个位置，然后进入自己的这个小空间内部去执行，执行完之后再从小空间出去回到大空间。

​		一旦在某个位置执行了事件的抛发，就说明在这个位置去进入回调函数的小空间

​		添加侦听事件以及触发事件的过程：建立侦听列表，添加侦听事件的对象加入到侦听列表中 ----> 发生了事件的抛发 ----> 去侦听列表中去找这个触发事件的对象 ----> 找到这个事件对象就触发了回调函数，把函数小空间插入到当前位置去执行，直到回调函数执行结束标志着抛发事件的这句执行结束，函数继续从当前位置向下执行

一个html执行结束标志着当前任务队列完成，这时候才会去执行下一个宏任务

​		Promise里的参数函数是即时执行的，new Promise的时候就执行。但是then里面的回调函数是在执行参数中的resolve时触发的。执行resolve并不是即时回调执行的，而是先把它存起来，等当前任务流的所有代码执行结束后再激发回调函数。

​		一个script是一个任务流，也是微任务的执行范围。

​		Promise.then的激活是放在当前任务流最后的。遇到一个微任务，就把它放在这个任务流的最后。

​		宏任务是一个任务队列结束后再去创建一个新的队列执行，而微任务是在当前任务队列中的当前任务流最后添加上。

​		**拿setTimeout为例**，在我们执行代码的时候遇到setTimeout，setTimeout是一个宏任务，它肯定是不能在当前的任务队列里执行的，我们先让它在另一边开辟新的任务队列并且计时（因为setTimeout是可以设置时间的），继续向下执行。如果再遇到一个setTimeout，和上一个执行同样的操作，直到当前任务队列执行完成。当setTimeout前面没有延时的情况下我们要看setTimeout谁的计时比较短就可以先执行它对应的新队列。如果说setTimeout前有延时的话，比如大量的循环和大量的耗时方法，那么这时候我们要看的就是到底是延时比较多还是计时比较多，这就不好说了（所以别给自己找事，根本就 不要这么写）。如果setTimeout里面还包了setTimeout，在都不设置计时的情况下，肯定是第一层为先，靠上的先执行队列，然后是第二层，以此类推。如果说我们的setTimeout有好几层，并且都有计时时间设置的话，它就会按照计时长短来判断哪个队列先执行

<img src="D:\QianFeng\笔记\image-20211111200315046.png" alt="image-20211111200315046" style="zoom: 80%;" />

​		**await**会异步，它不会让自己当前在的这一句发生任何改变，而是会让自己后面的语句移到当前任务流最后（欠嗖的）

​		连续then的时候会三个一组抱团同步，这三个一组之后就像于这一个异步完成，再接着往下去按规则去执行其他的

​		微任务（当前知道的）：await、catch、then

# AJAX

```js
var xhr=new XMLHttpRequest();
// 新建变量xhr为一个XMLHttpRequest对象，这个对象就是用于服务器交互的

xhr.open("method方法（POST/GET）","http://localhost:4000(地址加端口号)");
// 通信是需要时间的，是一个异步过程		open是设置请求信息，里面包括请求方法和请求对象

xhr.addEventListener("load","loadHandler");
// 添加监听

xhr.send();
// send是发送请求

function loadHandler(){
  console.log(xhr.response);
  // xhr.response就是我们收到的来自服务器的响应信息
}
```

​		在我们进行通信时可能会出现报错"Access-Control-Allow-Orgin"，意思是提醒你跨域了，我们在响应头里添加    <u>"Access-Control-Allow-Orgin":"允许跨域的IP"</u>    这样就可以把我们设置的ip添加到允许跨域的列表里，就可以跨域了。如果我们不限制任何对象跨域，我们可以直接设置	<u>"Access-Control-Allow-Orgin": "*"</u>，这叫配置cors解决跨域

# 接口

接口的分类方式：

1.数据发送过来时，在数据里面携带了其他的内容，服务器对数据解析的时候就可以拿到这些内容，对其识别并做出反应

2.路由接口识别				

​		发送请求时携带着路径，这个路径就是路由。我们只需要判断携带来的路径是什么就可以判断我们要处理的是哪个接口要求。

​		二级路由携带着接口类别和操作信息等信息

#### 其他

​		向服务器发送请求，服务器接收到之后进行处理再发出响应，这个过程是需要时间的，是异步的。如果我们连着发了两条请求消息，那么在服务器还没有对第一条请求作出反应的时候，第二条就把第一条给覆盖掉了，所以只能收到一条响应。

​		**正则**            \4e00-\u9fd5  汉字的范围

​		location.href="地址"				本地跳转

​		Object.Entries(迭代器)			迭代器转为对象