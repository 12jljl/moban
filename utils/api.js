import app from '../App.vue'

var serviceUrl = app.globalData.apiServiceUrl;

uni.setStorageSync('serviceUrl',serviceUrl)
let  language = uni.getStorageSync('language')
function request(options) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: serviceUrl + options.url,
			data: options.data,
			header: options.header,
			method: options.method,
			sslVerify: false,
			success: (res) => {
				resolve(res.data)
				// token失效
				if (res.data.code == '000009' || res.data.code == '000012') {
					// uni.clearStorage()
					uni.removeStorageSync('token')
					uni.removeStorageSync('userId')
					uni.reLaunch({
						url: '/pages/login/login'
					})
				}
			},
			fail: (res) => {
				uni.showToast({
					title: language == 0 ? 'Network error, please try again':"网络错误请重试",
					icon: 'error'
				})
			},
			complete: (res) => {}
		})
	}).then((res) => {
		return res
	})
}


function get(e) {
	let url = e.url;
	let data = e.data;
	let header = {
		token: uni.getStorageSync('token') || '',
		userId: uni.getStorageSync('userId') || ''
	};
	let options = {
		url: url,
		data: data,
		header: header,
		method: 'GET'
	}
	return request(options)
};

function postXXX(e) {
	let url = e.url;
	let data = e.data;
	let header = {
		'Content-Type': 'application/x-www-form-urlencoded',
		token: uni.getStorageSync('token') || '',
		userId: uni.getStorageSync('userId') || ''
	};
	let options = {
		url: url,
		data: data,
		header: header,
		method: 'POST'
	}
	return request(options)
};

function post(e) {
	let url = e.url;
	let data = e.data;
	let header = {
		token: uni.getStorageSync('token') || '',
		userId: uni.getStorageSync('userId') || ''
	};
	let options = {
		url: url,
		data: JSON.stringify(data),
		header: header,
		method: 'POST'
	}
	return request(options)
};

function gaodeGet(e) {
	let url = e.url;
	let data = e.data;
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			data: data,
			method: 'GET',
			sslVerify: false,
			success: (res) => {
				resolve(res)
			},
			fail: (res) => {
				uni.showToast({
					title: '网络错误请重试',
					icon: 'error'
				})
			},
			complete: (res) => {}
		})
	}).then((res) => {
		return res
	})
};


export default {
	post,
	get,
	postXXX,
	gaodeGet
}