import React, { Component } from 'react';
import { helpers } from 'react-base';
import config from '../../../../config/index';
import statusLoadComponent from '../../../../const/load-status-component';
import loadStatus from '../../../../const/load-status';
const textClassAddAddress = 'hidden';

import FormAddress from '../../body/common/form-address';

import ErrorForm from '../../body/common/error-form';

class Address extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listAddress: [],
      classAddAddress: textClassAddAddress,
      provinceCode: '',
      districtCode: '',
      wardCode: '',
      type: '',
      customerName: '',
      phone: '',
      street: '',
      isDefault: false,
      form: {},
      wardCodeAutoCheck: '',
      districtCodeAutoCheck: '',
      showEdit: false,
      customerAddressId: null,
      isAuthenticated: null,
      dataAddress: {},
      hiddenCheckDefault: false
    }
  }

  componentWillMount() {
    this.setListAddress(this.props);
    if (this.props.dataAddress.provinces.length === 0) {
      this.props.actions.getProvinces(this.props.dataAddress);
    } else {
      this.setState({
        dataAddress: this.props.dataAddress
      });
    }

    this.handleAuthorized(this.props);
  }

  setListAddress(props) {
    let listAddress = props.dataAddress.listAddress,
      dataAddress = props.dataAddress,
      setData = () => {
        if (listAddress.length > 0) {
          this.setState({
            listAddress: listAddress,
            classAddAddress: textClassAddAddress,
            isAuthenticated: props.dataLogin.isAuthenticated
          });
          this.props.actions.changeStatusAddress(loadStatus.available);
        }
      };
    if (dataAddress.statusLoadListAddress === loadStatus.assignDataLoad) {
      setData();
    }
  }

  handleAuthorized(props) {
    if (!props.dataLogin.isAuthenticated) {
      this.setState({
        isAuthenticated: false,
        classAddAddress: ''
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setListAddress(nextProps);
    this.setState({
      dataAddress: nextProps.dataAddress
    });
    this.handleAuthorized(nextProps);
  }

  showAddAddress(opts) {
    let classAddAddress = '';
    if (this.state.classAddAddress === textClassAddAddress) {
      classAddAddress = '';
    }

    if (opts.notClose) {
      classAddAddress = '';
    } else {
      this.setState({
        phone: '',
        customerName: '',
        type: '',
        street: '',
        provinceCode: '',
        districtCode: '',
        wardCode: '',
        isDefault: false,
        hiddenCheckDefault: false,
        districts: [],
        wards: [],
        showEdit: false,
        customerAddressId: null,
        wardCodeAutoCheck: '',
        districtCodeAutoCheck: ''
      });
      this.props.actions.setDataProvinces(this.props.dataAddress, this.props.dataAddress);
      this.props.actions.setAutoCheckAddressAvailable(this.props.dataAddress, {
        checkDistrict: statusLoadComponent.autoCheckDistrict
      });
      this.props.actions.setAutoCheckAddressAvailable(this.props.dataAddress, {
        checkWard: statusLoadComponent.autoCheckWard
      });
    }

    this.setState({
      classAddAddress: classAddAddress
    });
  }

  setValueAddress(opt) {
    this.setState({
      provinceCode: opt.provinceCode,
      districtCode: opt.districtCode,
      wardCode: opt.wardCode
    })
  }


  setValueAddressRequest(func, update) {
    let data = {
      phone: this.refs.phone.value,
      customerName: this.refs.customerName.value,
      type: this.state.type,
      street: this.refs.street.value,
      provinceCode: this.state.provinceCode,
      districtCode: this.state.districtCode,
      wardCode: this.state.wardCode,
      isDefault: this.state.isDefault,
    };
    this.checkForm(data);

    if (this.state.customerAddressId) {
      data.customerAddressId = this.state.customerAddressId;
    }
    if (update) {
      if (helpers.Data.isEmptyValueOfObject(this.state.form)) {
        this.setState({
          classAddAddress: textClassAddAddress,
          showEdit: false
        });
      }
    }

    if (helpers.Data.isEmptyValueOfObject(this.state.form)) {
      window.scrollTo(0, 0);
      if (update) {
        return func(data, this.props.dataAddress);
      }
      return func(data);
    }
  }

  addAddress() {
    this.setValueAddressRequest(this.props.actions.insertAddress);
  }

  updateAddress() {
    this.setValueAddressRequest(this.props.actions.updateAddress, true);
  }

  setTypeAddress(e) {
    this.setState({
      type: e
    });
  }

  deleteItemAddress(e) {
    this.props.actions.deleteAddress(e.id, this.props.dataAddress);
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

    checkEmptyCommon('type');
    checkEmptyCommon('customerName');
    checkEmptyCommon('street');
    checkEmptyCommon('provinceCode');
    checkEmptyCommon('districtCode');
    checkEmptyCommon('wardCode');

    if (helpers.Data.isEmpty(data.phone)) {
      form.phone = 'Không được bỏ trống';
    } else if (!helpers.Data.isPhoneNumber(data.phone)) {
      form.phone = 'Số điện thoại không đúng định dạng';
    } else {
      form.phone = null;
    }

    this.setState({
      form: form
    });
  }

  setDefaultAddress() {
    let value = this.state.isDefault;
    if (value === false) {
      value = true;
    } else {
      value = false;
    }
    this.setState({
      isDefault: value
    });
  }

  setAddressToCheckout(e) {
    this.props.actions.setAddressToCheckout(e, true, loadStatus.assignDataLoad);
  }

  editAddress(e) {
    let showEdit = this.state.showEdit;

    if (e.id !== this.state.customerAddressId) {
      showEdit = false;
    }

    if (!showEdit) {
      this.setState({
        customerName: e.customerName,
        phone: e.phone,
        provinceCode: e.province,
        districtCodeAutoCheck: e.district,
        wardCodeAutoCheck: e.ward,
        street: e.street,
        type: e.type,
        isDefault: e.isDefault,
        showEdit: true,
        customerAddressId: e.id,
        hiddenCheckDefault: e.isDefault ? false : false
      });
      this.showAddAddress({
        notClose: true
      });
      this.props.actions.getDistricts(this.props.dataAddress, e.province, true);
      this.props.actions.getWards(this.props.dataAddress, e.province, e.district, true);

    }

  }

  setValueForm(opts) {

    let form = {};
    switch (opts) {
      case 'customerName':
        form.customerName = this.refs.customerName.value;
        break;
      case 'phone':
        form.phone = this.refs.phone.value;
        break;
      case 'street':
        form.street = this.refs.street.value;
        break;
      default:
        break;
    }

    this.setState(form);
  }

  render() {
    let dataList = this.state.listAddress,
      listE = [],
      form = this.state.form,
      renderError = (message) => {
        return <ErrorForm message={ message } />
      };

    if (dataList.length > 0) {
      dataList.forEach((e, i) => {
        listE.push(
          <div className="col-xs-6 list-address_item_row" key={ i }>
            <div className="list-address_item list-address_item-default">
              <h4>{ e.customerName }</h4>
              <p>
                { `Địa chỉ: ${ e.fullName }` }
              </p>
              <p>Điện thoại:
                { e.phone }
              </p>
              <button onClick={ this.setAddressToCheckout.bind(this, e) } className="btn-default btn-primary margin-top btn-address">Giao hàng đên địa chỉ này</button>
              <button onClick={ this.editAddress.bind(this, e) } className="btn-default btn-address">Sửa</button>
              { this.state.isAuthenticated ? e.isDefault ?
                  ''
                  :
                  <button onClick={ this.deleteItemAddress.bind(this, e) } className="btn-default btn-address">Xóa</button>
                :
                '' }
            </div>
          </div>
        );
      });
    }

    const elementIsDefault = <div className="signin_items row">
                               <div className="col-xs-3"> </div>
                               <div className="col-xs-9 checkbox_mail-wrap">
                                 <input checked={ this.state.isDefault } type="checkbox" id="checkbox_address" onChange={ this.setDefaultAddress.bind(this) } />
                                 <label htmlFor="checkbox_address" className="text">
                                   <span className="select"></span> Sư dụng địa chỉ này làm mặc định</label>
                               </div>
                             </div>;

    return (
      <div className="step-1">
        <h2 className="title">1. Địa chỉ giao hàng</h2>
        <div className="list-address row">
          { listE }
        </div>
        { this.state.isAuthenticated ?
          <p>Bạn muốn giao hàng đến địa chỉ khác ? <a className="btn-add-address-wrap" onClick={ this.showAddAddress.bind(this) } href="javascript:void(0)">Thêm địa chỉ giao hàng mới</a></p>
          : <p>Bạn muốn giao hàng đến địa chỉ ?</p> }
        <div className={ `order-wrap margin-top add-address-wrap ${this.state.classAddAddress}` }>
          <div className="order-wrap_address row">
            <div className="order-wrap_address_container col-xs-12 col-sm-8 col-md-6">
              <div className="signin_items row">
                <label htmlFor="" className="col-xs-3">Họ tên</label>
                <div className="col-xs-9 require-wrap">
                  <input type="text" className="signin_input-text" onChange={ this.setValueForm.bind(this, 'customerName') } ref="customerName" value={ this.state.customerName } />
                  { form.customerName
                    ? renderError(form.customerName)
                    : '' }
                </div>
              </div>
              <div className="signin_items row">
                <label htmlFor="" className="col-xs-3">Điện thoại di đông</label>
                <div className="col-xs-9 require-wrap">
                  <input type="text" onChange={ this.setValueForm.bind(this, 'phone') } className="signin_input-text" ref="phone" value={ this.state.phone } />
                  { form.phone
                    ? renderError(form.phone)
                    : '' }
                </div>
              </div>
              { Object.keys(this.state.dataAddress).length > 0 ?
                <FormAddress provinceCodeAutoCheck={ this.state.provinceCode } districtCodeAutoCheck={ this.state.districtCodeAutoCheck } wardCodeAutoCheck={ this.state.wardCodeAutoCheck } loading={ false }
                  setValueAddress={ this.setValueAddress.bind(this) } dataAddress={ this.state.dataAddress } actions={ this.props.actions } messageProvince={ this.state.form.provinceCode } messageDistrict={ this.state.form.districtCode }
                  messageWard={ this.state.form.wardCode } />
                : '' }
              <div className="signin_items row">
                <label htmlFor="" className="col-xs-3">Địa chỉ</label>
                <div className="col-xs-9 require-wrap">
                  <input onChange={ this.setValueForm.bind(this, 'street') } type="text" className="signin_input-text" ref="street" value={ this.state.street } />
                  { form.street
                    ? renderError(form.street)
                    : '' }
                </div>
              </div>
              <div className="signin_items row">
                <label className="col-xs-3" htmlFor="">Loại địa chỉ</label>
                <div className="col-xs-9 sex-wrap require-wrap">
                  <div>
                    <input id="home" name="type-address" checked={ this.state.type === config.typeAddress.home } onChange={ this.setTypeAddress.bind(this, config.typeAddress.home) } type="radio" />
                    <label htmlFor="home">
                      <span className="check"></span>Nhà riêng
                    </label>
                  </div>
                  <div>
                    <input id="company" name="type-address" checked={ this.state.type === config.typeAddress.company } type="radio" onChange={ this.setTypeAddress.bind(this, config.typeAddress.company) } />
                    <label htmlFor="company">
                      <span className="check"></span>Công ty
                    </label>
                  </div>
                  { form.type
                    ? renderError(form.type)
                    : '' }
                </div>
              </div>
              { this.state.isAuthenticated ? this.state.hiddenCheckDefault ? '' :
                  elementIsDefault : '' }
              <div className="signin_items row">
                <div className="col-xs-3"> </div>
                <div className="col-xs-9 checkbox_mail-wrap">
                  { this.state.showEdit ?
                    <button className="btn_submit-signin" onClick={ this.updateAddress.bind(this) }>
                      <div>Cập nhập địa chỉ</div>
                    </button>
                    :
                    <button className="btn_submit-signin" onClick={ this.addAddress.bind(this) }>
                      <div>Giao tới địa chỉ này</div>
                    </button> }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );

  }

}

Address.propTypes = {
  listAddress: React.PropTypes.array,
  props: React.PropTypes.object,
  dataAddress: React.PropTypes.object
};

export default Address;