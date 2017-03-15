/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-02-18T10:22:35+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   root
* @Last modified time: 2017-03-14T17:46:13+07:00
*/

import React, {Component} from 'react';
import PopupLogin from './popup/login';
import PopupSignin from './popup/signin';
import {helpers} from 'react-base';

class FormLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      statePopup: {
        login: false
      },
      dataLogin: {},
      login: false,
      signin: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      statePopup: {
        login: nextProps.statePopup.login,
        signin: nextProps.statePopup.signin
      }
    });
    if (Object.keys(nextProps.dataLogin).length > 0) {
      this.setState({dataLogin: nextProps.dataLogin, login: true});
    }
  }

  showPopupLogin() {
    this.props.actions.setStatePopupLogin(helpers.Data.assign(this.props.statePopup, {
      login: !this.state.statePopup.login
    }));
  }

  showPopupSignin() {
    this.props.actions.setStatePopupLogin(helpers.Data.assign(this.props.statePopup, {
      signin: !this.state.statePopup.signin
    }));
  }

  render() {
    return (
      <div>
        <button className="header_account">
          <i className="fa fa-2x fa-user pull-left" aria-hidden="true"></i>
          <div className="pull-left">
            <span className="bold">{this.state.login
                ? this.state.dataLogin.customer.fullName
                : 'Đăng nhập'}</span>
            <span className="small">Tài khoản và đơn hàng</span>
          </div>
          {this.state.login
            ? ''
            : <div className="login-wrap">
              <div className="login-wrap_contain">
                <span className="login_btn login_btn-login" onClick={this.showPopupLogin.bind(this)}>Đăng nhập</span>
                <span className="login_btn login_btn-signin" onClick={this.showPopupSignin.bind(this)}>Đăng ký</span>
                <span className="login_btn login_btn-fb">Đăng nhập bằng Facebook</span>
                <span className="login_btn login_btn-gg">Đăng nhập bằng Google</span>
              </div>
            </div>}

        </button>
        {this.state.statePopup.login
          ? <PopupLogin statePopup={this.props.statePopup} actions={this.props.actions}/>
          : ''}
        {this.state.statePopup.signin
          ? <PopupSignin statePopup={this.props.statePopup} actions={this.props.actions} dataAddress={this.props.dataAddress}/>
          : ''}
      </div>
    )
  }

}

export default FormLogin;
