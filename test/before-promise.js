const AopYJS = require('../src/index')

// 测试前置切入 promise
const ctx = {
  laugh() {
    console.log('haha')
  }
}

const aop = new AopYJS(ctx)

aop.$before('laugh', _ => new Promise(resolve => {
  console.log('wait 2s ...')
  setTimeout(_ => {
    console.log('open mouth')
    resolve(true)
  }, 2000)
}))

ctx.laugh()
