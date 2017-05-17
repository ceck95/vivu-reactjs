/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-17T09:47:49+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-19T22:46:59+07:00
 */

import React, { Component } from 'react';

//Component
import SlideHeadInfo from './slide-head-info';

//config
import config from '../../../../config/index';

class HeadInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      styleImageZoom: {},
      dataProductColor: {},
      imageZoom: null
    }
  }

  zoomImage(options, e) {
    if (options === 'move') {
      let posX = e.nativeEvent.offsetX,
        posY = e.nativeEvent.offsetY;
      posX *= 2.6;
      posY *= 2.8;
      // let styleImageZoom = {};

      this.setState({
        styleImageZoom: {
          backgroundPosition: `${ - posX}px ${ - posY}px`,
          display: 'block',
          backgroundImage: `url(${this.state.imageZoom})`
        }
      });
    } else {
      this.setState({
        styleImageZoom: {
          display: 'none'
        }
      });
    }
  }

  componentWillMount() {
    this.setState({
      dataProductColor: this.props.dataProductDetail.productColors[0]
    });
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.dataImageZoomProductDetail).length > 0) {
      this.setState({
        imageZoom: `${config.cdn.link}${nextProps.dataImageZoomProductDetail.imagePath}`
      });
    } else {
      this.setState({
        imageZoom: null
      });
    }
    this.setState({
      dataProductColor: nextProps.dataProductDetail.productColors[0]
    });
  }

  render() {
    return (
      <div className="col-sm-4 detail-images">
        <div className="detail-img_wrap row">
          <SlideHeadInfo dataProductColor={ this.state.dataProductColor } actions={ this.props.actions } dataImageZoomProductDetail={ this.props.dataImageZoomProductDetail } />
          <img className="img-detail img-responsive" ref="imageZoom" onMouseLeave={ this.zoomImage.bind(this) } onMouseMove={ this.zoomImage.bind(this, 'move') } src={ this.state.imageZoom } alt="" />
          <div className="detail-image_zoom" style={ this.state.styleImageZoom }></div>
        </div>
        <div className="detail-img_group-btn">
          <div className="btn-wrap">
            <button className="btn-default btn-save-in-fb">
              <i className="fa fa-bookmark-o" aria-hidden="true"></i> Save in facebook
            </button>
          </div>
        </div>
      </div>
    )
  }

}

HeadInfo.propTypes = {
  dataProductDetail: React.PropTypes.object,
  actions: React.PropTypes.object
};

export default HeadInfo;
