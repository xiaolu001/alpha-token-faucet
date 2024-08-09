import axios from "axios"


const instance = axios.create({
  timeout: 60000,
  withCredentials: false,
  baseURL: 'http://154.39.75.102',
})

instance.defaults.headers['content-type'] = 'application/x-www-form-urlencoded'

function addAuthorizationHeader(config) {
  const token = localStorage.getItem('token')

  config.headers['Accept-Language'] = localStorage.getItem('lang') || 'zh'
  if (token) {
    config.headers['token'] = token
  }
  return config
}
instance.interceptors.request.use(
  (config) => {


    return addAuthorizationHeader(config)
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (res) => {
    // console.log(res.data)
    if (res?.status === 200 && res?.data?.code == 1) {
      return res?.data || res
    }
    return Promise.reject(res?.data);
  },
  (error) => {
    if (error?.message == 'Request failed with status code 401') {
      // $cookie.remove('token');
      localStorage.removeItem('token');
      location.href = '/login'
    }

    return Promise.reject(error)
  },
)

function request(config = {}) {
  return new Promise((resolve, reject) => {
    instance
      .request(config)
      .then((res) => {
        resolve(res?.data)
      })
      .catch((error) => {
        if (error.code == 'ERR_BAD_RESPONSE') {
          //  showToast('服务器异常')

        }
        return reject(error)
      })
  })
}
export function post(url, data = {}, config = {}) {
  const conf = Object.assign({}, config, {
    method: 'post',
    url,
    data,
  })
  return request(conf)
}
export function get(url, params = {}, config = {}) {
  const conf = Object.assign({}, config, {
    method: 'get',
    url,
    params,
  })
  return request(conf)
}
export function put(url, data = {}, config = {}) {
  const conf = Object.assign({}, config, {
    method: 'put',
    url,
    data,
  })
  return request(conf)
}
export function del(url, params = {}, config = {}) {
  const conf = Object.assign({}, config, {
    method: 'delete',
    url,
    params,
  })
  return request(conf)
}

export function login(data) {
  return post('/api/login/login', data);
}


export function register(data) {

  return post('/api/login/register', data);
}

export function getUserInfo() {
  return get('/api/user/userinfo');
}
export function logout() {
  return post('/api/user/logout');
}
export function getBanner() {
  return post('/api/index/banner');
}

export function getBrand() {
  return post('/api/index/brand');
}

export function getBroadcast() {
  return post('/api/index/broadcast');
}
export function getVip() {
  return post('/api/index/viplevel');
}

export function getCustomer() {

  return post('/api/index/customer');
}


export function getIntroduce() {
  return post('/api/index/introduce');
}
export function getWithdrawAccount() {
  return post('/api/finance/withdrawaccount', {
    tpye: 1
  });
}
export function createAddress(data) {
    const url = data.id!=''?'/api/finance/withdrawaccountedit':'/api/finance/withdrawaccountadd';
  return post(url, data);
}
export function upload(data) {
  return post('/api/common/upload', data, {
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8"
    }
  });
}
export function profile(data) {
  return post('/api/user/profile', data)
}

export function editpassword(data) {
  const url = data.type=='username'?'/api/user/editpassword':'/api/user/edittransactionpassword';
  return post(url, data)
}
export function getConfig(){
  return post('/api/login/introduce')
}

export function getWorkInfo(){
  return post('/api/work/info')
}

export function getOrder(){
  return post('/api/work/getorder')
}

export function getRecords(data){
  return post('/api/work/records',data)
}


export function validatetrpassword(data){
  return post('/api/finance/validatetrpassword', data)
}
export function brandpage(data){
  return post('/api/index/brandpage',data)
}

export function submitWork(data){
  return post('/api/work/submit',data)
}

export function getTransaction(data){
  return post('/api/finance/transaction',data)
}


export function depositlog(data){
  return post('/api/finance/depositlog',data)
}

export function withdraw(data){
  return post('/api/finance/withdraw',data)
}
// 
export function  withdrawlog(data){
  return post('/api/finance/withdrawlog',data)
}



export function  getMsg(data){
  return post('/api/user/message',data)
}

export function read(data){
  return post('/api/user/read',data)
}