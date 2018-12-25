const AopYJS = require('../src/index')

// 测试后置切入,被切入函数为 Promise
const ctx = {
  laugh() {
    console.log('haha')
    console.log('wait 2s ...')

    return new Promise(resolve => {
      setTimeout(_ => resolve(), 2000)
    })
  },
}

const aopy = new AopYJS(ctx)

aopy.$after('laugh', _ => {
  console.log('close mouth')
})

ctx.laugh()
