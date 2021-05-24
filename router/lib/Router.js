const methods = require('methods');
const Layer = require('./Layer');
/**
 * 1、koa-router 通过app.use中间件形式联系 koa2
 * 2、koa-router 含有方法  get/post/put/delete 等等
 * 3、koa-router 含有use的方法
 * 4、koa-router 含有prefix的方法
 * 5、koa-router 含有routes的方法
 * 6、koa-router 含有allowedMethods的方法
 * 7、koa-router 含有redirect的方法
 * 8、koa-router 含有register的方法
 * 9、koa-router 含有route的方法
 * 10、koa-router 含有url的方法
 * 11、koa-router 含有match的方法
 * 12、koa-router 含有param的方法
 */
class Router {
    constructor(options = {}) {
        this.options = options;
        // // 初始化方法
        // this.methods = this.options.methods || [
        //     'HEAD',
        //     'OPTIONS',
        //     'GET',
        //     'PUT',
        //     'PATCH',
        //     'POST',
        //     'DELETE'
        // ]
        this.params = {};
        this.stack = [];  // 路由的实例
        this.initMethods();
    }

    /**
     * 初始化方法
     */
    initMethods() {
        methods.forEach(method => {
            this[method] = (name, path, middleware) => {
                // 如果第二个参数是数组或者正则表达式
                if(typeof path === 'string' || path instanceof RegExp){
                    middleware = Array.prototype.slice.call(arguments, 2);
                }else {
                    // 因为没有第二个参数、所有此时的name是path，path是middleware
                    middleware = Array.prototype.slice.call(arguments, 2);
                    path = name;
                    name = null;
                }
                // 注册路由
                this.register(path, [method], middleware, {
                    name: name
                });
                // 返回 this 可以链式调用 router.get(...).post(...)
                return this;
            }
        })
    }

    /**
     *
     * @param {Array | string} path 路径
     * @param {Array | string} methods 方法
     * @param {Array} middleware
     * @param {Object} options
     */
    register(path, methods, middleware, options){
        if(Array.isArray(path)) {
            path.forEach(currentPath => {
                this.register(currentPath, methods, middleware, options);
            })
            return
        }
        // 创建 Layer 实例
        const route = new Layer(path, methods, middleware, {
        });
        this.stack.push(route);
        // 返回注册成功的实例
        return route
    }

    /**
     * 返回中间件
     */
    routes() {
        const dispatch = (ctx, next) => {
            // const path = this.
        }
    }
}
module.exports = Router

