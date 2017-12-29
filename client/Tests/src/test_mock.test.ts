import Mock = require('mockjs')

//属性值是String
let mock = Mock.mock({
    'name|1-3':'a', //重复生成1到3个a
    'name2|2':'b'   //生成bb
})

//属性值是Number
let mock1 = Mock.mock({
    'name1|+1':4,      //生成4，如果循环每次加1
    'name2|1-7':2,     //生成一个数字，1到7之间
    'name3|1-4.5-8':1  //生成一个小数，整数部分1到4，小数部分5到8位
})

let mock2 = Mock.mock({
    'name|1':true,      //生成一个布尔值，各一半
    'name1|1-3':true,   //1/4是true，3/4是false
})