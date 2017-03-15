/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-03-12T09:49:09+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   root
* @Last modified time: 2017-03-14T18:04:59+07:00
*/

import React, {Component} from 'react';

import {helpers} from 'react-base';
import config from '../../../../config/index';
import buttonStatus from '../../../../const/button-status';

class Signin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gender: '',
      listElementYear: [],
      listElementMonth: [],
      listElementDay: [],
      date: null,
      month: null,
      year: null,
      disableButtonSignin: null,
      form: {},
      provinces: [],
      districts: [],
      wards: []
    };
  }

  closePopup() {
    this.props.actions.setStatePopupLogin(helpers.Data.assign(this.props.statePopup, {
      login: false,
      signin: false
    }));
  }

  setGender(e) {
    this.setState({gender: e});
  }

  componentWillMount() {
    let date = new Date(),
      year = date.getFullYear(),
      minYear = year - config.default.distanceYear,
      listElementYear = [],
      listElementMonth = [],
      listElementDay = [];
    let initBirthDay = () => {
      listElementYear.push(
        <option key='0' value=''>Năm</option>
      )
    };

    initBirthDay();

    for (let i = minYear; i <= year; i++) {
      listElementYear.push(
        <option key={i} value={i}>{i}</option>
      )
    }

    listElementMonth = this.renderMonth(12);
    listElementDay = this.renderDay(31);

    this.setState({listElementYear: listElementYear, listElementDay: listElementDay, listElementMonth: listElementMonth});

    this.props.actions.getProvinces(this.props.dataAddress);
  }

  renderDay(n, year, month) {
    let listElementDay = [],
      getYear = this.state.year,
      getMonth = this.state.month,
      date = new Date(),
      yearPresent = date.getFullYear(),
      monthPresent = date.getMonth(),
      dayPresent = date.getDate();
    listElementDay.push(
      <option key='0' value=''>Ngày</option>
    );
    if ((year || getYear) == yearPresent && (month || getMonth) == monthPresent) {
      n = dayPresent;
    }
    for (let i = 1; i <= n; i++) {
      listElementDay.push(
        <option key={i} value={i}>{i}</option>
      )
    }

    return listElementDay;
  }

  renderMonth(n, year) {
    let listElementMonth = [],
      getYear = this.state.year,
      date = new Date(),
      yearPresent = date.getFullYear(),
      monthPresent = date.getMonth();
    listElementMonth.push(
      <option key='0' value=''>Tháng</option>
    )
    if ((year || getYear) == yearPresent) {
      n = monthPresent;
    }
    for (let i = 1; i <= n; i++) {
      listElementMonth.push(
        <option key={i} value={i}>{i}</option>
      )
    }

    return listElementMonth;

  }

  checkBirthDay(monthCurrent, yearCurrent) {
    let listElementDay = [];
    if (monthCurrent == 4 || monthCurrent == 6 || monthCurrent == 9 || monthCurrent == 11) {
      listElementDay = this.renderDay(30, yearCurrent);
    } else if (monthCurrent == 2) {
      if (yearCurrent % 4 == 0 && yearCurrent % 100 != 0 || yearCurrent % 400 == 0) {
        listElementDay = this.renderDay(29, yearCurrent, monthCurrent);
      } else {
        listElementDay = this.renderDay(28, yearCurrent, monthCurrent);
      }
    } else {
      listElementDay = this.renderDay(31, yearCurrent, monthCurrent);
    }

    this.setState({listElementDay: listElementDay});
  }

  setBirthDay(options, e) {

    switch (options) {
      case 'date':
        this.setState({date: e.target.value});
        break;
      case 'month':
        let monthCurrent = e.target.value,
          yearCurrent = this.state.year;
        this.checkBirthDay(monthCurrent, yearCurrent);
        this.setState({month: monthCurrent});
        break;
      case 'year':
        let year = e.target.value;
        this.setState({
          year: year,
          listElementMonth: this.renderMonth(12, year)
        });
        this.checkBirthDay(this.state.month, year);
        break;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.statePopup.disableButtonSignin === buttonStatus.click) {
      this.setState({disableButtonSignin: true});
    } else if (nextProps.statePopup.disableButtonSignin === buttonStatus.clickedSuccess) {
      this.setState({disableButtonSignin: false});
      this.closePopup();
      this.props.actions.setStatePopupLogin(helpers.Data.assign(this.props.statePopup, {disableButtonSignin: buttonStatus.available}));
    } else if (nextProps.statePopup.disableButtonSignin === buttonStatus.clickedError) {
      this.setState({disableButtonSignin: false});
      this.props.actions.setStatePopupLogin(helpers.Data.assign(this.props.statePopup, {disableButtonSignin: buttonStatus.available}));
    }

    if (nextProps.dataAddress.provinces.length > 0) {
      this.setState({provinces: nextProps.dataAddress.provinces});
    }

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
        city: ''
      };
    this.checkFormSignin(data);
    // this.props.actions.setStatePopupLogin(helpers.Data.assign(this.props.statePopup, {disableButtonSignin: buttonStatus.click}));
    // this.props.actions.signin(data, this.props.statePopup);
  }

  renderError(message) {
    return <span className="require error required">{message}</span>;
  }

  checkFormSignin(data) {
    let form = {},
      checkEmptyCommon = (key) => {
        if (helpers.Data.isEmpty(data[key])) {
          this.state.form[key] = this.renderError('Không được bỏ trống');
        } else {
          this.state.form[key] = null;
        }
      };

    if (helpers.Data.isEmpty(data.email)) {
      this.state.form.email = this.renderError('Không được bỏ trống');
    } else if (!helpers.Data.isEmail(data.email)) {
      this.state.form.email = this.renderError('Email không đúng định dạng');
    } else {
      this.state.form.email = null;
    }

    checkEmptyCommon('fullName');

    if (helpers.Data.isEmpty(data.phone)) {
      this.state.form.phone = this.renderError('Không được bỏ trống');
    } else if (!helpers.Data.isPhoneNumber(data.phone)) {
      this.state.form.phone = this.renderError('Số điện thoại không đúng định dạng');
    } else {
      this.state.form.phone = null;
    }

    if (helpers.Data.isEmpty(data.password)) {
      this.state.form.password = this.renderError('Không được bỏ trống');
    } else if (data.password.length < config.sercurity.passwordLength) {
      this.state.form.password = this.renderError(`Độ dài password phải lớn hơn ${config.sercurity.passwordLength}`);
    } else {
      this.state.form.password = null;
    }

    checkEmptyCommon('gender');
    checkEmptyCommon('street');

    if (!this.state.date || !this.state.month || !this.state.year) {
      this.state.form.dob = this.renderError('Không được bỏ trống');
    } else {
      this.state.form.dob = null;
    }

    this.setState({form: this.state.form});
  }

  render() {
    let listProvinces = [];
    if (this.state.provinces.length > 0) {
      console.log(this.state.provinces);
      this.state.provinces.forEach((e, i) => {
        listProvinces.push(
          <option key={i} value={e.provineCode}>{e.displayName}</option>
        )
      });
    }

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
                    <input type="text" className="signin_input-text" ref="email"/> {this.state.form.email
                      ? this.state.form.email
                      : ''}
                  </div>
                </div>
                <div className="signin_items row">
                  <label className="col-xs-3" htmlFor="">Họ tên:</label>
                  <div className="col-xs-9 require-wrap">
                    <input type="text" className="signin_input-text" ref="fullName"/> {this.state.form.fullName
                      ? this.state.form.fullName
                      : ''}
                  </div>
                </div>
                <div className="signin_items row">
                  <label className="col-xs-3" htmlFor="">Số điện thoại:</label>
                  <div className="col-xs-9 require-wrap">
                    <input type="text" className="signin_input-text" ref="phone"/> {this.state.form.phone
                      ? this.state.form.phone
                      : ''}
                  </div>
                </div>
                <div className="signin_items row">
                  <label className="col-xs-3" htmlFor="">Mật khẩu:</label>
                  <div className="col-xs-9 require-wrap">
                    <input type="password" className="signin_input-text" ref="password"/> {this.state.form.password
                      ? this.state.form.password
                      : ''}
                  </div>
                </div>
                <div className="signin_items row">
                  <label className="col-xs-3" htmlFor="">Thành phố:</label>
                  <div className="col-xs-9 require-wrap">
                    <select className="signin_select" name="" id="" onChange={this.setBirthDay.bind(this, 'date')}>
                      {listProvinces}
                    </select>
                    {this.state.form.city
                      ? this.state.form.city
                      : ''}
                  </div>
                </div>
                <div className="signin_items row">
                  <label className="col-xs-3" htmlFor="">Địa chỉ:</label>
                  <div className="col-xs-9 require-wrap">
                    <input type="text" className="signin_input-text" ref="street"/> {this.state.form.street
                      ? this.state.form.street
                      : ''}
                  </div>
                </div>
                <div className="signin_items row">
                  <label className="col-xs-3" htmlFor="">Giới tính:</label>
                  <div className="col-xs-9 sex-wrap require-wrap">
                    <div>
                      <input onChange={this.setGender.bind(this, 'male')} type="radio" id="male" name="gender" ref="gender"/>
                      <label htmlFor="male">
                        <span className="check"></span>Nam
                      </label>
                    </div>
                    <div>
                      <input type="radio" id="female" name="gender" onChange={this.setGender.bind(this, 'male')}/>
                      <label htmlFor="female">
                        <span className="check"></span>Nữ
                      </label>
                    </div>
                    {this.state.form.gender
                      ? this.state.form.gender
                      : ''}
                  </div>
                </div>
                <div className="signin_items row">
                  <label htmlFor="" className="col-xs-3">Ngày sinh</label>
                  <div className="col-xs-9 require-wrap">
                    <select className="signin_select" name="" id="" onChange={this.setBirthDay.bind(this, 'date')}>
                      {this.state.listElementDay}
                    </select>
                    <select onChange={this.setBirthDay.bind(this, 'month')} className="signin_select" name="" id="">
                      {this.state.listElementMonth}
                    </select>
                    <select onChange={this.setBirthDay.bind(this, 'year')} className="signin_select" name="" id="">
                      {this.state.listElementYear}
                    </select>
                    {this.state.form.dob
                      ? this.state.form.dob
                      : ''}
                  </div>
                </div>
                <div className="signin_items row">
                  <div className="col-xs-3">&nbsp;</div>
                  <div className="col-xs-9 checkbox_mail-wrap">
                    <input type="checkbox" id="checkbox_mail"/>
                    <p>Bạn đồng ý với{' '}
                      <a href="#">điều kiện sử dụng và chính sách quy định của Vivu</a>
                    </p>
                    <button className="btn_submit-signin" onClick={this.signin.bind(this)} disabled={this.state.disableButtonSignin}>
                      <div>Đăng ký</div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 signin_social">
                <h4 className="title">Đăng nhập bằng tài khoản mạng xã hội</h4>
                <div className="signin_social_item">
                  <button className="signin_social_btn-fb">
                    <span>
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </span>
                    Đăng nhập bằng facebook</button>
                </div>
              </div>
            </div>

            <button onClick={this.closePopup.bind(this)} className="modal_btn-close">
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>

          </div>

        </div>
      </div>
    )
  }

}

export default Signin;
