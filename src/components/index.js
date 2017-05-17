/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-06T12:15:07+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-23T16:04:57+07:00
 */



import main from './main/index';
import header from './main/header/index';
import footer from './main/footer/index';
import listProduct from './main/body/list-product/index';
import detailProduct from './main/body/detail-product/index';
import cart from './main/body/cart';
import checkout from './main/body/checkout/index';
import customer from './main/body/customer/index';

export default {
	main: main,
	header: header,
	footer: footer,
	listProduct: listProduct,
	detailProduct: detailProduct,
	cart: cart,
	checkout: checkout,
	customer: customer
}
