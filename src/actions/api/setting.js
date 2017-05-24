import helpers from '../../helpers/index';
import dataSettingActions from '../setting/data';

const apiSettingActions = {

  getSetting: () => {
    return dispatch => {
      return helpers.requestMerge({
        method: 'GET',
        uri: '/settings'
      }, dispatch).then(data => {
        dispatch(dataSettingActions.setDataSetting(data));
      })
    }
  }

};

export default apiSettingActions;