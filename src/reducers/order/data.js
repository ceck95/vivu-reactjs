import type from '../../const/redux-actions';
import statusLoad from '../../const/load-status';
import { helpers } from 'react-base';

module.exports = (dataOrder = {
    orders: [],
    statusLoad: null
  } ,action) => {
  switch (action.type) {
    case type.setDataOrder:
      dataOrder.statusLoad = statusLoad.assignDataLoad;
      return helpers.Data.assign(dataOrder, action.data);
    case type.changeStatusLoadDataOrder:
      return helpers.Data.assign(dataOrder,
        {
          statusLoad: action.status
        });
    default:
      return dataOrder;
  }
};