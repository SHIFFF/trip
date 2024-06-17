import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config.js'

class HYRequets {
    constructor(baseURL, timeout=10000){
        //创建一个新的实例
        this.instance = axios.create({
            baseURL, 
            timeout
        })
    }



    request(config) {
        return new Promise((resolve, reject) => {
            this.instance.request(config).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }

    //定义封装的类的get请求
    get(config) {
        return this.request({ ...config, method: "get" })
    }


    //定义封装的类的post请求
    post(config) {
        return this.request({ ...config, method: "post"})
    }
}

export default new HYRequets(BASE_URL, TIMEOUT)


