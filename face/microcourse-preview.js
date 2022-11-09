// 前端测试题的实现

function getLinks(data){
    let res = [];
    let map = new Map();

    data.forEach(item => {
        map.set(item.id,{visited: false,value: item});
    });

    data.forEach(item => {
        let next,wrapObj = map.get(item.id);
        if(!wrapObj.visited){
            let link = [];
            link.push(wrapObj.value);
            wrapObj.visited = true;
            while(next = map.get(wrapObj.value.next)){
                link.push(next.value);
                next.visited = true;
                wrapObj = next;
            }
            res.push(link);
        }
    })

    return res;
}
const data = [
    { id: 1, next: 2 },
    { id: 3, next: 4 },
    { id: 4, next: 5 },
    { id: 5, next: 6 },
    { id: 6, next: 7 },
    { id: 7, next: 8 },
    { id: 8, next: 9 },
    { id: 2, next: 10 },
    { id: 20, next: 30 },
    { id: 30, next: 40 },
    { id: 100, next: 78 }
]

console.log(getLinks(data))
/* [
    [{ id: 1, next: 2 }, { id: 2, next: 10 }],
    [{ id: 3, next: 4 }, { id: 4, next: 5 }, { id: 5, next: 6 }, { id: 6, next: 7 }, { id: 7, next: 8 }, { id: 8, next: 9 }]
    [{ id: 20, next: 30 }, { id: 30, next: 40 }],
    [{ id: 100, next: 78 }]
] */
//也可以使用拓扑排序，记录入度，然后bfs一下
//你用的findIndex是时间复杂度o(n)的算法，数组的splice也是时间复杂度o(n)的算法
//你的写法就不需要新开辟空间，没有额外的空间复杂度，时间复杂度好像也还行，也是O(n)的，但是这个我不确定，也可能是O(n2)



//第3题
class Animal{
    constructor(name){
        this.tasks = [];
        
        let task = () => {
            console.log(`This is ${name}`);
            this.execute();
        }

        this.tasks.push(task);
        setTimeout(() => {
            this.execute();
        })
    }
    execute(){
        let task = this.tasks.shift();
        task && task();
    };
    eat(type){
        let task = () => {
            console.log(`Eat ${type}~`);
            this.execute();
        }
        this.tasks.push(task);
        return this;
    }
    sleep(second){
        this._sleep(second);
        return this;
    }
    sleepFirst(second){
        this._sleep(second,true);
        return this;
    }
    _sleep(second,isFirst){
        let task = () => {
            console.log(`Sleep ${second}s ...`);
            setTimeout(() => {
                console.log(`Wake up after ${second}s`);
                this.execute();
            },second * 1000)
        }
        this.tasks[isFirst ? 'unshift' : 'push'](task);
    }
}

// new Animal('dog');
// new Animal('cat').sleep(5).eat('dinner');
// new Animal('cat').eat('dinner').eat('supper');
new Animal('cat').sleepFirst(5).eat('supper');

//中间件实现 express的use vue router的next 全都是这个原理

//第4题


function parse(str){
    let directive,numericLiteral1,numericLiteral2;
    let concat = '';
    for(let c of str){
        if(c === '('){
            directive = concat;
            concat = '';
        }else if(c === ')'){
            numericLiteral2 = +concat; 
        }else if(c === ','){
            numericLiteral1 = +concat; 
            concat = '';
        }else{
            concat += c;
        }
    }
    // console.log(directive,numericLiteral1,numericLiteral2);
    switch (directive) {
        case 'ADD':
            return numericLiteral1 + numericLiteral2;
        case 'SUB':
            return numericLiteral1 - numericLiteral2;
        case 'MUL':
            return numericLiteral1 * numericLiteral2;
        case 'DIV':
            return numericLiteral1 / numericLiteral2;
    }

}
console.log(parse('ADD(1,2)'));
console.log(parse('SUB(2,1)'));
console.log(parse('MUL(2,1)'));
console.log(parse('DIV(4,2)'));


