/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-26T22:06:38+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-04T16:48:40+07:00
 */

const helpers = require('../../helpers/index');
import categoryGroupActions from '../header/category-group';
import loadingActions from '../loading';
import productActions from '../product/data';
import paginateActions from '../product/pagination';
import loadingProductActions from '../product/load';
import loadStatus from '../../const/load-status';
import ReactBase from 'react-base';

let apiProductActions = {

  getProductByCategoryGroup: (categoryGroupId, dataCategoryGroup, loadingPage) => {
    return (dispatch) => {
      return helpers.requestBasic({
        uri: `/products?filter[categoryGroupId]=${categoryGroupId}`,
        method: 'GET'
      }).then(data => {
        dispatch(categoryGroupActions.setDataProductToCategoryGroup(data, dataCategoryGroup));
        dispatch(loadingActions.statusLoadingProductByCategory(loadingPage));
      });

    }
  },
  getProductByUrlKeyCategoryGroup: (urlKey, i, loadProduct, loadProductOfPagination) => {
    return (dispatch) => {
      if (!i) {
        i = 1;
      }
      return helpers.requestBasic({
        uri: `/products?filter[urlKeyCategoryGroup]=${urlKey}&page=${i}`,
        method: 'GET'
      }).then(data => {
        dispatch(productActions.setDataProductsToList(data));
        dispatch(paginateActions.setPaginateData(data.meta));
        if (loadProduct) {
          dispatch(loadingProductActions.statusLoadProduct(ReactBase.helpers.Data.assign(loadProduct, {
            loadOfRouter: loadStatus.assignDataLoad
          })))
        }
        if (loadProductOfPagination) {
          dispatch(paginateActions.statusLoadProductByPagination(Object.assign({}, data.meta, loadProductOfPagination)));
        }
      });
    }
  }

};

export default apiProductActions;
