<script>
	export default {
		globalData: {
			// apiServiceUrl: 'http://192.168.0.100:8083'
			// apiServiceUrl: 'http://192.168.10.136:9013'
			// apiServiceUrl: 'http://wisdomsaint.cn:9013'
			apiServiceUrl: 'https://wisdomsaint.cn/'
			// apiServiceUrl: 'http://192.168.10.133:9013'
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import '@/uni_modules/uview-ui/index.scss';
@import url('static/css/complete.css');
</style>
