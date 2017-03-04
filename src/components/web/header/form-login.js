/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-02-18T10:22:35+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-26T10:41:57+07:00
*/

import React, {Component} from 'react';

class FormLogin extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className="header_account">
        <i className="fa fa-2x fa-user pull-left" aria-hidden="true"></i>
        <div className="pull-left">
          <span className="bold">Đăng nhập</span>
          <span className="small">Tài khoản và đơn hàng</span>
        </div>
      </button>
    )
  }

}

export default FormLogin;
