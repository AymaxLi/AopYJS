const AopYJS = require('../src/index')

// 测试后置切入 es5
const ctx = {
  laugh() {
    console.log('haha')
  }
}

const aopy = new AopYJS(ctx)

aopy.$after('laugh', _ => {
  console.log('close mouth')
})

ctx.laugh()
