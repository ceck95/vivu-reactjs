/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-26T22:06:38+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-23T18:25:45+07:00
 */

const helpers = require('../../helpers/index');
import categoryGroupActions from '../header/category-group';
import loadingActions from '../loading';
import productActions from '../product/data';
import paginateActions from '../product/pagination';
import menuCategoryActions from '../header/menu-category';
import loadingProductActions from '../product/load';
import loadStatus from '../../const/load-status';
import ReactBase from 'react-base';
import config from '../../config/index';
import filterProductActions from '../product/filter';


const pageSize = config.default.pageSizeFilter;

import searchMenuCategoryActions from '../header/search-menu-category';

let apiProductActions = {

	getProductByCategoryGroup: (categoryGroupId, dataCategoryGroup, loadingPage, menuCategory) => {
		return (dispatch) => {
			return helpers.requestBasic({
				uri: `/products/home?filter[categoryGroupId]=${categoryGroupId}&filter[limit]=${config.default.limitListProductHome}&filter[limitProductRight]=${config.default.limitListProductRightHome}`,
				method: 'GET'
			}, dispatch).then(data => {
				dispatch(categoryGroupActions.setDataProductToCategoryGroup(data, dataCategoryGroup));
				dispatch(loadingActions.statusLoadingProductByCategory(loadingPage));
				dispatch(menuCategoryActions.setLoadedListProductHome(ReactBase.helpers.Data.assign(menuCategory, {
					loadedListProductHome: true
				})));
				return null;
			});

		}
	},
	getProductByUrlKey: (choose, urlKey, i, loadProduct, loadProductOfPagination, filter) => {
		return (dispatch) => {
			if (!i) {
				i = 1;
			}

			let chooseKey = '';
			if (choose === 'category') {
				chooseKey = 'urlKeyCategory';
			} else if (choose === 'categoryGroup') {
				chooseKey = 'urlKeyCategoryGroup';
			}

			apiProductActions.handleCommonProductListBeforeLoad(dispatch);

			return helpers.requestBasic({
				uri: `/products?filter[${chooseKey}]=${urlKey}&page=${i}&pageSize=${pageSize}${apiProductActions.getStringFilter(filter)}`,
				method: 'GET'
			}, dispatch).then(data => {
				apiProductActions.handleLoadProductList(dispatch, data, loadProduct, loadProductOfPagination);
				return null;
			});
		}
	},
	handleCommonProductListBeforeLoad: (dispatch) => {
		dispatch(filterProductActions.setStatusLoadFilter(loadStatus.available));
	},
	handleLoadProductList: (dispatch, data, loadProduct, loadProductOfPagination) => {
		dispatch(productActions.setDataProductsToList(data));
		dispatch(paginateActions.setPaginateData(data.meta));
		if (loadProduct) {
			dispatch(loadingProductActions.statusLoadProduct(ReactBase.helpers.Data.assign(loadProduct, {
				loadOfRouter: loadStatus.assignDataLoad
			})));
		}

		if (loadProductOfPagination) {
			dispatch(paginateActions.statusLoadProductByPagination(Object.assign({}, data.meta, loadProductOfPagination)));
		}
	},
	getStringFilter: (query) => {
		let str = '';
		if (query.price) {
			str += `&filter[price]=${query.price}`;
		}
		if (query.priceOrder) {
			str += `&filter[priceOrder]=${query.priceOrder}`;
		}
		return str;
	},
	getProductSearch: (key, categoryGroupId, page, loadProduct, loadProductOfPagination, searchMenuCategory, filter) => {
		let queryCategoryGroupId = `&filter[categoryGroupId]=${categoryGroupId}`;
		return (dispatch) => {

			if (searchMenuCategory) {
				dispatch(searchMenuCategoryActions.setCategoryGroupCurrent(ReactBase.helpers.Data.assign(searchMenuCategory, {
					statusLoad: loadStatus.available
				})));
			}

			apiProductActions.handleCommonProductListBeforeLoad(dispatch);

			return helpers.requestMerge({
				uri: `/products?filter[search]=${key}${categoryGroupId? queryCategoryGroupId:''}&page=${page}&pageSize=${pageSize}${apiProductActions.getStringFilter(filter)}`,
				method: 'GET'
			}, dispatch, true).then(data => {
				apiProductActions.handleLoadProductList(dispatch, data, loadProduct, loadProductOfPagination);
				return null;
			})
		};
	}

};

export default apiProductActions;