import type from '../../const/redux-actions';

let orderActions = {
  setDataOrder: (data) => {
    return {
      type: type.setDataOrder,
      data: data
    }
  },
  changeStatusLoadDataOrder: (status) => {
    return {
      type: type.changeStatusLoadDataOrder,
      status: status
    }
  }

};

module.exports = orderActions;