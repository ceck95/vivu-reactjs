/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-17T22:55:56+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-19T22:50:43+07:00
 */

import React, { Component } from 'react';

import config from '../../../../config/index';
import { helpers } from 'react-base';
import Image from '../common/image';

class SlideHeadInfo extends Component {

	constructor(props) {
		super(props);
		this.state = {
			sliderIndex: 0,
			sliderContainerHeight: 0,
			sliderItemHeight: 0,
			sliderWrapHeight: 0,
			styleSlider: {},
			styleSliders: {},
			dataSlideProductColorPreviewImage: [],
			setSizeSlide: false
		};
	}

	handleSlide(options) {
		let sliderIndex = this.state.sliderIndex,
			sliderContainerHeight = this.state.sliderContainerHeight,
			sliderItemHeight = this.state.sliderItemHeight,
			countDisplay = config.default.countItemSlideHeaderInfoOfPageDetail,
			sliderWrapHeight = this.state.sliderWrapHeight;
		if (options === 'down') {
			sliderIndex++;
			if (sliderIndex >= (sliderContainerHeight / (sliderItemHeight * countDisplay)))
				sliderIndex--;
			this.setState({
				sliderIndex: sliderIndex,
				styleSliders: {
					height: sliderContainerHeight,
					transform: 'translateY(-' + sliderIndex * sliderWrapHeight + 'px)'
				}
			});
		} else if (options === 'up') {
			sliderIndex--;
			if (sliderIndex < 0)
				sliderIndex = 0;
			this.setState({
				sliderIndex: sliderIndex,
				styleSliders: {
					height: sliderContainerHeight,
					transform: 'translateY(-' + sliderIndex * sliderWrapHeight + 'px)'
				}
			});
		}
	}

	componentWillMount() {
		this.applyDataProductColorImage(this.props);
	}

	applyDataProductColorImage(props, next) {
		let dataProps = props.dataProductColor;
		if (dataProps.productColorPreviewImages ? dataProps.productColorPreviewImages.length >= 0 : false) {

			let run = () => {
				this.setState({
					dataSlideProductColorPreviewImage: dataProps.productColorPreviewImages,
					setSizeSlide: true,
					sliderIndex: 0
				});
				// if (Object.keys(this.props.dataImageZoomProductDetail).length === 0) {
				this.props.actions.setDataImageZoomProductDetail(dataProps.productColorPreviewImages[0]);
			// }
			};

			if (next) {
				if (!helpers.Data.compareJSON(dataProps.productColorPreviewImages, this.props.dataProductColor.productColorPreviewImages)) {
					run();
				}
			} else {
				run();
			}

		} else {
			this.setState({
				dataSlideProductColorPreviewImage: []
			});
			this.props.actions.setDataImageZoomProductDetail('');
		}

	}

	componentWillReceiveProps(nextProps) {
		this.applyDataProductColorImage(nextProps, true);

		if (this.state.setSizeSlide) {

			let sliderWrapHeight = document.getElementsByClassName('slider-col')[0].offsetHeight,
				sliderItemLength = document.getElementsByClassName('slider-detail_img').length,
				sliderItemHeight = sliderWrapHeight / config.default.countItemSlideHeaderInfoOfPageDetail,
				sliderContainerHeight = sliderItemLength * sliderItemHeight;
			this.setState({
				sliderWrapHeight: sliderWrapHeight,
				sliderItemHeight: sliderItemHeight,
				sliderContainerHeight: sliderContainerHeight,
				styleSlider: {
					height: sliderItemHeight
				},
				styleSliders: {
					height: sliderContainerHeight,
					transform: 'translateX(-' + this.state.sliderIndex * sliderWrapHeight + 'px)'
				},
				setSizeSlide: false
			});

		}
	}


	setProductColorPreviewImage(e) {
		this.props.actions.setDataImageZoomProductDetail(e);
	}

	// componentDidMount() {
	// 	let sliderWrapHeight = document.getElementsByClassName('slider-col')[0].offsetHeight,
	// 		sliderItemLength = document.getElementsByClassName('slider-detail_img').length,
	// 		sliderItemHeight = sliderWrapHeight / config.default.countItemSlideHeadeInfoOfPageDetail,
	// 		sliderContainerHeight = sliderItemLength * sliderItemHeight;
	// 	this.setState({
	// 		sliderWrapHeight: sliderWrapHeight,
	// 		sliderItemHeight: sliderItemHeight,
	// 		sliderContainerHeight: sliderContainerHeight,
	// 		styleSlider: {
	// 			height: sliderItemHeight
	// 		},
	// 		styleSliders: {
	// 			height: sliderContainerHeight,
	// 			transform: 'translateX(-' + this.state.sliderIndex * sliderWrapHeight + 'px)'
	// 		}
	// 	});
	// }

	render() {
		let listSlide = [];
		if (this.state.dataSlideProductColorPreviewImage.length > 0) {
			this.state.dataSlideProductColorPreviewImage.forEach((e, i) => {
				listSlide.push(
					<div key={ i } style={ this.state.styleSlider } className="slider-detail_img" onClick={ this.setProductColorPreviewImage.bind(this, e) }><img style={ { height: this.state.styleSlider.height - 10 } } src={ `${config.cdn.link}${e.imagePath}` } alt="" className="img-responsive" /></div>
				)
			})
			return (
				<div className="slider-col pull-left slider-col-detail">
      <div className="slider-col_wrap">
        <div className="slider-col_sliders" style={ this.state.styleSliders }>
          { listSlide }
        </div>
      </div>
      <div className="sliders_group-btn">
        <button className="slider_btn slider_btn-up" onClick={ this.handleSlide.bind(this, 'up') }>
          <i className="fa fa-chevron-up" aria-hidden="true"></i>
        </button>
        <button className="slider_btn slider_btn-down" onClick={ this.handleSlide.bind(this, 'down') }>
          <i className="fa fa-chevron-down" aria-hidden="true"></i>
        </button>
      </div>
    </div>
			)
		} else {
			return (<div className="slider-col pull-left slider-col-detail"></div>);
		}


	}

}

SlideHeadInfo.propTypes = {
	dataProductColor: React.PropTypes.object,
	actions: React.PropTypes.object
}

export default SlideHeadInfo;
