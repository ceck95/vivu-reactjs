/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-17T09:30:06+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-23T15:38:55+07:00
 */

import React, { Component } from 'react';

//Component
import BreadCrumb from '../common/breadcrumb';
import HeadInfo from './head-info';
import BodyInfo from './body-info';
import Slide from './slide';
import Detail from './detail';

//map props
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../../../actions/index';
import ReactBase from 'react-base';

//const
import loadStatus from '../../../../const/load-status';

const helpers = ReactBase.helpers;

class DetailProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataProductDetail: {},
      dataImageZoomProductDetail: {},
      dataBreadCrumb: []
    }
  }

  componentWillMount() {
    this.props.actions.getProductDetail(this.props.params.urlKeyProduct);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataProductDetail.loadStatus === loadStatus.assignDataLoad) {
      this.setState({
        dataProductDetail: nextProps.dataProductDetail.resp
      });
      let dataBreadCrumb = [],
        dataCategoryGroup = this.props.categoryGroup;

      for (let i in dataCategoryGroup) {
        if (dataCategoryGroup[i].urlKey === this.props.params.urlKeyCategoryGroup) {
          dataBreadCrumb.push({
            name: dataCategoryGroup[i].name,
            urlKey: dataCategoryGroup[i].urlKey,
            currentLink: false
          });
          for (let a in dataCategoryGroup[i].categories) {
            if (dataCategoryGroup[i].categories[a].urlKey === this.props.params.urlKeyCategory) {
              dataBreadCrumb.push({
                name: dataCategoryGroup[i].categories[a].name,
                urlKey: `${dataCategoryGroup[i].urlKey}/${dataCategoryGroup[i].categories[a].urlKey}`,
                currentLink: false
              });
              dataBreadCrumb.push({
                name: nextProps.dataProductDetail.resp.product.name,
                urlKey: `${dataCategoryGroup[i].urlKey}/${dataCategoryGroup[i].categories[a].urlKey}/${nextProps.dataProductDetail.resp.product.urlKey}`,
                currentLink: true
              })
            }
          }
          break;
        }
      }

      this.setState({
        dataBreadCrumb: dataBreadCrumb
      });
      this.props.actions.setDataProductDetail(helpers.Data.assign(nextProps.dataProductDetail, {
        loadStatus: loadStatus.available
      }))
    }

    if (this.props.dataImageZoomProductDetail !== nextProps.dataImageZoomProductDetail) {
      this.setState({
        dataImageZoomProductDetail: nextProps.dataImageZoomProductDetail
      });
    }
    if (this.props.params.urlKeyProduct !== nextProps.params.urlKeyProduct) {
      this.props.actions.getProductDetail(nextProps.params.urlKeyProduct);
    }
  }

  render() {
    if (Object.keys(this.state.dataProductDetail).length > 0) {
      return (
        <div className="container main main-other">
          <BreadCrumb dataBreadCrumb={ this.state.dataBreadCrumb } />
          <div className="row">
            { this.state.dataProductDetail.product.productColors.length > 0
              ? <HeadInfo dataProductDetail={ this.state.dataProductDetail.product } dataImageZoomProductDetail={ this.state.dataImageZoomProductDetail } actions={ this.props.actions } />
              : <div className="col-sm-4 detail-images">Không có hình ảnh hiển thị</div> }
            <BodyInfo actions={ this.props.actions } dataQuoteCart={ this.props.dataQuoteCart } dataProductDetail={ this.state.dataProductDetail.product } />
            <div className="clear-fix"></div>
            <hr className="margin-top-bottom" />
            <Detail dataProductDetail={ this.state.dataProductDetail.product } />
            <h3 className="title">Sản phẩm liên quan</h3>
            <Slide dataListProduct={ this.state.dataProductDetail.products } dataBreadCrumb={ this.state.dataBreadCrumb } />
          </div>
        </div>
      )
    }

    return (
      <div>Loading</div>
    )

  }

}

let mapRedux = new ReactBase.helpers.mapRedux({
  actions: actions,
  bindActionCreators: bindActionCreators
});

export default connect(mapRedux.mapStateToProps, mapRedux.mapDispatchToProps)(DetailProduct);
