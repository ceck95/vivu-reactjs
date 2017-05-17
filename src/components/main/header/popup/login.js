/**
 * @Author: Tran Van Nhut <root>
 * @Date:   2017-03-09T20:34:14+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   root
* @Last modified time: 2017-03-16T08:13:58+07:00
 */

import React, { Component } from 'react';

import { helpers } from 'react-base';
import buttonStatus from '../../../../const/button-status';
import config from '../../../../config/index';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disableButtonLogin: null,
      form: {}
    }
  }

  closePopup() {
    this.props.actions.setStatePopupLogin(helpers.Data.assign(this.props.statePopup, {
      login: !this.props.statePopup.login
    }));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.statePopup.disableButtonLogin === buttonStatus.click) {
      this.setState({
        disableButtonLogin: true
      });
    } else if (nextProps.statePopup.disableButtonLogin === buttonStatus.clickedSuccess) {
      this.setState({
        disableButtonLogin: false
      });
      this.closePopup();
      this.props.actions.setStatePopupLogin(helpers.Data.assign(this.props.statePopup, {
        disableButtonLogin: buttonStatus.available
      }));
    } else if (nextProps.statePopup.disableButtonLogin === buttonStatus.clickedError) {
      this.setState({
        disableButtonLogin: false
      });
      this.props.actions.setStatePopupLogin(helpers.Data.assign(this.props.statePopup, {
        disableButtonLogin: buttonStatus.available
      }));
    }

  }

  renderError(message) {
    return <span className="require error required">{ message }</span>;
  }

  checkFormLogin(data) {
    let form = this.state.form;
    if (helpers.Data.isEmpty(data.email)) {
      form.email = this.renderError('Không được bỏ trống');
    } else if (!helpers.Data.isEmail(data.email)) {
      form.email = this.renderError('Email không đúng định dạng');
    } else {
      form.email = null;
    }

    if (helpers.Data.isEmpty(data.password)) {
      form.password = this.renderError('Không được bỏ trống');
    } else if (data.password.length <= config.security.passwordLength) {
      form.password = this.renderError(`Độ dài password phải lớn hơn ${config.security.passwordLength}`);
    } else {
      form.password = null;
    }

    this.setState({
      form: form
    });

  }

  login() {
    let data = {
      email: this.refs.email.value,
      password: this.refs.password.value
    };
    this.checkFormLogin(data);
    if (helpers.Data.isEmptyObject(this.state.form)) {
      this.props.actions.setStatePopupLogin(helpers.Data.assign(this.props.statePopup, {
        disableButtonLogin: buttonStatus.click
      }));
      this.props.actions.login(data, this.props.statePopup);
    }

  }

  render() {
    return (
      <div className="modal popup-login">
        <div className="popup_wrap col-xs-8 col-sm-6 col-md-5 col-lg-4">
          <div className="modal_wrap">
            <h1 className="login_title">Đăng nhập</h1>
            <p>
              Bạn chưa có tài khoản ?
              <a href="#">
                { ' ' }Đăng ký</a>
            </p>
            <hr/>
            <div className="require-wrap">
              <p>Email</p>
              <div className="login_items">
                <input type="text" placeholder="Nhập Email" ref="email" />
                <span className="icon">
                                          <i className="fa fa-envelope" aria-hidden="true"></i>
                                        </span>
                <span className="line"></span>
              </div>
              { this.state.form.email
                ? this.state.form.email
                : '' }
            </div>
            <div className="require-wrap">
              <p>Password</p>
              <div className="login_items">
                <input type="password" placeholder="Nhập mật khẩu" ref="password" />
                <span className="icon">
                                          <i className="fa fa-lock" aria-hidden="true"></i>
                                        </span>
                <span className="line"></span>
              </div>
              { this.state.form.password
                ? this.state.form.password
                : '' }
            </div>
            <p>Quên mật khẩu? Nhấn vào
              <a href="#">
                { ' ' }Đây</a>
            </p>
            <button className="btn-login" onClick={ this.login.bind(this) } disabled={ this.state.disableButtonLogin }>
              <div>Đăng nhập</div>
            </button>
            <button className="btn-login btn-login-fb">
              <div>Login with Facebook</div>
            </button>
            <button className="btn-login btn-login-gg">
              <div>Login with Google</div>
            </button>
            <button className="modal_btn-close popup-login_btn-close" onClick={ this.closePopup.bind(this) }>
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }

}

export default Login;
