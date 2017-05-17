import React, { Component } from 'react';
import Utility from '../../../../helpers/utility';
import methodCheckOut from '../../../../const/check-out';
import config from '../../../../config/index';

class CustomerDetailOrder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      detailOrder: {},
      dataCustomer: {}
    }
  }

  setInitVal(props) {
    this.setState({
      detailOrder: props.detailOrder,
      dataCustomer: props.dataCustomer
    })
  }

  componentWillMount() {
    this.setInitVal(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setInitVal(nextProps);
  }

  getStrDate(date) {
    let d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  }

  getStrCheckOut(method) {
    let str = '';
    switch (method) {
      case methodCheckOut.cashOnDelivery:
        str = 'Thanh toán tiền mặt khi nhận hàng';
        break;
      default:
        break;
    }

    return str;
  }

  render() {
    let infoDetail = this.state.detailOrder,
      addressShipping = infoDetail.address,
      cdnLink = config.cdn.link,
      listProductE = [],
      products = infoDetail.orderItems;

    if (products.length > 0) {
      products.forEach((e, i) => {
        listProductE.push(
          <tr key={ i }>
            <td className="item-center">
              <img src={ `${cdnLink}${e.product.imagePath}` } alt="" className="tbl-img img-responsive" />
              <a className="link-underline" href="#">
                { e.product.name }
              </a>
            </td>
            <td>
              { e.product.sku }
            </td>
            <td>
              { e.basePrice }
            </td>
            <td>
              { e.quantity }
            </td>
            <td>
              { e.basePrice }
            </td>
          </tr>
        )
      });
    }

    return (
      <div>
        <h1 className="font-normal pull-left">Chi tiết đơn hàng #{ infoDetail.code } - <span className="bold">{ Utility.translateStatusOrder(infoDetail.orderStatus) }</span><p className="pull-right text">Ngày đặt hàng: { this.getStrDate(infoDetail.createdAt) }</p></h1>
        <div className="row">
          <div className="col-sm-4 m-b-15">
            <h3 className="title">Địa chỉ người nhận</h3>
            <div className="detail-box">
              <h4>{ addressShipping.customerName }</h4>
              <p className="m-b-15">Địa chỉ:
                { addressShipping.fullName }
              </p>
              <p>Điện thoại:
                { addressShipping.phone }
              </p>
            </div>
          </div>
          <div className="col-sm-4 m-b-15">
            <h3 className="title">Phương thức vận chuyển</h3>
            <div className="detail-box">
              <p className="m-b-15">
                Vận chuyển tiết kiệm
              </p>
              <p>Phí vận chuyển:
                { infoDetail.shippingAmount }
              </p>
            </div>
          </div>
          <div className="col-sm-4 m-b-15">
            <h3 className="title">Phương thức thanh toán</h3>
            <div className="detail-box">
              <p className="m-b-15">
                { this.getStrCheckOut(infoDetail.orderPayment.method) }
              </p>
            </div>
          </div>
        </div>
        <div className="clear-fix hr-clear-fix"></div>
        <div className="customer_content pull-left">
          <table className="tbl-default tbl-orders">
            <thead>
              <tr>
                <td className="product">Sản phẩm</td>
                <td>SKU</td>
                <td>Giá</td>
                <td>Số lượng</td>
                <td>Tạm tính</td>
              </tr>
            </thead>
            <tbody>
              { listProductE }
              <tr>
                <td colSpan="2"></td>
                <td colSpan="2">
                  <p className="m-b-8">Tạm tính</p>
                  <p className="m-b-8">Chi phí vận chuyển</p>
                  <p className="m-b-8">Tổng cộng</p>
                </td>
                <td colSpan="1" className="left-text">
                  <p className="m-b-8">
                    { `${infoDetail.subtotal} đ` }
                  </p>
                  <p className="m-b-8">
                    { `${infoDetail.shippingAmount} đ` }
                  </p>
                  <p className="m-b-8 red bold">
                    { `${infoDetail.grandTotal} đ` }
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      );

  }

}

CustomerDetailOrder.propTypes = {
  detailOrder: React.PropTypes.object.isRequired,
  dataCustomer: React.PropTypes.object.isRequired
};

export default CustomerDetailOrder;