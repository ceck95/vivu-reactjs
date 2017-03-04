/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-12-01T11:18:35+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-04T16:06:50+07:00
 */



const loadingPage = require('./loading');
const searchMenuCategory = require('./header/search-menu-category');
const menuCategory = require('./header/menu-category');
const categoryGroup = require('./header/category-group');
const dataListProduct = require('./product/data');
const dataPaginate = require('./product/pagination');
const loadProduct = require('./product/load');

module.exports = {
  loadingPage: loadingPage,
  searchMenuCategory: searchMenuCategory,
  menuCategory: menuCategory,
  categoryGroup: categoryGroup,
  dataListProduct: dataListProduct,
  dataPaginate: dataPaginate,
  loadProduct: loadProduct
};
