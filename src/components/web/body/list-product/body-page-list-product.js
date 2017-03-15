/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-03-02T21:53:44+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   root
* @Last modified time: 2017-03-08T10:30:53+07:00
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

import config from '../../../../config/index';

class BodyPageListProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataListProduct: [],
      dataPaginate: {},
      itemMenuCurrent: {}
    }
  }

  componentWillMount() {
    if (this.props.params.urlKeyCategory) {
      this.handleGetApiProductHasEffect('category', false, this.props);
    } else if (this.props.params.urlKeyCategoryGroup) {
      this.handleGetApiProductHasEffect('categoryGroup', false, this.props);
    }
    if (this.props.dataBreadCrumb.length > 0) {
      this.handleMenuItemCurrent(this.props.dataBreadCrumb);
    }

  }

  handleMenuItemCurrent(dataBreadCrumb) {
    dataBreadCrumb.forEach(e => {
      if (e.currentLink) {
        this.setState({
          itemMenuCurrent: {
            name: e.name,
            urlKey: e.urlKey
          }
        });
      }
    });
  }

  handleGetApiProductHasEffect(options, effect, props) {
    let choose = '',
      chooseUrlKey = '';
    if (options === 'category') {
      choose = 'category';
      chooseUrlKey = 'urlKeyCategory'
    } else if (options === 'categoryGroup') {
      choose = 'categoryGroup';
      chooseUrlKey = 'urlKeyCategoryGroup'
    }
    if (effect) {
      if (config.default.effectLoadListProduct) {
        this.setState({dataListProduct: [], dataPaginate: {}});
      }
    }

    this.props.actions.getProductByUrlKey(choose, props.params[chooseUrlKey], null, props.loadProduct);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataPaginate.loadingProduct === loadStatus.assignDataLoad) {
      this.setState({dataListProduct: nextProps.dataListProduct, dataPaginate: nextProps.dataPaginate});
      this.props.actions.statusLoadProductByPagination(helpers.Data.assign(nextProps.dataPaginate, {loadingProduct: loadStatus.loaded}));
    }

    if (nextProps.loadProduct.loadOfRouter === loadStatus.assignDataLoad) {
      this.setState({dataListProduct: nextProps.dataListProduct, dataPaginate: nextProps.dataPaginate});
      this.props.actions.statusLoadProduct(helpers.Data.assign(nextProps.loadProduct, {loadOfRouter: loadStatus.loaded}));
    }

    if (nextProps.dataPaginate.loadingProduct === loadStatus.loading) {
      this.setState({dataListProduct: [], dataPaginate: {}});
    }
    if (nextProps.params.urlKeyCategory) {
      if (this.props.params.urlKeyCategory !== nextProps.params.urlKeyCategory) {
        this.handleGetApiProductHasEffect('category', true, nextProps);
      }
    } else {
      if (this.props.params.urlKeyCategoryGroup !== nextProps.params.urlKeyCategoryGroup) {
        this.handleGetApiProductHasEffect('categoryGroup', true, nextProps);
      } else if (this.props.params.urlKeyCategory !== nextProps.params.urlKeyCategory) {
        this.handleGetApiProductHasEffect('categoryGroup', true, nextProps);
      }
    }

    if (this.props.params.urlKeyCategoryGroup !== nextProps.params.urlKeyCategoryGroup || this.props.params.urlKeyCategory !== nextProps.params.urlKeyCategory) {
      if (nextProps.dataBreadCrumb.length > 0) {
        this.handleMenuItemCurrent(nextProps.dataBreadCrumb);
      }
    }

  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-9 col-md-8 pull-right main_lists">
          <h2 className="main_lists_title">{this.state.itemMenuCurrent.name}</h2>
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
        <LeftMenuListProduct dataCategoryGroup={this.props.dataCategoryGroup} itemMenuCurrent={this.state.itemMenuCurrent} params={this.props.params}/>
      </div>
    )
  }

}

let mapRedux = new ReactBase.helpers.mapRedux({actions: actions, bindActionCreators: bindActionCreators});

export default connect(mapRedux.mapStateToProps, mapRedux.mapDispatchToProps)(BodyPageListProduct);
