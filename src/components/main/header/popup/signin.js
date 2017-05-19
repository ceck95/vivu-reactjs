/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-03-12T09:49:09+07:00
* @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-27T12:08:54+07:00
*/

import React, { Component } from 'react';

import { helpers } from 'react-base';
import config from '../../../../config/index';
import buttonStatus from '../../../../const/button-status';
import ErrorForm from '../../body/common/error-form';
import FormDob from '../../body/common/form-dob';
import FormAddress from '../../body/common/form-address';
import FormGender from '../../body/common/form-gender';

class Signin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gender: '',
      date: null,
      month: null,
      year: null,
      disableButtonSignin: null,
      form: {},
      provinceCode: '',
      districtCode: '',
      wardCode: '',
      dataAddress: {}
    };
  }

  closePopup() {
    this.props.actions.setStatePopupLogin(helpers.Data.assign(this.props.statePopup, {
      login: false,
      signin: false
    }));
  }

  setGender(e) {
    this.setState({
      gender: e
    });
  }

  componentWillMount() {
    if (this.props.dataAddress.provinces.length === 0) {
      this.props.actions.getProvinces(this.props.dataAddress);
    } else {
      this.setState({
        dataAddress: this.props.dataAddress
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.statePopup.disableButtonSignin === buttonStatus.click) {
      this.setState({
        disableButtonSignin: true
      });
    } else if (nextProps.statePopup.disableButtonSignin === buttonStatus.clickedSuccess) {
      this.setState({
        disableButtonSignin: false
      });
      this.closePopup();
      this.props.actions.setStatePopupLogin(helpers.Data.assign(this.props.statePopup, {
        disableButtonSignin: buttonStatus.available
      }));
    } else if (nextProps.statePopup.disableButtonSignin === buttonStatus.clickedError) {
      this.setState({
        disableButtonSignin: false
      });
      this.props.actions.setStatePopupLogin(helpers.Data.assign(this.props.statePopup, {
        disableButtonSignin: buttonStatus.available
      }));
    }

    this.setState({
      dataAddress: nextProps.dataAddress
    })
  }

  signin() {
    let dateDob = (new Date(this.state.year, this.state.month, this.state.date)).getTime(),
      data = {
        email: this.refs.email.value,
        phone: this.refs.phone.value,
        fullName: this.refs.fullName.value,
        password: this.refs.password.value,
        gender: this.state.gender,
        dob: dateDob
          ? dateDob
          : '',
        street: this.refs.street.value,
        province: this.state.provinceCode,
        district: this.state.districtCode,
        ward: this.state.wardCode
      };

    this.checkFormSignin(data);

    if (helpers.Data.isEmptyValueOfObject(this.state.form)) {
      this.props.actions.setStatePopupLogin(helpers.Data.assign(this.props.statePopup, {
        disableButtonSignin: buttonStatus.click
      }));
      this.props.actions.signin(data, this.props.statePopup);
    }
  }


  checkFormSignin(data) {
    let form = this.state.form,
      checkEmptyCommon = (key) => {
        if (helpers.Data.isEmpty(data[key])) {
          form[key] = 'Không được bỏ trống';
        } else {
          form[key] = null;
        }
      };

    if (helpers.Data.isEmpty(data.email)) {
      form.email = 'Không được bỏ trống';
    } else if (!helpers.Data.isEmail(data.email)) {
      form.email = 'Email không đúng định dạng';
    } else {
      form.email = null;
    }

    checkEmptyCommon('fullName');

    if (helpers.Data.isEmpty(data.phone)) {
      form.phone = 'Không được bỏ trống';
    } else if (!helpers.Data.isPhoneNumber(data.phone)) {
      form.phone = 'Số điện thoại không đúng định dạng';
    } else {
      form.phone = null;
    }

    if (helpers.Data.isEmpty(data.password)) {
      form.password = 'Không được bỏ trống';
    } else if (data.password.length <= config.security.passwordLength) {
      form.password = `Độ dài password phải lớn hơn ${config.security.passwordLength}`;
    } else {
      form.password = null;
    }

    checkEmptyCommon('gender');
    checkEmptyCommon('street');
    checkEmptyCommon('province');
    checkEmptyCommon('district');
    checkEmptyCommon('ward');

    if (!this.state.date || !this.state.month || !this.state.year) {
      form.dob = 'Không được bỏ trống';
    } else {
      form.dob = null;
    }

    this.setState({
      form: this.state.form
    });
  }

  setValueDob(opt) {
    this.setState({
      month: opt.month,
      year: opt.year,
      date: opt.date
    });
  }

  setValueAddress(opt) {
    this.setState({
      provinceCode: opt.provinceCode,
      districtCode: opt.districtCode,
      wardCode: opt.wardCode
    })
  }

  render() {
    let errorRender = (message) => {
      return <ErrorForm message={ message } />;
    };

    return (
      <div className="modal">
        <div className="popup_wrap col-xs-10 col-sm-9 col-md-8 col-lg-7">
          <div className="modal_wrap">
            <h1 className="login_title">Đăng ký</h1>
            <p>Bạn đã có tài khoản?
              <a className="move-to-signin" href="#">Đăng nhập</a>
            </p>
            <hr/>
            <div className="row">
              <div className="col-sm-8">
                <div className="signin_items row">
                  <label className="col-xs-3" htmlFor="">Email:</label>
                  <div className="col-xs-9 require-wrap">
                    <input type="text" className="signin_input-text" ref="email" />
                    { this.state.form.email
                      ? errorRender(this.state.form.email)
                      : '' }
                  </div>
                </div>
                <div className="signin_items row">
                  <label className="col-xs-3" htmlFor="">Họ tên:</label>
                  <div className="col-xs-9 require-wrap">
                    <input type="text" className="signin_input-text" ref="fullName" />
                    { this.state.form.fullName
                      ? errorRender(this.state.form.fullName)
                      : '' }
                  </div>
                </div>
                <div className="signin_items row">
                  <label className="col-xs-3" htmlFor="">Số điện thoại:</label>
                  <div className="col-xs-9 require-wrap">
                    <input type="text" className="signin_input-text" ref="phone" />
                    { this.state.form.phone
                      ? errorRender(this.state.form.phone)
                      : '' }
                  </div>
                </div>
                <div className="signin_items row">
                  <label className="col-xs-3" htmlFor="">Mật khẩu:</label>
                  <div className="col-xs-9 require-wrap">
                    <input type="password" className="signin_input-text" ref="password" />
                    { this.state.form.password
                      ? errorRender(this.state.form.password)
                      : '' }
                  </div>
                </div>
                <FormGender setGender={ this.setGender.bind(this) } message={ this.state.form.gender } value={ this.state.gender } />
                <FormDob setValueDob={ this.setValueDob.bind(this) } message={ this.state.form.dob } />
                <div className="signin_items row">
                  <div className="col-xs-3"> </div>
                  <div className="col-xs-9 checkbox_mail-wrap">
                    <input type="checkbox" id="checkbox_mail" />
                    <p>Bạn đồng ý với
                      { ' ' }
                      <a href="#">điều kiện sử dụng và chính sách quy định của Vivu</a>
                    </p>
                    <button className="btn_submit-signin" onClick={ this.signin.bind(this) } disabled={ this.state.disableButtonSignin }>
                      <div>Đăng ký</div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 signin_social">
                <h4 className="title">Đăng nhập bằng tài khoản mạng xã hội</h4>
                <div className="signin_social_item">
                  <button className="signin_social_btn-fb">
                    <span><i className="fa fa-facebook" aria-hidden="true"></i></span> Đăng nhập bằng facebook
                  </button>
                </div>
                <hr/>
                { Object.keys(this.state.dataAddress).length > 0 ?
                  <FormAddress loading={ true } setValueAddress={ this.setValueAddress.bind(this) } dataAddress={ this.state.dataAddress } actions={ this.props.actions } messageProvince={ this.state.form.province }
                    messageDistrict={ this.state.form.district } messageWard={ this.state.form.ward } />
                  : '' }
                <div className="signin_items row">
                  <div className="col-xs-12">
                    <div className="row">
                      <label className="col-xs-12" htmlFor="">Địa chỉ:</label>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 require-wrap">
                        <input type="text" className="signin_input-text" ref="street" />
                        { this.state.form.street
                          ? errorRender(this.state.form.street)
                          : '' }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={ this.closePopup.bind(this) } className="modal_btn-close">
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }

}

export default Signin;
