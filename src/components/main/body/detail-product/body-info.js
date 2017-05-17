/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-17T09:40:19+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-25T11:25:55+07:00
 */

import React, {Component} from 'react';

//hard code
import houseImg from '../../../../static/images/house.png';

class BodyInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataProductDetail: {},
      quantity: 1,
      productColorId: null
    }
  }

  componentWillMount() {
    let productColorId = null;
    if (this.props.dataProductDetail.productColors.length >= 1) {
      productColorId = this.props.dataProductDetail.productColors[0].id
    }
    this.setState({dataProductDetail: this.props.dataProductDetail, productColorId: productColorId});
  }

  componentWillReceiveProps(nextProps) {
    let productColorId = null;
    if (nextProps.dataProductDetail.productColors.length === 1) {
      productColorId = this.props.dataProductDetail.productColors[0].id;
    }
    this.setState({dataProductDetail: nextProps.dataProductDetail, productColorId: productColorId});
  }

  setQuantity() {
    this.setState({quantity: this.refs.quantity.value})
  }

  addToCart() {
    let item = this.props.dataProductDetail;
    if (this.state.quantity > 0 && this.state.productColorId) {
      this.props.actions.setQuoteItem({
        productId: item.id,
        selectedProductColorId: this.state.productColorId,
        quantity: this.state.quantity
      }, this.props.dataQuoteCart, this.props.dataQuote);
    }

  }

  render() {
    return (
      <div className="col-sm-8 detail-info">
        <h3>{this.state.dataProductDetail.name}</h3>
        <div>
          <div className="col-sm-8 detail-info_text">
            <p>Thương hiệu:
              <span className="blue">Lorem ipsum</span>
            </p>
            <p>Sku: {this.state.dataProductDetail.sku}</p>
            <p>Gía:{' '}
              <span className="price-current big blue">{`${this.state.dataProductDetail.basePrice} đ`}</span>
            </p>
            <p className="list-text">
              <i className="fa fa-circle" aria-hidden="true"></i>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p className="list-text">
              <i className="fa fa-circle" aria-hidden="true"></i>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p className="list-text">
              <i className="fa fa-circle" aria-hidden="true"></i>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p className="margin-top">Số lượng:</p>
            <input type="number" onChange={this.setQuantity.bind(this)} ref="quantity" defaultValue="1" className="input-number"/>
            <button className="btn-add-cart red" onClick={this.addToCart.bind(this)}>
              <i className="fa fa-cart-plus" aria-hidden="true"></i>
              <div>Thêm vào giỏ hàng</div>
            </button>
          </div>
          <div className="col-sm-4 detail-info_right">
            <div className="flex">
              <div className="icon-wrap">
                <img src={houseImg} className="img-responsive" alt=""/>
              </div>
              <div className="texts">
                <p className="bold">Được cung cấp bởi</p>
                <p className="green">Công ty Vivu</p>
              </div>
            </div>
            <div className="flex">
              <div className="icon-wrap">
                <i className="fa fa-3x fa-shield" aria-hidden="true"></i>
              </div>
              <div className="texts">
                <p>Thời gian bảo hành</p>
                <p className="bold">12 tháng</p>
              </div>
            </div>
            <div className="flex">
              <div className="icon-wrap">
                <i className="fa fa-3x fa-file-text-o" aria-hidden="true"></i>
              </div>
              <div className="texts">
                <p>Hình thức bảo hành</p>
                <p className="bold">Phiếu bảo hành</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default BodyInfo;
