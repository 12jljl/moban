export const tools = {
	methods: {
		//富文本的回调
		navigate(e) {
			if (e.href && e.href.indexOf('http') == -1) { //不完整的链接					
				// #ifdef MP
				this.$util.uniCopy({
					content: this.vuex_config.upload.cdnurl + e.href,
					success: () => {
						this.$u.toast('链接已复制,请在浏览器中打开')
					}
				})
				// #endif
				// #ifndef MP				
				window.open(this.vuex_config.upload.cdnurl + e.href);
				// #endif
			}
		},
		//复制url
		copyUrl() {
			this.$util.uniCopy({
				content: window.location.href,
				success: () => {
					this.$u.toast('复制成功，请去粘贴发送给好友吧');
				},
				error: () => {
					console.log('复制失败！')
				}
			})
		},
		//cdnurl
		cdnurl(url) {
			if (!/^((?:[a-z]+:)?\/\/|data:image\/)(.*)/.test(url)) {
				return this.vuex_config.upload.cdnurl + url;
			};
			return url;
		},
		//页面跳转
		goPage(path, auth) {
			if (auth && !this.vuex_token) {
				this.$u.route('/pages/login/wxlogin');
				return;
			}
			uni.navigateTo({
				url: path
			})
		},
		//返回上一页
		goBack() {
			let status = false;
			let tabbar = this.vuex_config.tabbar;
			tabbar.list.forEach(item => {
				let path = this.$util.getPath(item.path);
				if (path == this.pageUrl || path == '/' + this.pageUrl) {
					status = true;
				}
			});
			if (status) return;
			if (this.pageNum == 1) {
				//只有当前页面了
				this.$u.route({
					url: '/pages/index/index'
				});
			} else {
				uni.navigateBack({
					delta: 1
				});
			}
		},
	}
}

//form
export const formRule = {
	methods: {
		//表单验证
		getRules(row) {
			let arr = row.rule.split(';');
			let rule_arr = [];
						
			arr.forEach(item => {
				item = this.$u.trim(item);
				switch (item) {
					case 'required':
					case 'checked':
						rule_arr.push({
							validator: (rule, value, callback) => {
								 if(typeof value == 'string'){
								     value = value.replace(/<[^>]+>/g, "").replace(/\s/ig, "");
								 }
								 return !(this.$u.test.empty(value));
							},
							message: row.title + '不能为空',
							// 可以单个或者同时写两个触发验证方式
							trigger: ['change', 'blur']
						});
						break;
					case 'digits': //数字校验
						rule_arr.push({
							validator: (rule, value, callback) => {
								return this.$u.test.digits(value);
							},
							message: '请填写数字',
							trigger: ['change', 'blur']
						});
						break;
					case 'letters': //字母校验
						rule_arr.push({
							validator: (rule, value, callback) => {
								return this.$u.test.letter(value);
							},
							message: '请填写字母',
							trigger: ['change', 'blur']
						});
						break;
					case 'date': //日期校验
						rule_arr.push({
							validator: (rule, value, callback) => {
								return this.$u.test.date(value);
							},
							message: '请填写正确日期格式',
							trigger: ['change', 'blur']
						});
						break;
					case 'time': //时间校验
						rule_arr.push({
							validator: (rule, value, callback) => {
								return /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(value);
							},
							message: '请填写正确时间格式',
							trigger: ['change', 'blur']
						});
						break;
					case 'email': //邮箱校验
						rule_arr.push({
							validator: (rule, value, callback) => {
								return this.$u.test.email(value);
							},
							message: '请填写正确邮箱',
							trigger: ['change', 'blur']
						});
						break;
					case 'url': //网址
						rule_arr.push({
							validator: (rule, value, callback) => {
								return this.$u.test.url(value);
							},
							message: '请填写正确网址',
							trigger: ['change', 'blur']
						});
						break;
					case 'qq': //qq
						rule_arr.push({
							validator: (rule, value, callback) => {
								return /^[1-9][0-9]{4,10}$/.test(value);
							},
							message: '请填写正确QQ号码',
							trigger: ['change', 'blur']
						});
						break;
					case 'IDcard': //身份证
						rule_arr.push({
							validator: (rule, value, callback) => {
								return this.$u.test.idCard(value);
							},
							message: '请填写正确身份证件号',
							trigger: ['change', 'blur']
						});
						break;
					case 'tel': //电话
						rule_arr.push({
							validator: (rule, value, callback) => {
								return /^\d{3}-\d{8}$|^\d{4}-\d{7,8}$/.test(value);
							},
							message: '请填写正确电话号码',
							trigger: ['change', 'blur']
						});
						break;
					case 'mobile': //手机
						rule_arr.push({
							validator: (rule, value, callback) => {
								return this.$u.test.mobile(value);
							},
							message: '请填写正确手机号码',
							trigger: ['change', 'blur']
						});
						break;
					case 'zipcode': //邮编
						rule_arr.push({
							validator: (rule, value, callback) => {
								return /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/.test(value);
							},
							message: '请填写正确邮编',
							trigger: ['change', 'blur']
						});
						break;
					case 'chinese': //中文
						rule_arr.push({
							validator: (rule, value, callback) => {
								return /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/
									.test(
										value
									);
							},
							message: '请填写中文',
							trigger: ['change', 'blur']
						});
						break;
					case 'username': //用户名
						rule_arr.push({
							validator: (rule, value, callback) => {
								return /^[a-zA-Z0-9_]{3,12}$/.test(value);
							},
							message: '请填写3-12位数字、字母、下划线',
							trigger: ['change', 'blur']
						});

						break;
					case 'password': //密码
						rule_arr.push({
							validator: (rule, value, callback) => {
								let val = this.$u.trim(value, 'all');
								if (val != value) {
									return false;
								}
								return /^[0-9a-zA-Z!@#$%^&*?]{6,16}$/.test(value);
							},
							message: '请填写6-16位字符，不能包含空格',
							trigger: ['change', 'blur']
						});
						break;
				}
			});

			//多选额外的判断
			if (row.type == 'checkbox') {
				//最少
				if (row.minimum > 0) {
					rule_arr.push({
						validator: (rule, value, callback) => {
							if (!value) {
								return false;
							}
							let arr = value.split(',')
							return arr.length >= row.minimum;
						},
						message: '最少必须选择'+row.minimum+'项',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur']
					});
				}
			}
			if(['checkbox','selects','images','files'].indexOf(row.type) != -1){
				//最多
				if (row.maximum > 0) {
					rule_arr.push({
						validator: (rule, value, callback) => {
							if (!value) {
								return false;
							}
							let arr = value.split(',')
							return arr.length <= row.maximum;
						},
						message: '最多只能选择'+row.maximum+'项',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur']
					});
				}
			}
			
			return rule_arr;
		}
	}
}

//登录成功跳转
export const loginfunc = {
	methods: {
		//登录成功
		success(index) {
			//重置下用户信息
			let apptype = '';
			let platform = '';
			
			// #ifdef MP-WEIXIN
			platform = 'wechat';
			apptype = 'miniapp';
			// #endif			
			this.$api.getUserIndex({apptype,platform}).then(res => {				
				if (res.code) {
					this.$u.vuex('vuex_user', res.data.userInfo);
				}
				//不在H5
				// #ifndef H5
				console.log('跳转几层',index);
				if(index*1 == 1){
					uni.redirectTo({
						url:'/pages/index/index'
					})
				}else{
					uni.navigateBack({
						delta: index
					})
				}
				// #endif
				// 在H5 刷新导致路由丢失
				// #ifdef H5
				var pages = getCurrentPages();				
				//有上次页面，关闭所有页面，到此页面,是从授权的，授权页面被刷新过
				if (pages.length <= 1 || pages[0].route=='pages/login/auth') {
					//默认到首页
					uni.reLaunch({
						url: (this.vuex_lasturl || '/pages/index/index'),
						complete(res) {
							console.log(res)
						}
					})
					return;
				}
				uni.navigateBack({
					delta: index
				})
				// #endif
			});
			
		},
		// #ifdef H5
		async goAuth() {
			if (this.$util.isWeiXinBrowser()) {
				let url = '';
				if (window.location.hash != '') {
					url = window.location.origin + window.location.pathname + '?hashpath=/pages/login/auth'
				} else {
					url = window.location.origin + window.location.pathname.replace(/pages.*/,'pages/login/auth');
				};
				let res = await this.$api.getAuthUrl({
					platform: 'wechat',
					url: url
				});
				if (!res.code) {
					this.$u.toast(this.$t('prompts.Network'));
					return;
				}
				var pages = getCurrentPages();
				let len = pages.length;
				if (len > 1) {
					let url = pages[len - 1].route;
					if (url.indexOf('login') != -1) {
						//找到上一个不是登录页面
						for (let i = len - 1; i >= 0; i--) {
							if (pages[i].route.indexOf('login') == -1) {
								this.$u.vuex('vuex_lasturl', '/' + pages[i].route + this.$u.queryParams(pages[i]
									.options));
								break;
							}
						}
					} else {
						this.$u.vuex('vuex_lasturl', '/' + url + this.$u.queryParams(pages[pages.length - 1]
							.options))
					}
				}
				window.location.href = res.data;
			}
		},
		// #endif
		// #ifdef APP-PLUS
		goAppLogin(index = 1) {
			let that = this;
			var all, Service;
			// 1.发送请求获取code
			plus.oauth.getServices(
				function(Services) {
					all = Services;
					Object.keys(all).some(key => {
						if (all[key].id == 'weixin') {
							Service = all[key];
						}
					});
					Service.authorize(
						async function(e) {
								console.log(e);
								let res = await that.$api.goAppLogin({
									code: e.code,
									scope: e.scope
								});
								if (!res.code) {
									that.$u.toast(res.msg);
									return;
								}
								if (res.data.user) {
									that.$u.vuex('vuex_token', res.data.user.token);
									that.success(index);
									return;
								}
								that.$u.vuex('vuex_third', res.data.third);
								// that.$u.route('/pages/login/register?bind=bind');
								that.$u.route('/pages/login/wxlogin?bind=bind');
							},
							function(e) {
								that.$u.toast('授权失败！');
							}
					);
				},
				function(err) {
					console.log(err);
					that.$u.toast('授权失败！');
				}
			);
		}
		// #endif
	}
}
