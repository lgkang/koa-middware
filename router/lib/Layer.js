module.exports = class Layer {
    constructor(path, methods, middleware, options = {}) {
        this.options = options;
        this.name = this.options.name || null;
        this.path = path;
        this.methods = [];
        // 贮存中间件
        this.stack = Array.isArray(middleware) ? middleware : [middleware];
        // 将方法转换为大写
        methods.forEach(method => {
            const methodIndex = this.methods.push(method.toUpperCase());
            // HEAD可以是GET请求一个轻量版，支持GET请求的时候，也同时支持HEAD请求
            if (this.methods[methodIndex-1] === 'GET') this.methods.unshift('HEAD');
        })
        // 验证中间件是否全部是函数，不是函数抛出错误信息
        this.stack.some(fn => {
            if(typeof fn !== 'function'){
                throw new Error(
                    `${methods.toString()} ${this.opts.name || path} middleware 不是一个函数`
                );
            }
        })
    }
}
