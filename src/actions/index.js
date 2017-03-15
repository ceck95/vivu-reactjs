/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-17T11:59:01+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   root
* @Last modified time: 2017-03-14T17:39:38+07:00
 */

'use strict';

import loadingActions from './loading/index';
import searchMenuCategoryActions from './header/search-menu-category';
import menuCategoryActions from './header/menu-category';
import apiCategoryGroupActions from './api/category-group';
import categoryGroupActions from './header/category-group';
import apiProductActions from './api/product';
import paginateActions from './product/pagination';
import loadProductActions from './product/load';
import popUpActions from './header/pop-up';
import apiLoginActions from './api/login';
import notifyActions from './header/notify';
import apiAddressActions from './api/address';

let actions = Object.assign(loadingActions, searchMenuCategoryActions, menuCategoryActions, apiCategoryGroupActions, categoryGroupActions, apiProductActions, paginateActions, loadProductActions, popUpActions, apiLoginActions, notifyActions, apiAddressActions);

export default actions;
