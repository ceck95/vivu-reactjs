/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2016-10-17T10:56:36+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-11T11:55:06+07:00
*/

import React from 'react';

import 'font-awesome/css/font-awesome.css';
import reducers from './reducers/index';
import routers from './routers/index';
import ReactBase from 'react-base';

import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {compose, combineReducers, createStore, applyMiddleware} from 'redux';
import {Router, Route, IndexRoute, hashHistory, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';

import config from './config/index';
import actions from './actions/index';

class Container {

  constructor() {

    this._container = new ReactBase.ContainerBase({
      hashHistory: false,
      reducers: reducers,
      routers: routers,
      elementById: 'root',
      authenticate: {
        status: true,
        statusActionLoginFail: false,
        keyToken: config.login.keyAccessToken,
        actionsBeforeRender: actions.profile,
        // actionsLoginFail: authActions.loadLogin({loadLogin: true})
      }
    }, compose, combineReducers, createStore, applyMiddleware, syncHistoryWithStore, routerReducer, routerMiddleware, thunk, hashHistory, browserHistory);

  }

  renderInt() {

    if (this._container.before) {
      this._container.before();
    }

    render(
      <Provider store={this._container.store}>
      <Router history={this._container.history}>
        {this._container.routers}
      </Router>
    </Provider>, document.getElementById(this._container.elementById));

  }

}

let container = new Container();

container.renderInt();
