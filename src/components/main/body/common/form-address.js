import React, { Component } from 'react';

/**
 * Import component
 */
import ErrorForm from './error-form';

/**
 * Import Base
 */
import { helpers } from 'react-base';

import statusLoadComponent from '../../../../const/load-status-component';

class FormAddress extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      provinces: [],
      districts: [],
      wards: [],
      provinceCode: '',
      districtCode: '',
      wardCode: ''
    }
  }

  componentWillMount() {
    this.setIntValue(this.props);
    if (this.props.dataAddress.provinces.length === 0) {
      this.props.actions.getProvinces(this.props.dataAddress);
    } else {
      this.setDataAddress(this.props);
    }
  }

  setDataAddress(props) {

    if (props.dataAddress.provinces.length > 0) {
      this.setState({
        provinces: props.dataAddress.provinces
      });
    }

    if (props.dataAddress.districts.length > 0) {
      this.setState({
        districts: props.dataAddress.districts
      });
    }
    this.setState({
      wards: props.dataAddress.wards
    });

  }

  setDataAddressAutoCheck(props) {
    this.setState({
      provinces: props.dataAddress.provinces
    });
    this.setState({
      districts: props.dataAddress.districts
    });
    this.setState({
      wards: props.dataAddress.wards
    });
  }


  setIntValue(props) {
    this.setState({
      messageProvince: props.messageProvince,
      messageDistrict: props.messageDistrict,
      messageWard: props.messageWard,
      loading: props.loading
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setIntValue(nextProps);
    this.setDataAddress(nextProps);
    if (nextProps.dataAddress.checkDistrict === statusLoadComponent.autoCheckDistrict) {
      this.setState({
        districtCode: nextProps.districtCodeAutoCheck,
        provinceCode: nextProps.provinceCodeAutoCheck
      });

      this.setValueParent({
        provinceCode: nextProps.provinceCodeAutoCheck,
        districtCode: nextProps.districtCodeAutoCheck
      });
      if (nextProps.districtCodeAutoCheck === '') {
        this.setState({
          districts: []
        });
      }

      this.props.actions.setAutoCheckAddressAvailable(nextProps.dataAddress, {
        checkDistrict: statusLoadComponent.availableAutoCheck
      });
    }

    if (nextProps.dataAddress.checkWard === statusLoadComponent.autoCheckWard) {
      this.setState({
        wardCode: nextProps.wardCodeAutoCheck
      });
      this.setValueParent({
        wardCode: nextProps.wardCodeAutoCheck
      });

      if (nextProps.wardCodeAutoCheck === '') {
        this.setState({
          wards: []
        });
      }

      this.props.actions.setAutoCheckAddressAvailable(nextProps.dataAddress, {
        checkWard: statusLoadComponent.availableAutoCheck
      });
    }
  }
  setValueParent(opt) {
    return this.props.setValueAddress({
      provinceCode: opt.provinceCode || this.state.provinceCode,
      districtCode: opt.districtCode || this.state.districtCode,
      wardCode: opt.wardCode || this.state.wardCode,
    })
  };

  setAddress(options, e) {
    let getText = (src) => {
      return src.target.value;
    };

    switch (options) {
      case 'province':
        if (!helpers.Data.isEmpty(e.target.value)) {
          this.setState({
            provinceCode: getText(e),
            districts: [],
            wards: []
          });
          this.setValueParent({
            provinceCode: getText(e)
          });

          this.props.actions.getDistricts(this.props.dataAddress, e.target.value);
        } else {
          this.setState({
            provinceCode: ''
          });
          this.setValueParent({
            provinceCode: ''
          });
        }
        break;
      case 'district':
        if (!helpers.Data.isEmpty(e.target.value)) {
          this.setState({
            districtCode: getText(e),
            wards: []
          });
          this.setValueParent({
            districtCode: getText(e),
          });
          if (!helpers.Data.isEmpty(e.target.value)) {
            this.props.actions.getWards(this.props.dataAddress, this.state.provinceCode, e.target.value);
          }
        } else {
          this.setState({
            districtCode: ''
          });
          this.setValueParent({
            districtCode: ''
          });
        }
        break;
      case 'ward':
        if (!helpers.Data.isEmpty(e.target.value)) {
          this.setState({
            wardCode: getText(e)
          });
          this.setValueParent({
            wardCode: getText(e)
          });
        } else {
          this.setState({
            wardCode: ''
          });
          this.setValueParent({
            wardCode: ''
          });
        }
        break;
      default:
        break;
    }
  }

  componentWillUnmount() {
    this.props.actions.setDataProvinces(this.props.dataAddress);
  }

  render() {
    let errorRender = (message) => {
        return <ErrorForm message={ message } />
      },
      listProvinces = [],
      listDistricts = [],
      listWards = [],
      classAddress = (list) => {
        if (list.length > 1) {
          return '';
        }

        if (this.state.loading) {
          return 'btn-loading clicked';
        }
        return '';
      };

    listProvinces.push(
      <option key='0' value=''>Tỉnh/Thành phố</option>
    )
    listDistricts.push(
      <option key='0' value=''>Quận/Huyện</option>
    )
    listWards.push(
      <option key='0' value=''>Phường/Xã</option>
    )
    if (this.state.provinces.length > 0) {
      this.state.provinces.forEach((e, i) => {
        listProvinces.push(
          <option key={ i + 1 } value={ e.provinceCode }>
            { e.displayName }
          </option>
        )
      });
    }

    if (this.state.districts.length > 0) {
      this.state.districts.forEach((e, i) => {
        listDistricts.push(
          <option key={ i + 1 } value={ e.districtCode }>
            { e.displayName }
          </option>
        )
      });
    }

    if (this.state.wards.length > 0) {
      this.state.wards.forEach((e, i) => {
        listWards.push(
          <option key={ i + 1 } value={ e.wardCode }>
            { e.displayName }
          </option>
        )
      });
    }
    ;

    return (
      <div className="signin_items row">
        <div className="col-xs-12">
          <div className="row require-wrap">
            <div className={ `col-xs-12 ${classAddress(listProvinces)}` }>
              <select value={ this.state.provinceCode } className="signin_select-full" name="" id="" onChange={ this.setAddress.bind(this, 'province') }>
                { listProvinces }
              </select>
            </div>
            { this.state.messageProvince
              ? errorRender(this.state.messageProvince)
              : '' }
          </div>
          <div className="row require-wrap">
            <div className={ `col-xs-12 ${classAddress(listDistricts)}` }>
              <select value={ this.state.districtCode } className="signin_select-full" name="" id="" onChange={ this.setAddress.bind(this, 'district') }>
                { listDistricts }
              </select>
            </div>
            { this.state.messageDistrict
              ? errorRender(this.state.messageDistrict)
              : '' }
          </div>
          <div className="row require-wrap">
            <div className={ `col-xs-12 ${classAddress(listWards)}` }>
              <select value={ this.state.wardCode } className="signin_select-full" name="" id="" onChange={ this.setAddress.bind(this, 'ward') }>
                { listWards }
              </select>
            </div>
            { this.state.messageWard
              ? errorRender(this.state.messageWard)
              : '' }
          </div>
        </div>
      </div>
      );

  }

}

FormAddress.propTypes = {
  actions: React.PropTypes.object,
  setValueAddress: React.PropTypes.func,
  dataAddress: React.PropTypes.object,
  messageProvince: React.PropTypes.string,
  messageDistrict: React.PropTypes.string,
  messageWard: React.PropTypes.string,
  loading: React.PropTypes.bool
};

export default FormAddress;