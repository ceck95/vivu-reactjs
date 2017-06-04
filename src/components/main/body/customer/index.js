import React, { Component } from 'react';

/**
 * Map props for Redux
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../../../actions/index';
import ReactBase from 'react-base';
import { helpers } from 'react-base';

/**
 * Import component
 */

import Menu from './menu';
import Info from './info';
import Order from './order';

import config from '../../../../config/index';

import statusLoadComponent from '../../../../const/load-status-component';

import BreadCrumb from '../common/breadcrumb';

class Customer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: '',
      showOrder: false,
      dataBreadCrumb: []
    }
  }

  componentWillMount() {
    this.setState({
      activeTab: config.default.defaultActiveTabCustomerInfo,
      dataBreadCrumb: [
        {
          name: 'Khách hàng',
          urlKey: null,
          currentLink: true
        }
      ]
    });
    this.setInitVal(this.props);
  }

  setInitVal(props) {
    if (props.dataLogin.activeTabOrder) {
      this.setState({
        activeTab: 'order'
      });
    }
  }

  componentDidMount() {}

  componentWillUpdate() {}

  componentDidUpdate() {}

  componentWillReceiveProps(nextProps) {
    this.setInitVal(nextProps);
  }

  activeTab(str) {
    this.setState({
      activeTab: str
    });
    this.props.actions.changeStatusLoadDataOrder(statusLoadComponent.backOrderDetailPageCustomer);
  }

  render() {
    let customerData = this.props.dataLogin.customer;

    return (
      <div className="container main main-other">
        <BreadCrumb dataBreadCrumb={ this.state.dataBreadCrumb } />
        <div className="row">
          <Menu dataLogin={ customerData } actions={ this.props.actions } data={ this.props.dataLogin } activeTab={ this.activeTab.bind(this) } />
          { this.state.activeTab === 'user' ?
            <Info dataLogin={ customerData } actions={ this.props.actions } />
            : '' }
          { this.state.activeTab === 'order' ?
            <Order dataCustomer={ customerData } dataCategoryGroup={ this.props.categoryGroup } actions={ this.props.actions } dataOrder={ this.props.dataOrder } /> :
            '' }
        </div>
      </div>
      );

  }

}

Customer.propTypes = {
  actions: React.PropTypes.object,
  name: React.PropTypes.string
};

let mapRedux = new ReactBase.helpers.mapRedux({
  actions: actions,
  bindActionCreators: bindActionCreators
});

export default connect(mapRedux.mapStateToProps, mapRedux.mapDispatchToProps)(Customer)
