/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-19T15:47:25+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2016-12-05T14:31:06+07:00
 */


module.exports = (loading = {
  loadSuccess: false
}, action) => {
  switch (action.type) {
    case 'LOADING':
      {
        return action.data;
      }
    default:
      return loading;
  }
};
