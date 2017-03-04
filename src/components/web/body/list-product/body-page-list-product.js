/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-03-02T21:53:44+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-04T16:40:26+07:00
*/

import React, {Component} from 'react';
import ListProduct from '../common/list-product';
import LeftMenuListProduct from './left-menu-list-product';
import Pagination from './pagination';
import {helpers} from 'react-base';
import loadStatus from '../../../../const/load-status';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actions from '../../../../actions/index';
import ReactBase from 'react-base';

class BodyPageListProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataListProduct: [],
      dataPaginate: {}
    }
  }

  componentWillMount() {
    this.props.actions.getProductByUrlKeyCategoryGroup(this.props.params.urlKeyCategoryGroup, null, this.props.loadProduct);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataPaginate.loadingProduct === loadStatus.assignDataLoad) {
      this.setState({dataListProduct: nextProps.dataListProduct, dataPaginate: nextProps.dataPaginate});
      console.log(nextProps.dataPaginate);
      this.props.actions.statusLoadProductByPagination(helpers.Data.assign(nextProps.dataPaginate, {loadingProduct: loadStatus.loaded}));
    }

    if (nextProps.loadProduct.loadOfRouter === loadStatus.assignDataLoad) {
      this.setState({dataListProduct: nextProps.dataListProduct, dataPaginate: nextProps.dataPaginate});
      this.props.actions.statusLoadProduct(helpers.Data.assign(nextProps.loadProduct, {loadOfRouter: loadStatus.loaded}));
    }

    if (nextProps.dataPaginate.loadingProduct === loadStatus.loading) {
      this.setState({dataListProduct: [], dataPaginate: {}});
    }
    if (this.props.params.urlKeyCategoryGroup !== nextProps.params.urlKeyCategoryGroup) {
      this.setState({dataListProduct: [], dataPaginate: {}});
      this.props.actions.getProductByUrlKeyCategoryGroup(nextProps.params.urlKeyCategoryGroup, null, nextProps.loadProduct);
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-9 col-md-8 pull-right main_lists">
          <h2 className="main_lists_title">Laptop và điện tử</h2>
          <div className="main_lists_group-btn">
            <button className="btn-default pull-left">giam gia nhieu nhat</button>
            <button className="btn-default pull-left">Ban chay nhat</button>
            <button className="btn-default pull-left">Gia thap nhat</button>
          </div>
          <div className="row">
            <ListProduct dataItemProduct={this.state.dataListProduct}/>
          </div>
          <Pagination dataPaginate={this.state.dataPaginate} actions={this.props.actions} params={this.props.params}/>
        </div>
        <LeftMenuListProduct dataCategoryGroup={this.props.dataCategoryGroup}/>
      </div>
    )
  }

}

let mapRedux = new ReactBase.helpers.mapRedux({actions: actions, bindActionCreators: bindActionCreators});

export default connect(mapRedux.mapStateToProps, mapRedux.mapDispatchToProps)(BodyPageListProduct);
