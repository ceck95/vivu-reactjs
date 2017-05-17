import React, { Component } from 'react';

/**
 * Import config
 */
import config from '../../../../config/index';
import FormDob from '../common/form-dob';
import ErrorForm from '../common/error-form';
import FormGender from '../common/form-gender';

import { helpers } from 'react-base';

class InfoCustomer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: null,
      month: null,
      year: null,
      gender: '',
      email: '',
      fullName: '',
      form: {},
      disableOnChange: false,
      disableEmail: true,
      changePassword: false,
      passwordNew: '',
      passwordNewPre: '',
      passwordOld: '',
      activeTab: ''
    }
  }

  get listTab() {
    return ['user', 'order'];
  }

  setValueDob(opt) {
    this.setState({
      date: opt.date,
      month: opt.month,
      year: opt.year
    });
  }

  setGender(e) {
    this.setState({
      gender: e
    });
  }

  componentWillMount() {
    let customer = this.props.dataLogin,
      date = new Date(customer.dob);
    this.setState({
      gender: customer.gender,
      fullName: customer.fullName,
      email: customer.email,
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      phone: customer.phone
    });
  }

  email(e) {
    if (!this.state.disableOnChange) {
      this.setState({
        email: e.target.value
      });
    }
  }

  fullName(e) {
    this.setState({
      fullName: e.target.value
    });
  }

  phone(e) {
    this.setState({
      phone: e.target.value
    })
  }

  passwordOld(e) {
    this.setState({
      passwordOld: e.target.value
    });
  }

  passwordNew(e) {
    this.setState({
      passwordNew: e.target.value
    });
  }

  passwordNewPre(e) {
    this.setState({
      passwordNewPre: e.target.value
    });
  }

  changePassword(e) {
    let changePassword = null;
    if (this.state.changePassword) {
      changePassword = false;
    } else {
      changePassword = true;
    }
    this.setState({
      changePassword: changePassword
    });
  }

  checkForm(data) {
    let form = this.state.form,
      checkEmptyCommon = (key) => {
        if (helpers.Data.isEmpty(data[key])) {
          form[key] = 'Không được bỏ trống';
        } else {
          form[key] = null;
        }
      };
    checkEmptyCommon('fullName');
    checkEmptyCommon('phone');
    if (!this.state.date || !this.state.month || !this.state.year) {
      form.dob = 'Không được bỏ trống';
    } else {
      form.dob = null;
    }
    checkEmptyCommon('gender');
    if (data.passwordOld) {
      if (data.passwordNew && this.state.passwordNewPre) {
        if (data.passwordNew !== this.state.passwordNewPre) {
          form.passwordNewPre = 'Password không trùng nhau';
        } else {
          form.passwordNewPre = '';
        }
      } else {
        checkEmptyCommon('passwordNew');
        if (helpers.Data.isEmpty(this.state.passwordNewPre)) {
          form.passwordNewPre = 'Không được bỏ trống';
        } else {
          form.passwordNewPre = null;
        }
      }
    } else {
      if (data.passwordNew || data.passwordNewPre) {
        checkEmptyCommon('passwordOld');
      }
    }
    this.setState({
      form: form
    });
  }

  update() {
    let state = this.state,
      data = {
        phone: state.phone,
        dob: (new Date(state.year, state.month, state.date)).getTime(),
        fullName: state.fullName,
        gender: state.gender,
        passwordNew: state.passwordNew,
        passwordOld: state.passwordOld
      };

    this.checkForm(data);

    if (helpers.Data.isEmptyValueOfObject(this.state.form)) {
      this.props.actions.editProfile(data);
    }
  }

  render() {
    let renderError = (message) => {
        return <ErrorForm message={ message } />
      },
      formState = this.state.form,
      email = formState.email,
      fullName = formState.fullName,
      gender = formState.gender,
      passwordOld = formState.passwordOld,
      passwordNew = formState.passwordNew,
      passwordNewPre = formState.passwordNewPre,
      phone = formState.phone;

    return (
      <div className="col-sm-8 col-md-9">
        <h1>Thông tin tài khoản</h1>
        <div className="customer_content pull-left">
          <div className="col-sm-9 col-md-8 col-lg-6">
            <div className="signin_items row">
              <label className="col-xs-3" htmlFor="">Email:</label>
              <div className="col-xs-9 require-wrap">
                <input type="text" className="signin_input-text" disabled={ this.state.disableEmail } onChange={ this.email.bind(this) } value={ this.state.email } />
                { email ? renderError(email) : '' }
              </div>
            </div>
            <div className="signin_items row">
              <label className="col-xs-3" htmlFor="">Họ tên:</label>
              <div className="col-xs-9 require-wrap">
                <input type="text" className="signin_input-text" onChange={ this.fullName.bind(this) } value={ this.state.fullName } />
                { fullName ? renderError(fullName) : '' }
              </div>
            </div>
            <div className="signin_items row">
              <label className="col-xs-3" htmlFor="">Phone:</label>
              <div className="col-xs-9 require-wrap">
                <input type="text" className="signin_input-text" onChange={ this.phone.bind(this) } value={ this.state.phone } />
                { phone ? renderError(phone) : '' }
              </div>
            </div>
            <FormGender message={ gender } setGender={ this.setGender.bind(this) } value={ this.state.gender } />
            <FormDob dataDob={ { date: this.state.date, month: this.state.month, year: this.state.year } } message={ this.state.form.dob } setValueDob={ this.setValueDob.bind(this) } />
            <div className="signin_items row">
              <div className="col-xs-3"> </div>
              <div className="col-xs-9 checkbox_mail-wrap no-select">
                <input type="checkbox" id="checkbox_change-password" onChange={ this.changePassword.bind(this) } />
                <label htmlFor="checkbox_change-password" className="text">
                  <span className="select"></span> Thay đổi mật khẩu</label>
              </div>
            </div>
            <div className={ `customer_change-password-wrap ${this.state.changePassword ? '' : 'hidden' }` }>
              <div className="signin_items row">
                <label className="col-xs-3" htmlFor="">Mật khẩu cũ:</label>
                <div className="col-xs-9 require-wrap">
                  <input onChange={ this.passwordOld.bind(this) } type="password" className="signin_input-text" />
                  { passwordOld ? renderError(passwordOld) : '' }
                </div>
              </div>
              <div className="signin_items row">
                <label className="col-xs-3" htmlFor="">Mật khẩu mới:</label>
                <div className="col-xs-9 require-wrap">
                  <input onChange={ this.passwordNew.bind(this) } type="password" className="signin_input-text" />
                  { passwordNew ? renderError(passwordNew) : '' }
                </div>
              </div>
              <div className="signin_items row">
                <label className="col-xs-3" htmlFor="">Nhập lại:</label>
                <div className="col-xs-9 require-wrap">
                  <input onChange={ this.passwordNewPre.bind(this) } type="password" className="signin_input-text" />
                  { passwordNewPre ? renderError(passwordNewPre) : '' }
                </div>
              </div>
            </div>
            <div className="signin_items row">
              <div className="col-xs-3"> </div>
              <div className="col-xs-9">
                <button className="btn_submit-signin" onClick={ this.update.bind(this) }>
                  <div>Cập nhập</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      );

  }

}

InfoCustomer.propTypes = {
  name: React.PropTypes.string
};

export default InfoCustomer;