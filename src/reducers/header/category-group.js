/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-19T15:47:25+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-01T12:27:31+07:00
 */

const type = require('../../const/redux-actions');

module.exports = (categoryGroup = [], action) => {
  switch (action.type) {
    case type.setDataCategoryGroup:
      {
        return action.data.data.categoriesGroup;
      }
    case type.setDataProductToCategoryGroup:
      {

        action.dataCategoryGroup.forEach((e, i) => {
          action.data.data.products.forEach(a => {
            if (a.categoryGroupId === e.id) {
              if (!action.dataCategoryGroup[i].products) {
                action.dataCategoryGroup[i].products = [];
              }
              action.dataCategoryGroup[i].products.push(a);
            }
          });
        });

        return action.dataCategoryGroup;

      }
    default:
      return categoryGroup;
  }
};
