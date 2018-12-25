# AopYJS
## Introduction
AOP（面向切面编程） 的 JavaScript 实现，主要用于函数的无侵入注入，如鉴权，参数检查，日志记录等。

## API
提供前置切入、后置切入两种切入方法
### **$before(methodName, fn[, target])**
#### methodName
- `String`
- 被切入函数名。
#### fn
- `Function` / `Promise`
- 前置切入函数，需要返回一个 `Boolean` 值，该值为 `true` 时才执行被切入函数。
#### target
- `Object`
- 切入函数所属对象，若 `aop` 实例是通过 `new` 创建并传入了 `ctx` 对象则可不传。

### **$after(methodName, fn[, target])**
#### methodName
- `String`
- 被切入函数名。
#### fn
- `Function` / `Promise`
- 后置切入函数，将在在被切入函数执行完成后执行。
#### target
- `Object`
- 切入函数所属对象，若 `aop` 实例是通过 `new` 创建并传入了 `ctx` 对象则可不传。

## Usage
``` javascript
const AopYJS = require('../src/index')

const ctx = {
  laugh() {
    console.log('haha')
  }
}

// 创建 aop 实例
const aop = new AopYJS(ctx)

// 前置切入
aop.$before('laugh', _ => {
  console.log('open mouth')
  return true
})

ctx.laugh()
```
详见于 test/ 目录下的测试用例