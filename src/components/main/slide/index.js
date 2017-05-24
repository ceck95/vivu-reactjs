/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-02-18T11:35:07+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-03T10:26:03+07:00
*/

import React, { Component } from 'react';

import image1 from '../../../static/images/image1.png';

//map props
import { bindActionCreators } from 'redux';
import actions from '../../../actions/index';
import ReactBase from 'react-base';
import { connect } from 'react-redux';

//import helpers
import { helpers } from 'react-base';

import config from '../../../config/index';

class Slide extends Component {

  constructor(props) {
    super(props);
    this.state = {
      containerSlide: '',
      spaceSlide: 'space-slideshow'
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.menuCategory.showMenu) {
      this.setState({
        containerSlide: 'fluid',
        spaceSlide: ''
      });
      return true;
    }
    this.setState({
      containerSlide: '',
      spaceSlide: 'space-slideshow'
    });
    return true;
  }

  render() {
    const slides = this.props.dataSetting.slides,
      listLabel = [],
      listImage = [],
      listInput = [];

    slides.forEach((e, i) => {
      i++;
      listLabel.push(<label key={ i } htmlFor={ `button-${i}` } className={ `sp-arrow sp-a${i}` }></label>)
    })

    slides.forEach((e, i) => {
      i++;
      listImage.push(<li key={ i }><img src={ `${config.cdn.link}${e.image}` } alt={ `image${i}` } /></li>)
    })
    let i = 0;
    slides.forEach((e, index) => {
      i++;
      index++;
      slides.forEach((b) => {
        if (e.id === b.id) {
          listInput.push(<input key={ i } id={ `button-${index}` } type="radio" name="radio-set" className={ `sp-selector-${index}` } defaultChecked={ index === 1 ? true : false } />)
        }
      })
      i++;
      slides.forEach(a => {
        if (e.id === a.id) {
          listInput.push(<label key={ i } htmlFor={ `button-${index}` } className={ `button-label-${index}` }></label>);
        }
      })

    })
    return (
      <div className={ `container container-sp-slideshow ${this.state.spaceSlide}` }>
        { slides.length > 0 ?
          <div className={ `sp-slideshow ${this.state.containerSlide}` }>
            { listInput }
            { listLabel }
            <div className="sp-content">
              <div className="sp-parallax-bg"></div>
              <ul className="sp-slider clearfix">
                { listImage }
              </ul>
            </div>
          </div>
          : <div className="sp-slideshow">
              No Slide
            </div> }
      </div>
    )
  }

}

let mapRedux = new ReactBase.helpers.mapRedux({
  actions: actions,
  bindActionCreators: bindActionCreators
});

export default connect(mapRedux.mapStateToProps, mapRedux.mapDispatchToProps)(Slide);
