import type from '../../const/redux-actions';
import loadStatus from '../../const/load-status';
import { helpers } from 'react-base';

module.exports = (dataSetting = {
    loadStatus: null
  }, action) => {

  switch (action.type) {
    case type.setDataSetting:
      action.data.loadStatus = loadStatus.assignDataLoad;
      return action.data;
    case type.setStatusDataSetting:
      return helpers.Data.assign(dataSetting, {
        loadStatus: action.status
      });
    default:
      return dataSetting;
  }

};
