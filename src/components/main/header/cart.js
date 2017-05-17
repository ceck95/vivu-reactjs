/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-18T10:28:28+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-23T23:38:58+07:00
 */

import React, { Component } from 'react';

//const
import loadStatus from '../../../const/load-status';
import loadStatusComponent from '../../../const/load-status-component';

import { helpers } from 'react-base';

import { Link } from 'react-router';

class Cart extends Component {

	constructor(props) {
		super(props);
		this.state = {
			countItemQuote: 0
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.dataQuote.loadDataCartStatus === loadStatus.assignDataLoad) {
			this.setState({ countItemQuote: nextProps.dataQuoteCart.length });
			this.props.actions.updateDataQuote(nextProps.dataQuote, helpers.Data.assign(nextProps.dataQuote, { loadDataCartStatus: loadStatusComponent.assignDataCart }));
		}
	}

	render() {
		return(
			<Link to="/cart">
        <button className="header_cart">
          <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          <span className="text">Giỏ hàng</span>
          <span className="header_cart_value">{this.state.countItemQuote}</span>
        </button>
      </Link>
		)
	}

}

Cart.propTypes = {
  actions: React.PropTypes.object
};

export default Cart;
