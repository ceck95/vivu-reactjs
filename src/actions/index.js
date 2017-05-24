/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-17T11:59:01+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-22T16:37:05+07:00
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
import addressActions from './address/data';
import detailProductActions from './detail-product/data';
import apiDetailProductActions from './api/detail-product';
import imageZoomProductDetailActions from './detail-product/image-zoom';
import apiQuoteActions from './api/quote';
import apiQuoteItemActions from './api/quote-item';
import quoteItemActions from './quote/cart';
import quoteActions from './quote/data';
import loginActions from './login/index';
import checkoutActions from './checkout/data';
import checkOrderActions from './checkout/check';
import orderActionsApi from './api/order';
import orderActions from './order/data';
import productFilterActions from './product/filter';
import dataSettingActions from './setting/data';
import apiSettingActions from './api/setting';

let actions = Object.assign(loadingActions, searchMenuCategoryActions,
  menuCategoryActions, apiCategoryGroupActions,
  categoryGroupActions, apiProductActions,
  paginateActions, loadProductActions,
  popUpActions, apiLoginActions,
  notifyActions, apiAddressActions,
  addressActions, detailProductActions,
  apiDetailProductActions, imageZoomProductDetailActions,
  apiQuoteActions, apiQuoteItemActions,
  quoteItemActions, quoteActions,
  loginActions, checkoutActions,
  checkOrderActions, orderActionsApi,
  orderActions, productFilterActions,
  dataSettingActions, apiSettingActions);

export default actions;
