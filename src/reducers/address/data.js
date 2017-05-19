/**
 * @Author: Tran Van Nhut (nhutdev) 
 * @Date: 2017-04-07 12:05:31 
 * @Email:  tranvannhut4495@gmail.com 
 * @Last modified by:   nhutdev 
 * @Last modified time: 2017-04-07 12:05:31 
 */


const type = require('../../const/redux-actions');
const statusLoad = require('../../const/load-status');
const statusLoadComponent = require('../../const/load-status-component');

import { helpers } from 'react-base';

module.exports = (dataAddress = {
		provinces: [],
		districts: [],
		wards: [],
		listAddress: [],
		statusLoadListAddress: null,
		checkDistrict: null,
		checkWard: null
	} , action) => {
	switch (action.type) {
		case type.setDataProvinces: {
			dataAddress.wards = [];
			dataAddress.districts = [];
			return helpers.Data.assign(dataAddress, {
				provinces: action.data.provinces,
				districts: [],
				wards: []
			});
		}
		case type.setDataDistricts: {
			action.address.wards = [];
			action.address.districts = [];
			if (action.autoCheckData) {
				return helpers.Data.assign(helpers.Data.assign({
					districts: action.data.districts,
					wards: []
				}, action.address), action.autoCheckData);
			}

			return helpers.Data.assign({
				districts: action.data.districts,
				wards: []
			}, action.address);
		}
		case type.setDataWards: {
			action.address.wards = [];
			if (action.autoCheckData) {
				return helpers.Data.assign(helpers.Data.assign(action.address, {
					wards: action.data.wards
				}), action.autoCheckData);
			}

			return helpers.Data.assign(action.address, {
				wards: action.data.wards
			});
		}
		case type.setDataAddress: {
			return helpers.Data.assign(dataAddress, {
				listAddress: action.data,
				statusLoadListAddress: statusLoad.assignDataLoad
			});
		}
		case type.changeStatusAddress: {
			return helpers.Data.assign(dataAddress, {
				statusLoadListAddress: action.status
			});
		}
		case type.removeItemAddress: {
			action.address.listAddress.forEach((e, i) => {
				if (e.id === action.id) {
					action.address.listAddress.splice(i, 1);
				}
			});
			return helpers.Data.assign(action.address, {
				listAddress: action.address.listAddress
			});
		}
		case type.setAutoCheckAddressAvailable: {
			return helpers.Data.assign(action.address, action.dataAutoCheck)
		}
		case type.updateListAddress: {
			let listAddress = [],
				listE = action.data.listAddress;

			delete action.data.listAddress;

			listE.forEach((e) => {
				if (e.id === action.address.customerAddress.id) {
					listAddress.push(action.address.customerAddress);
				} else {
					listAddress.push(e);
				}
			});
			if (action.address.customerAddress.isDefault) {
				listAddress.forEach((e, i) => {
					if (e.id !== action.address.customerAddress.id) {
						listAddress[i].isDefault = false;
					}
				});

				listAddress.sort((x, y) => {
					return (x.isDefault === y.isDefault) ? 0 : x.isDefault ? -1 : 1;
				});
			}


			return helpers.Data.assign(action.data, {
				listAddress: listAddress,
				statusLoadListAddress: statusLoad.assignDataLoad
			});
		}
		case type.setItemDataListAddress: {
			if (action.removeList) {
				dataAddress.listAddress = [];
			}
			dataAddress.listAddress.push(action.item);
			dataAddress.statusLoadListAddress = statusLoadComponent.readyAssignDataListAddressCheckout;
			return dataAddress;

		}
		default:
			return dataAddress;
	}
};