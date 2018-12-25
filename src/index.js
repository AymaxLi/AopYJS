class AopYJS {
  constructor(ctx) {
    this.ctx = ctx
  }

  /**
   * 前置切入
   * @param {Function} method 目标函数
   * @param {Function} fn 切入函数，返回 Boolean / Promise
   * @param {Object} target 目标对象
   */
  $before(method, fn, target = this.ctx) {
    // 闭包保存原方法
    const original = target[method]

    // TODO: async 是 es7 的，，，可是不用 async / await 的话没办法将原函数返回值返回出去，我枯了
    target[method] = async(...args) => {
      // 执行前置函数，返回值可能是 Boolean 或 Promise
      let flag = fn()

      // 如果 flag 是 Promise 的话，等 resolve 之后利用 await 将原函数执行完之后的返回值返回出去
      if (Promise && flag instanceof Promise)
        return await flag.then(isValid => isValid && original.apply(target, args))

      // 否则直接执行原函数并返回
      return flag && original.apply(target, args)
    }
  }

  /**
   * 后置切入
   * @param {Function} method 目标函数
   * @param {Function} fn 切入函数
   * @param {Object} target 目标对象
   */
  $after(method, fn, target = this.ctx) {
    const original = target[method]

    target[method] = (...args) => {
      // 原函数返回值，可能会是 Paomise
      let rt = original.apply(target, args)

      // 原函数的返回值是 Promise
      if (Promise && rt instanceof Promise)
        rt.then(res => {
          // 执行后置切入函数
          fn(res)
          // 返回原函数的返回值给下一个 resolve / reject
          return res
        })

      // 否则
      else fn(rt)

      // 返回原函数的返回值
      return rt
    }
  }
}

module.exports = AopYJS