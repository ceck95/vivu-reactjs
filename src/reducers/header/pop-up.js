/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-19T15:47:25+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-12T15:45:32+07:00
 */

const type = require('../../const/redux-actions');

module.exports = (statePopUp = {
  login: false,
  signin: false,
  disableButtonLogin: null,
  disableButtonSignin: null
}, action) => {
  switch (action.type) {
    case type.setStatePopupLogin:
      return action.data
    case type.setStatePopupSignin:
      return action.data;
    default:
      return statePopUp;
  }
};
