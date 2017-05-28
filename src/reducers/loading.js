/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-19T15:47:25+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-01T09:53:02+07:00
 */

const type = require('../const/redux-actions');
const helpers = require('react-base').helpers;
module.exports = (loading = {
    loadSuccess: null,
    loadingProductByCategory: null,
    loadingCategoryGroup: null,
    loading: null
  } , action) => {
  switch (action.type) {
    case type.statusLoadingProductByCategory:
      return helpers.Data.assign(action.data, {
        loadingProductByCategory: true
      });
    case type.statusLoadingCategoryGroup:
      return helpers.Data.assign(loading, {
        loadingCategoryGroup: true
      });
    case type.statusLoadingPage:
      return helpers.Data.assign(loading, {
        loading: action.status
      })
    default:
      return loading;
  }
};