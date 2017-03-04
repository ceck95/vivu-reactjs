/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-26T22:06:38+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-01T09:15:14+07:00
 */

const type = require('../../const/redux-actions');
const helpers = require('../../helpers/index');
import categoryGroupActions from '../header/category-group';
import apiProductActions from './product';
import loadingActions from '../loading';

let apiCategoryGroupActions = {

  getCategoryGroup: () => {
    return (dispatch) => {
      return helpers.requestBasic({
        uri: '/categories-group',
        method: 'GET'
      }).then(data => {
        dispatch(categoryGroupActions.setDataCategoryGroup(data));
        dispatch(loadingActions.statusLoadingCategoryGroup());
      });

    }
  }

};

export default apiCategoryGroupActions;
