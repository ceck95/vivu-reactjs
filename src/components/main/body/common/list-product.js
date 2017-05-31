/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-02-18T13:50:18+07:00
* @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-24T08:37:47+07:00
*/

import React, { Component } from 'react';

//map props
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../../../actions/index';
import ReactBase from 'react-base';

import { Link } from 'react-router';

//config
import config from '../../../../config/index';

import utility from '../../../../helpers/utility';

import Image from './image';
import ImageSoldOut from '../../../../static/images/badge-sold-out.png'

class ListProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataItemProduct: [],
      dataCategoryGroup: {},
      heightElement: null
    };
  }

  componentWillMount() {
    this.setState({
      dataItemProduct: this.props.dataItemProduct,
      dataCategoryGroup: this.props.dataCategoryGroup
    });
  }

  componentDidMount() {
    this.setHeight();
  }

  shouldComponentUpdate() {
    this.setHeight();
    return true;
  }

  setHeight() {
    let arrE = document.getElementsByClassName('tabs_items'),
      valArr = [];
    for (let i = 0; i < arrE.length; i++) {
      valArr.push(arrE[i].clientHeight);
    }

    let maxHeight = Math.max.apply(null, valArr);
    maxHeight = maxHeight < 300 ? 300 : maxHeight;
    this.setState({
      heightElement: maxHeight
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataItemProduct: nextProps.dataItemProduct
    });
    this.setHeight();
  }

  addToCart(e) {
    if (!e.isProductColor)
    
      if (e.productColor ? e.productColor.id : false) {

        if (e.isSoldOut) {
          utility.respErrorCartSoldOut(this.props, e);
        } else {
          this.props.actions.setQuoteItem({
            productId: e.id,
            selectedProductColorId: e.productColor.id,
            quantity: 1
          }, this.props.dataQuoteCart, this.props.dataQuote);
        }

    }

  }

  getUrlKey(e) {
    let dataCategoryGroup = this.state.dataCategoryGroup;
    return utility.getUrlKey(e, dataCategoryGroup);
  }

  render() {
    let listDataProduct = this.state.dataItemProduct,
      listElementProduct = [];
    if (listDataProduct.length > 0) {
      listDataProduct.forEach((e, i) => {
        // this.state.dataItemCategory.categories.forEach(a => { if (e.categoryId ===
        // a.id) {
        let productKey = this.getUrlKey(e);
        listElementProduct.push(
          <div key={ i } className="col-sm-6 col-md-4" style={ { height: this.state.heightElement } }>
            <div ref="tabsItems" className="tabs_items">
              <Link className="link-img" to={ `/${productKey}` }>
              <Image linkImage={ e.imagePath } />
              </Link>
              { e.isSoldOut ?
                <img src={ ImageSoldOut } className="icon-sold-out" />
                :
                '' }
              <Link to={ `/${productKey}` } className="link-text">
              { e.name }
              </Link>
              <p className="price-current bold">
                { utility.formatCurrency(e.basePrice) }
              </p>
              <button className='add-to-cart' onClick={ this.addToCart.bind(this, e) }>
                <i className="fa fa-cart-plus" aria-hidden="true"></i>Thêm vào giỏ hàng</button>
            </div>
          </div>
        )
      // } });
      });
    }

    if (listElementProduct.length > 0) {
      return (
        <div>
          { listElementProduct }
        </div>
      )
    }

    return (
      <div>
        Loading Product
      </div>
    )

  }

}

let mapRedux = new ReactBase.helpers.mapRedux({
  actions: actions,
  bindActionCreators: bindActionCreators
});

export default connect(mapRedux.mapStateToProps, mapRedux.mapDispatchToProps)(ListProduct);
