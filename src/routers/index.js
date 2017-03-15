/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2016-12-05T12:08:17+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   root
* @Last modified time: 2017-03-09T20:06:03+07:00
*/

import Components from '../components/index';

import Layout from '../view/layout/index';
import ViewIndex from '../view/index';
import ReactBase from 'react-base';
import {push} from 'react-router-redux';
import React from 'react';
import {Route, IndexRoute} from 'react-router';

const requireAuthentication = ReactBase.AuthWrapper.UserAuthWrapper({
  authSelector: state => state.authData,
  predicate: auth => auth.isAuthenticated,
  redirectAction: push,
  wrapperDisplayName: 'UserIsAuthenticated'
});

module.exports = (
  <Route path='/' component={ViewIndex}>
    <Route component={Layout.Index.default}>
      <IndexRoute component={Components.web}/>
      <Route path='/:urlKeyCategoryGroup' component={Components.listProduct}/>
      <Route path='/:urlKeyCategoryGroup/:urlKeyCategory' component={Components.listProduct}/>
    </Route>
  </Route>
);
