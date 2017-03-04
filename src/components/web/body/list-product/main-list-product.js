/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-03-02T21:51:01+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-03T20:46:14+07:00
*/

import React, {Component} from 'react';
//components
import LeftMenuListProduct from './left-menu-list-product';
import BodyPageListProduct from './body-page-list-product';

//map props
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actions from '../../../../actions/index';
import ReactBase from 'react-base';
import {helpers} from 'react-base';

class MainListProduct extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container main main-orther">
        <div className="title-link">
          <a href="#">Trang chủ</a>
          <i className="fa fa-chevron-right" aria-hidden="true"></i>
          <a href="#">Laptop & máy tính</a>
        </div>
        <BodyPageListProduct dataCategoryGroup={this.props.categoryGroup} actions ={this.props.actions} params={this.props.params}/>
      </div>
    )
  }

}

let mapRedux = new ReactBase.helpers.mapRedux({actions: actions, bindActionCreators: bindActionCreators});

export default connect(mapRedux.mapStateToProps, mapRedux.mapDispatchToProps)(MainListProduct);
