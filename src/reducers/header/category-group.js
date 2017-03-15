/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-19T15:47:25+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-10T15:10:12+07:00
 */

const type = require('../../const/redux-actions');

module.exports = (categoryGroup = [], action) => {
  switch (action.type) {
    case type.setDataCategoryGroup:
      {
        return action.data.categoriesGroup;
      }
    case type.setDataProductToCategoryGroup:
      {
        action.dataCategoryGroup.forEach((e, i) => {
          action.data.products.forEach(a => {
            if (a.categoryGroupId === e.id) {
              if (!action.dataCategoryGroup[i].products) {
                action.dataCategoryGroup[i].products = [];
              }
              action.dataCategoryGroup[i].products.push(a);
            }
          });
          action.data.productsRight.forEach(b => {
            if (b.categoryGroupId === e.id) {
              if (!action.dataCategoryGroup[i].productsRight) {
                action.dataCategoryGroup[i].productsRight = [];
              }
              action.dataCategoryGroup[i].productsRight.push(b);
            }
          });
        });

        return action.dataCategoryGroup;

      }
    default:
      return categoryGroup;
  }
};
