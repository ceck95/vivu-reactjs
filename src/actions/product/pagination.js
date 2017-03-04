/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-03T12:20:29+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-04T15:25:34+07:00
 */

const type = require('../../const/redux-actions');

let paginateActions = {
  setPaginateData: (data) => {
    return {
      type: type.setPaginateData,
      data: data
    }
  },
  statusLoadProductByPagination: (data) => {
    return {
      type: type.statusLoadProductByPagination,
      data: data
    }
  }
};

export default paginateActions;
