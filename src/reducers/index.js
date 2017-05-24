/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-12-01T11:18:35+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-22T14:57:51+07:00
 */



const loadingPage = require('./loading');
const searchMenuCategory = require('./header/search-menu-category');
const menuCategory = require('./header/menu-category');
const categoryGroup = require('./header/category-group');
const dataListProduct = require('./product/data');
const dataPaginate = require('./product/pagination');
const loadProduct = require('./product/load');
const statePopup = require('./header/pop-up');
const dataLogin = require('./login/index');
const dataNotify = require('./header/notify');
const dataAddress = require('./address/data');
const dataProductDetail = require('./detail-product/data');
const dataImageZoomProductDetail = require('./detail-product/image-zoom');
const dataQuote = require('./quote/data');
const dataQuoteCart = require('./quote/cart');
const dataCheckout = require('./checkout/data');
const dataOrder = require('./order/data');
const dataSetting = require('./setting/data');

module.exports = {
  loadingPage: loadingPage,
  searchMenuCategory: searchMenuCategory,
  menuCategory: menuCategory,
  categoryGroup: categoryGroup,
  dataListProduct: dataListProduct,
  dataPaginate: dataPaginate,
  loadProduct: loadProduct,
  statePopup: statePopup,
  dataLogin: dataLogin,
  dataNotify: dataNotify,
  dataAddress: dataAddress,
  dataProductDetail: dataProductDetail,
  dataImageZoomProductDetail: dataImageZoomProductDetail,
  dataQuote: dataQuote,
  dataQuoteCart: dataQuoteCart,
  dataCheckout: dataCheckout,
  dataOrder: dataOrder,
  dataSetting: dataSetting
};
