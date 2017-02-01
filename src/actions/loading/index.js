/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-17T13:49:49+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2016-10-28T15:33:50+07:00
 */



let loadActions = {
  getLoading: function(data) {
    return {
      type: 'LOADING',
      data: data
    }
  }
};

export default loadActions;
