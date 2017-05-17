/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-19T15:47:25+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-11T00:27:19+07:00
 */

const type = require('../../const/redux-actions');
const helpers = require('react-base').helpers;
const loadStatus = require('../../const/load-status');

module.exports = (dataLogin = {
		isAuthenticated: false,
		loadStatus: null,
		activeTabOrder: null
	} , action) => {
	switch (action.type) {
		case type.setDataLoginSuccess: {
			action.data.isAuthenticated = true;
			action.data.loadStatus = loadStatus.assignDataLoad;
			return action.data;
		}
		case type.logout: {
			let data = {};
			data.isAuthenticated = false;
			data.loadStatus = loadStatus.assignDataLoad;
			return data;
		}
		case type.changeStatusDataLogin: {
			return helpers.Data.assign(action.data, {
				loadStatus: action.status
			});
		}
		case type.activeTabOrderPageCustomer: {
			return helpers.Data.assign(dataLogin, {
				activeTabOrder: action.data
			});
		}
		default:
			return dataLogin;
	}
};
