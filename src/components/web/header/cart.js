/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-02-18T10:28:28+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-18T10:57:37+07:00
*/

import React, {Component} from 'react';

class Cart extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className="header_cart">
        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
        <span className="text">Giỏ hàng</span>
        <span className="header_cart_value">100</span>
      </button>
    )
  }

}

export default Cart;
