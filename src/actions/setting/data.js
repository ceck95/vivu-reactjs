import type from '../../const/redux-actions';

const dataSettingActions = {

  setDataSetting: (data) => {
    return {
      type: type.setDataSetting,
      data: data
    }
  },
  setStatusDataSetting: (status) => {
    return {
      type: type.setStatusDataSetting,
      status: status
    }
  }

};

export default dataSettingActions;