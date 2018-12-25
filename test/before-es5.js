const AopYJS = require('../src/index')

// 测试前置切入 es5
const ctx = {
  laugh() {
    console.log('haha')
  }
}

const aop = new AopYJS(ctx)

aop.$before('laugh', _ => {
  console.log('open mouth')
  return true
})

ctx.laugh()