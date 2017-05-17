import React, { Component } from 'react';
import config from '../../../../config/index';
import { Link } from 'react-router';

class MenuCustomer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataLogin: {},
      activeTab: ''
    }
  }

  setInitValue(props) {
    this.setState({
      dataLogin: this.props.dataLogin
    });
    if (props.data.activeTabOrder) {
      this.setState({
        activeTab: 'order'
      });
      this.props.actions.activeTabOrderPageCustomer(false);
    }
  }

  componentWillMount() {
    this.setState({
      activeTab: config.default.defaultActiveTabCustomerInfo
    });
    this.setInitValue(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setInitValue(nextProps);
  }

  setActive(str) {
    this.setState({
      activeTab: str
    });
    this.props.activeTab(str);
  }

  render() {

    return (
      <div className="col-sm-4 col-md-3">
        <div className="customer_menu">
          <div className="customer_item customer_item-flex">
            <p className="customer_item_username">Tài khoản của:
              <br></br>
              <span>{ this.state.dataLogin.fullName }</span>
            </p>
          </div>
          <div className="customer_item">
            <Link onClick={ this.setActive.bind(this, 'user') } className={ `link ${this.state.activeTab === 'user'? 'active':''}` }>
            <span><i className="fa fa-user"></i></span> Thông tin tài khoản
            </Link>
          </div>
          <div className="customer_item">
            <Link onClick={ this.setActive.bind(this, 'order') } className={ `link ${this.state.activeTab === 'order'? 'active':''}` }>
            <span><i className="fa fa-list-alt"></i></span> Quản lý đơn hàng
            </Link>
          </div>
          <div className="customer_item"></div>
          <div className="customer_item"></div>
          <div className="customer_item"></div>
          <div className="customer_item"></div>
        </div>
      </div>
      );

  }

}

MenuCustomer.propTypes = {
  name: React.PropTypes.string
};

export default MenuCustomer;