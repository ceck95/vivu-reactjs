import React, { Component } from 'react';
import statusLoad from '../../../../const/load-status';
import config from '../../../../config/index';
import DetailOrder from './detail-order';

import statusLoadComponent from '../../../../const/load-status-component';
import Utility from '../../../../helpers/utility';

class OrderCustomer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataOrder: [],
      showOrder: true,
      detailOrder: {},
      dataCustomer: {}
    }
  }

  setInitVal(props) {
    this.setState({
      dataCustomer: props.dataCustomer
    });
  }

  componentWillMount() {
    if (this.props.dataOrder.statusLoad === statusLoad.available) {
      this.props.actions.changeStatusLoadDataOrder(statusLoad.assignDataLoad);
    } else {
      this.props.actions.getOrders();
    }
    this.setInitVal(this.props);
  }

  componentWillReceiveProps(nextProps) {
    let changeStatusAvailableDataOrder = () => {
      this.props.actions.changeStatusLoadDataOrder(statusLoad.available);
    };
    if (nextProps.dataOrder.statusLoad === statusLoad.assignDataLoad) {
      this.setState({
        dataOrder: nextProps.dataOrder.orders
      });
      changeStatusAvailableDataOrder();
    }

    if (nextProps.dataOrder.statusLoad === statusLoadComponent.backOrderDetailPageCustomer) {
      this.setState({
        showOrder: true
      });
      changeStatusAvailableDataOrder();
    }
    this.setInitVal(nextProps);
  }

  getStringDate(date) {
    let d = new Date(date);
    return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
  }

  getStringProduct(data) {
    return `${data[0].product.name}${data.length > 1 ? `... và ${data.length-1} sản phẩm khác` : ''}`;
  }

  detailOrder(e) {
    this.setState({
      showOrder: false,
      detailOrder: e
    });
  }

  render() {
    let listE = [];
    if (this.state.dataOrder.length > 0) {
      this.state.dataOrder.forEach((e, i) => {
        listE.push(
          <tr key={ i }>
            <td>
              <a onClick={ this.detailOrder.bind(this, e) } className="link">
                { `#${e.code }` }
              </a>
            </td>
            <td>
              { this.getStringDate(e.createdAt) }
            </td>
            <td>
              { this.getStringProduct(e.orderItems) }
            </td>
            <td>
              { Utility.formatCurrency(e.grandTotal) }
            </td>
            <td>
              { Utility.translateStatusOrder(e.orderStatus) }
            </td>
          </tr>
        )
      });
    }

    return (
      <div className="col-sm-8 col-md-9">
        { this.state.showOrder ?
          <div>
            <h1>Đơn hàng của tôi</h1>
            <div className="customer_content pull-left">
              <table className="tbl-default tbl-orders tbl-hover">
                <thead>
                  <tr>
                    <td>Mã đơn hàng</td>
                    <td>Ngày mua</td>
                    <td className="product">Sản phẩm</td>
                    <td>Tổng tiền</td>
                    <td>Trạng thái đơn hàng</td>
                  </tr>
                </thead>
                <tbody>
                  { listE }
                </tbody>
              </table>
            </div>
          </div>
          : <DetailOrder dataCategoryGroup={ this.props.dataCategoryGroup } dataCustomer={ this.state.dataCustomer } detailOrder={ this.state.detailOrder } /> }
      </div>
      );

  }

}

OrderCustomer.propTypes = {
  name: React.PropTypes.string
};

export default OrderCustomer;