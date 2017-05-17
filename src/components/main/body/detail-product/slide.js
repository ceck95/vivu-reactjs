/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-17T10:01:24+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-19T22:51:46+07:00
 */

import React, {Component} from 'react';

//hard code
import smartPhoneImg from '../../../../static/images/smartphone-1.jpg';

//config
import config from '../../../../config/index';

import {Link} from 'react-router';

class Slide extends Component {

  constructor(props) {
    super(props);
    this.state = {
      countDisplay: 2,
      sliderIndex: 0,
      sliderContainerWidth: 0,
      sliderItemWidth: 0,
      sliderWrapWidth: 0,
      styleSlider: {},
      styleSliders: {},
      dataListProduct: [],
      dataBreadCrumb: []
    };
  }

  componentWillMount() {
    let countDisplay = 2;
    if (window.innerWidth < 768)
      countDisplay = 2;
    if (window.innerWidth >= 768)
      countDisplay = 3;
    if (window.innerWidth >= 992)
      countDisplay = 4;
    if (window.innerWidth >= 1200)
      countDisplay = 5;

    this.setState({countDisplay: countDisplay, dataListProduct: this.props.dataListProduct, dataBreadCrumb: this.props.dataBreadCrumb});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({dataListProduct: nextProps.dataListProduct, dataBreadCrumb: nextProps.dataBreadCrumb});
  }

  componentDidMount() {
    let sliderWrapWidth = document.getElementsByClassName('slider-wrap')[0].offsetWidth,
      sliderItemLength = document.getElementsByClassName('slider').length,
      sliderItemWidth = sliderWrapWidth / this.state.countDisplay,
      sliderContainerWidth = sliderItemLength * sliderItemWidth;
    this.setState({
      sliderWrapWidth: sliderWrapWidth,
      sliderItemWidth: sliderItemWidth,
      sliderContainerWidth: sliderContainerWidth,
      styleSlider: {
        width: sliderItemWidth
      },
      styleSliders: {
        width: sliderContainerWidth,
        transform: 'translateX(-' + this.state.sliderIndex * sliderWrapWidth + 'px)'
      }
    });
  }

  handleSlide(options) {
    let sliderIndex = this.state.sliderIndex,
      sliderContainerWidth = this.state.sliderContainerWidth,
      sliderItemWidth = this.state.sliderItemWidth,
      countDisplay = this.state.countDisplay,
      sliderWrapWidth = this.state.sliderWrapWidth;
    if (options === 'next') {
      sliderIndex++;
      if (sliderIndex >= (sliderContainerWidth / (sliderItemWidth * countDisplay)))
        sliderIndex--;
      this.setState({
        sliderIndex: sliderIndex,
        styleSliders: {
          width: sliderContainerWidth,
          transform: 'translateX(-' + sliderIndex * sliderWrapWidth + 'px)'
        }
      });
    } else if (options === 'prev') {
      sliderIndex--;
      if (sliderIndex < 0)
        sliderIndex = 0;
      this.setState({
        sliderIndex: sliderIndex,
        styleSliders: {
          width: sliderContainerWidth,
          transform: 'translateX(-' + sliderIndex * sliderWrapWidth + 'px)'
        }
      });
    }
  }

  render() {
    let listSlide = [],
      dataBreadCrumb = this.state.dataBreadCrumb;
    if (this.state.dataListProduct.length > 0) {
      this.state.dataListProduct.forEach((e, i) => {
        listSlide.push(
          <div key={i} className="slider" style={this.state.styleSlider}>
            <Link to={`/${dataBreadCrumb[1].urlKey}/${e.urlKey}`} className="slider_link">
              <div className="img-wrap">
                <img src={`${config.cdn.link}${e.imagePath}`} className="slider_img img-responsive" alt=""/>
              </div>
              <div className="slider_link_text">
                <h4>{e.name}</h4>
                <p className="bold price-current">{`${e.basePrice} đ`}
                  <span className="promotion">30%</span>
                </p>
                <p className="price small">12.000.000đ</p>
                <p className="comment">Chưa có nhận xét</p>
              </div>
            </Link>
          </div>
        )
      });
      return (
        <div className="col-xs-12 lists-product">
          <div className="slider-wrap">
            <div className="sliders" style={this.state.styleSliders}>
              {listSlide}
            </div>
            <div className="sliders_group-btn">
              <button className="slider_btn slider_btn-next" onClick={this.handleSlide.bind(this, 'next')}>
                <i className="fa fa-chevron-right" aria-hidden="true"></i>
              </button>
              <button className="slider_btn slider_btn-prev" onClick={this.handleSlide.bind(this, 'prev')}>
                <i className="fa fa-chevron-left" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div></div>
    )

  }

}

export default Slide;
