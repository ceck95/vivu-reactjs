/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-23T15:52:31+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-26T23:45:05+07:00
 */

import React, { Component } from 'react';
import BreadCrumb from '../common/breadcrumb';

/**
 * Map props for Redux
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../../../actions/index';
import ReactBase from 'react-base';
import { helpers } from 'react-base';

//const
import loadStatus from '../../../../const/load-status';
import loadStatusComponent from '../../../../const/load-status-component';

//config
import config from '../../../../config/index';
import utility from '../../../../helpers/utility';

import { Link } from 'react-router';

class Cart extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dataBreadCrumb: [{
				name: 'Giỏ hàng',
				currentLink: true,
				link: '/cart'
			}],
			dataQuoteCart: [],
			dataQuoteCartClone: [],
			dataQuoteCartCache: [],
			total: 0
		}
	}

	componentWillMount() {
		if (this.props.dataQuoteCart.length > 0) {
			this.applyDataCart(this.props);
		}
	}

	calculatorTotal(dataQuoteCart) {
		let total = 0;
		for (let i in dataQuoteCart) {
			total += dataQuoteCart[i].basePrice;
		}
		this.setState({
			total: total
		});
	}

	applyDataCart(props) {

		let dataQuoteCart = props.dataQuoteCart;
		for (let i in dataQuoteCart) {
			dataQuoteCart[i].updateQuantity = false;
		}

		let cloneData = [];

		for (let i in dataQuoteCart) {
			cloneData.push({
				id: dataQuoteCart[i].id,
				quantity: dataQuoteCart[i].quantity
			});
		}
		this.setState({
			dataQuoteCartClone: cloneData,
			dataQuoteCart: dataQuoteCart
		});

		this.calculatorTotal(dataQuoteCart);

	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.dataQuote.loadDataCartStatus === loadStatusComponent.assignDataCart) {
			this.applyDataCart(nextProps);
			this.props.actions.updateDataQuote(nextProps.dataQuote, helpers.Data.assign(nextProps.dataQuote, {
				loadDataCartStatus: loadStatusComponent.checkProductViewCheckout
			}));

		}

	}

	removeQuoteItem(e) {
		if (e.id) {
			this.props.actions.removeQuoteItem(e, this.props.dataQuoteCart, this.props.dataQuote);
		}
	}

	setHandleQuantity(e) {
		let quantity = parseFloat(this.refs[`quantity-${e.id}`].value),
			dataQuoteCartCache = [],
			dataQuoteCart = this.state.dataQuoteCart,
			dataQuoteCartClone = this.state.dataQuoteCartClone;

		for (let i in dataQuoteCart) {
			if (dataQuoteCart[i].updateQuantity && e.id !== dataQuoteCart[i].id) {
				dataQuoteCartCache.push({
					id: dataQuoteCart[i].id,
					quantity: dataQuoteCart[i].quantity
				});
			}
		}

		if (e.id && quantity > 0) {
			this.setState({
				dataQuoteCartCache: dataQuoteCartCache
			});

			this.props.actions.updateQuantityQuoteItem({
				id: e.id,
				quantity: quantity
			}, dataQuoteCart, dataQuoteCartClone, this.props.dataQuote);
		}

	}

	resetQuantity(a) {

		let defaultValue = this.getDefaultValue(a),
			dataQuoteCart = this.state.dataQuoteCart;

		for (let i in dataQuoteCart) {
			if (a.id === dataQuoteCart[i].id) {
				dataQuoteCart[i].quantity = defaultValue;
				dataQuoteCart[i].updateQuantity = false;
			}
		}

		this.setState({
			dataQuoteCart: dataQuoteCart
		});

	}

	getDefaultValue(e) {
		let beforeData = this.state.dataQuoteCartClone,
			defaultValue = null;
		for (let i in beforeData) {
			if (e.id === beforeData[i].id) {
				defaultValue = beforeData[i].quantity;
				break;
			}
		}
		return defaultValue;
	}

	stateValueQuantity(e) {

		let dataQuoteCart = this.state.dataQuoteCart,
			update = false,
			defaultValue = this.getDefaultValue(e),
			quantity = parseFloat(this.refs[`quantity-${e.id}`].value);

		if (quantity > config.default.maxQuantity) {
			return null;
		}

		for (let i in dataQuoteCart) {
			if (dataQuoteCart[i].id === e.id) {
				dataQuoteCart[i].updateQuantity = true;
				dataQuoteCart[i].quantity = quantity;
				update = true;
				if (quantity === defaultValue) {
					dataQuoteCart[i].updateQuantity = false;
					dataQuoteCart[i].quantity = quantity;
					update = true;
				}
				break;
			}
		}


		if (update) {
			this.setState({
				dataQuoteCart: dataQuoteCart
			});
		}

	}

	render() {
		let listElement = [],
			dataQuoteCart = this.state.dataQuoteCart;
		if (this.state.dataQuoteCart.length > 0) {
			for (let e of dataQuoteCart) {
				let urlProductCurrent = utility.getUrlKey(e.product, this.props.categoryGroup);
				listElement.push(
					<div className="row cart_item" key={ e.id }>
       <div className="col-sm-4">
         <Link to={ urlProductCurrent }>
         <img src={ `${config.cdn.link}${e.product.imagePath}` } alt="" className="img-responsive cart_img" />
         </Link>
       </div>
       <div className="col-sm-4">
         <div className="cart_information">
           <Link to={ urlProductCurrent }>
           <h4 className="cart-name">{ e.product.name }</h4>
           <h4>{ e.product.isSoldOut ? ' (Hết hàng) ' : '' }</h4>
           </Link>
           <p>Cung cấp bởi Vivu</p>
           <button onClick={ this.removeQuoteItem.bind(this, e) } className="cart-input-wrap_icon">
             <i className="fa fa-trash-o" aria-hidden="true"></i>
           </button>
         </div>
       </div>
       <div className="col-xs-6 col-sm-2">
         <p className="bold margin-top-xs">
           { utility.formatCurrency(e.product.basePrice) }
         </p>
       </div>
       <div className="col-xs-6 col-sm-2">
         <div className="cart-input-wrap">
           <input className="cart-input-number margin-top-xs" type="number" onChange={ this.stateValueQuantity.bind(this, e) } ref={ `quantity-${e.id}` } value={ e.quantity } />
           <button onClick={ this.setHandleQuantity.bind(this, e) } className={ `cart-input-wrap_icon check ${e.updateQuantity ? '': 'hidden'}` }>
             <i className="fa fa-check" aria-hidden="true"></i>
           </button>
           <button onClick={ this.resetQuantity.bind(this, e) } className={ `cart-input-wrap_icon error pull-right ${e.updateQuantity ? '': 'hidden'}` }>
             <i className="fa fa-times" aria-hidden="true"></i>
           </button>
         </div>
       </div>
       <hr className="cart_hr cart_item_hr clear-fix" />
     </div>
				)
			}
		}
		return (
			<div className="container main main-other">
     <BreadCrumb dataBreadCrumb={ this.state.dataBreadCrumb } />
     <div className="row">
       <div className={ `col-sm-${this.state.dataQuoteCart.length > 0 ? 8:12}` }>
         <div className="row cart-title">
           <div className="col-sm-8">
             <h3>Giỏ hàng<span>({ `${this.state.dataQuoteCart.length} ` }sản phẩm)</span></h3>
           </div>
           <div className="col-sm-2 hidden-xs titles">Giá mua</div>
           <div className="col-sm-2 hidden-xs titles">Số lượng</div>
           <hr className="cart_hr cart_item_hr clear-fix" />
         </div>
         { listElement }
         <Link to="/" className="cart-btn_back">
         <i className="fa fa-chevron-left" aria-hidden="true"></i>Tiếp tục mua hàng</Link>
       </div>
       { this.state.dataQuoteCart.length > 0 ?
         <div className="col-sm-4">
           <div className="box box-padding">
             <div className="col-xs-4">Tạm tính</div>
             <div className="col-xs-8 cart_box-price">
               { utility.formatCurrency(this.state.total) }
             </div>
             <hr className="clear-fix cart_hr box_hr" />
             <div className="col-xs-4">Thành tiền</div>
             <div className="col-xs-8">
               <p className="cart_box-price red big">
                 { utility.formatCurrency(this.state.total) }
               </p>
               <p className="small cart_box-small">(Đã bao gồm VAT)</p>
             </div>
           </div>
           <Link to='/checkout'>
           <button className="btn-default btn-cart-continue">
             <div>Tiến hành đặt hàng</div>
           </button>
           </Link>
         </div>
         : '' }
     </div>
   </div>
		)
	}

}

let mapRedux = new ReactBase.helpers.mapRedux({
	actions: actions,
	bindActionCreators: bindActionCreators
});

export default connect(mapRedux.mapStateToProps, mapRedux.mapDispatchToProps)(Cart)
