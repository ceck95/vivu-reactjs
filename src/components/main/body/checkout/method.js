import React, { Component } from 'react';
import { helpers } from 'react-base';
import { Link } from 'react-router';
import checkoutMethod from '../../../../const/check-out';

//hard code
const show = false;

class Method extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataQuoteCart: [],
      total: 0,
      address: {}
    }
  }

  calculatorTotal(dataQuoteCart) {
    let total = 0;
    dataQuoteCart.forEach(e => {
      total += e.basePrice;
    });
    return total;
  }

  componentWillMount() {
    this.setDataInit(this.props);
  }

  setDataInit(props) {
    let dataQuoteCart = props.dataQuoteCart,
      dataCheckout = props.dataCheckout;
    if (dataQuoteCart.length > 0) {
      this.setState({
        dataQuoteCart: dataQuoteCart,
        total: this.calculatorTotal(dataQuoteCart)
      });
    }
    if (!helpers.Data.isEmptyKeyObject(dataCheckout.address)) {
      this.setState({
        address: dataCheckout.address
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setDataInit(nextProps);
  }

  showAddress() {
    this.props.actions.setShowCheckout(false);
  }

  checkout() {
    let address = this.state.address,
      dataQuote = this.props.dataQuote;
    if (!helpers.Data.isEmptyKeyObject(address) && !helpers.Data.isEmptyKeyObject(dataQuote)) {
      this.props.actions.checkout({
        checkoutMethod: checkoutMethod.cashOnDelivery,
        customerAddressId: address.id,
        quoteId: dataQuote.quote.id
      });
    }
  }

  render() {
    let listQuoteCart = [],
      dataQuoteCart = this.state.dataQuoteCart,
      address = this.state.address;
    if (dataQuoteCart.length > 0) {
      dataQuoteCart.forEach((e, i) => {
        listQuoteCart.push(
          <div key={ i }>
            <div className="row">
              <div className="col-md-8">
                <p>
                  { `${e.quantity} * ${e.product.name}` }
                </p>
              </div>
              <div className="col-md-4">
                <p className="text-item-quote-cart_align">
                  { e.basePrice }
                </p>
              </div>
            </div>
            <div className="row">
              <hr className="clear-fix cart_hr address_hr" />
            </div>
          </div>
        )
      });
    }

    return (
      <div className="step-3">
        <div className="row">
          <div className="col-xs-12 col-md-8">
            <h2 className="title">1. Chọn hình thức giao hàng</h2>
            <div className="order-box">
              <div>
                <input type="radio" defaultChecked className="radio-wrap" />
                <label className="label-radio">
                  <span className="icon"></span>
                  <p>Giao hàng tiêu chuẩn (dự kiến giao hàng vào Thứ năm, 06/04/2017 - Thứ sáu, 07/04/2017): Miễn Phí</p>
                </label>
              </div>
            </div>
            <h2 className="title">2. Chọn hình thức thanh toán</h2>
            <div className="order-box">
              <div>
                <input type="radio" className="radio-wrap" name="pay_type" defaultChecked id="hand_by_hand" />
                <label htmlFor="hand_by_hand" className="label-radio">
                  <span className="icon"></span>
                  <p>Thanh toán tiền mặt khi nhận hàng</p>
                </label>
              </div>
              { show ? <div className="clear-fix margin-top">
                         <input type="radio" className="radio-wrap" name="pay_type" id="pay_atm" />
                         <label htmlFor="pay_atm" className="label-radio">
                           <span className="icon"></span>
                           <p>Thẻ ATM đăng ký Internet Banking (Miễn phí thanh toán)</p>
                         </label>
                         <div className="pay_atm-wrap margin-top-xs">
                           <div className="pay_atm-wrap_item pull-left active">
                             <img src="assets/images/bank-vietcombank.jpg" alt="" className="img-responsive" />
                           </div>
                           <div className="pay_atm-wrap_item pull-left">
                             <img src="assets/images/bank-vietcombank.jpg" alt="" className="img-responsive" />
                           </div>
                           <div className="pay_atm-wrap_item pull-left">
                             <img src="assets/images/bank-vietcombank.jpg" alt="" className="img-responsive" />
                           </div>
                           <div className="pay_atm-wrap_item pull-left">
                             <img src="assets/images/bank-vietcombank.jpg" alt="" className="img-responsive" />
                           </div>
                           <div className="pay_atm-wrap_item pull-left">
                             <img src="assets/images/bank-vietcombank.jpg" alt="" className="img-responsive" />
                           </div>
                           <div className="pay_atm-wrap_item pull-left">
                             <img src="assets/images/bank-vietcombank.jpg" alt="" className="img-responsive" />
                           </div>
                           <div className="pay_atm-wrap_item pull-left">
                             <img src="assets/images/bank-vietcombank.jpg" alt="" className="img-responsive" />
                           </div>
                           <div className="pay_atm-wrap_item pull-left">
                             <img src="assets/images/bank-vietcombank.jpg" alt="" className="img-responsive" />
                           </div>
                         </div>
                       </div> : '' }
              { show ?
                <div className="clear-fix margin-top">
                  <input type="radio" className="radio-wrap" name="pay_type" id="pay_visa" />
                  <label htmlFor="pay_visa" className="label-radio">
                    <span className="icon"></span>
                    <p>Thanh toán bằng thẻ quốc tế Visa, MasterCard, JCB</p>
                  </label>
                  <div className="pay_visa-wrap">
                    <div className="row">
                      <div className="col-xs-6 col-md-8">
                        <input type="radio" defaultChecked className="radio-wrap" />
                        <label className="label-radio">
                          <span className="icon"></span>
                          <p>Nhập số thẻ mới</p>
                        </label>
                        <label>So the</label>
                        <div className="require-wrap margin-top-xs">
                          <input type="text" className="signin_input-text" />
                          <span className="require error">Donec sollicitudin molestie malesuada.</span>
                        </div>
                        <label>Ten in tren the</label>
                        <div className="require-wrap margin-top-xs">
                          <input type="text" className="signin_input-text" />
                          <span className="require error">Donec sollicitudin molestie malesuada.</span>
                        </div>
                        <label>Ngay het han</label>
                        <div className="require-wrap margin-top-xs">
                          <input type="text" className="signin_input-text" />
                          <span className="require error">Donec sollicitudin molestie malesuada.</span>
                        </div>
                        <label>Ma bao mat</label>
                        <div className="require-wrap margin-top-xs">
                          <input type="text" className="signin_input-text" />
                          <span className="require error">Donec sollicitudin molestie malesuada.</span>
                        </div>
                        <div className="checkbox_mail-wrap">
                          <input type="checkbox" id="checkbox_save" />
                          <label htmlFor="checkbox_save" className="text">
                            <span className="select"></span> Nhận thông tin khuyến mãi</label>
                          <p>Quisque velit nisi, pretium ut lacinia in, elementum id enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit.<a href="#">Điều kiện sử dụng và chính sách quy định của Vivu</a></p>
                        </div>
                      </div>
                      <div className="col-xs-6 col-md-4">
                        <img src="assets/images/card-guide.png" alt="" className="img-responsive" />
                      </div>
                    </div>
                  </div>
                </div>
                : '' }
              { show ?
                <div className="clear-fix margin-top">
                  <input type="radio" className="radio-wrap" name="pay_type" id="installment" />
                  <label htmlFor="installment" className="label-radio">
                    <span className="icon"></span>
                    <p>Trả góp lãi suất 0% kỳ hạn 06 tháng bằng thẻ tín dụng (HSBC, Sacombank, Shinhanbank, Citibank, Eximbank,VIB) - Chi tiết</p>
                  </label>
                </div>
                : '' }
            </div>
            <button className="btn-default order-btn" onClick={ this.checkout.bind(this) }>
              <span>Đặt mua</span>
            </button>
          </div>
          { !helpers.Data.isEmptyKeyObject(address) ?
            <div className="col-xs-12 col-md-4">
              <div className="box box-padding">
                <div className="col-xs-8 address_box-text">Địa chỉ giao hàng</div>
                <div className="col-xs-4 address_box-price">
                  <button className="btn-default edit-address_hover" onClick={ this.showAddress.bind(this) }>Sửa</button>
                </div>
                <hr className="clear-fix cart_hr address_hr" />
                <div className="col-xs-12 box-content_address">
                  <p className="name-address_text">
                    { address.customerName }
                  </p>
                  <p>
                    { `Địa chỉ: ${address.fullName}` }
                  </p>
                  <p>
                    { `Điện thoại: ${address.phone}` }
                  </p>
                </div>
              </div>
            </div>
            : '' }
          { listQuoteCart.length > 0
            ?
            <div className="col-xs-12 col-md-4">
              <div className="box box-padding">
                <div className="col-xs-8 address_box-text">Đơn hàng (
                  { listQuoteCart.length } sản phẩm)</div>
                <div className="col-xs-4 address_box-price">
                  <Link to="/cart">
                  <button className="btn-default edit-address_hover">Sửa</button>
                  </Link>
                </div>
                <hr className="clear-fix cart_hr address_hr" />
                <div className="col-md-12 col-xs-12">
                  { listQuoteCart }
                  <div className="row">
                    <div className="col-md-6">Tạm tính:</div>
                    <div className="col-md-6">
                      <p className="text-item-quote-cart_align">
                        { this.state.total }
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">Phí vận chuyển:</div>
                    <div className="col-md-6">
                      <p className="text-item-quote-cart_align">0 đ</p>
                    </div>
                  </div>
                  <div className="row">
                    <hr className="clear-fix cart_hr total-order_hr" />
                  </div>
                  <div className="row">
                    <div className="col-xs-6">Thành tiền:</div>
                    <div className="col-xs-6">
                      <p className="cart_box-price red big">
                        { `${this.state.total} đ` }
                      </p>
                      <p className="small cart_box-small">(Đã bao gồm VAT)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            : '' }
        </div>
      </div>
      );

  }

}

Method.propTypes = {
  name: React.PropTypes.string
};

export default Method;