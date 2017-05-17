/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2016-12-05T12:08:17+07:00
* @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-23T18:15:26+07:00
*/

import Components from '../components/index';

import Layout from '../view/layout/index';
import ViewIndex from '../view/index';
import ReactBase from 'react-base';
import { push } from 'react-router-redux';
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import config from '../config/index';

const requireAuthentication = ReactBase.AuthWrapper.UserAuthWrapper({
  authSelector: state => state.dataLogin,
  predicate: auth => auth.isAuthenticated,
  redirectAction: push,
  wrapperDisplayName: 'UserIsAuthenticated',
  failureRedirectPath: '/',
  redirectQueryParamName: config.login.redirectQueryParamName
});

module.exports = (
  <Route path='/' component={ ViewIndex }>
    <Route component={ Layout.Index.default }>
      <IndexRoute component={ Components.main } />
      <Route path='/:urlKeyCategoryGroup' getComponent={ (params, callback) => {
                                                           if (params.location.pathname === '/cart') {
                                                             return callback(null, Components.cart);
                                                           } else if (params.location.pathname === '/checkout') {
                                                             return callback(null, Components.checkout);
                                                           } else if (params.location.pathname === '/customer') {
                                                             return callback(null, requireAuthentication(Components.customer));
                                                           }
                                                           return callback(null, Components.listProduct);
                                                         } } />
      <Route path='/:urlKeyCategoryGroup/:urlKeyCategory' component={ Components.listProduct } />
      <Route path='/:urlKeyCategoryGroup/:urlKeyCategory/:urlKeyProduct' component={ Components.detailProduct } />
    </Route>
  </Route>
);
