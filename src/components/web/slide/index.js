/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-02-18T11:35:07+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-03T10:26:03+07:00
*/

import React, {Component} from 'react';

import image1 from '../../../static/images/image1.png';

//map props
import {bindActionCreators} from 'redux';
import actions from '../../../actions/index';
import ReactBase from 'react-base';
import {connect} from 'react-redux';

//import helpers
import {helpers} from 'react-base';

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
      this.setState({containerSlide: 'fluid', spaceSlide: ''});
      return true;
    }
    this.setState({containerSlide: '', spaceSlide: 'space-slideshow'});
    return true;
  }

  render() {
    return (
      <div className={`container container-sp-slideshow ${this.state.spaceSlide}`}>
        <div className={`sp-slideshow ${this.state.containerSlide}`}>

          <input id="button-1" type="radio" name="radio-set" className="sp-selector-1" defaultChecked/>
          <label htmlFor="button-1" className="button-label-1"></label>

          <input id="button-2" type="radio" name="radio-set" className="sp-selector-2"/>
          <label htmlFor="button-2" className="button-label-2"></label>

          <input id="button-3" type="radio" name="radio-set" className="sp-selector-3"/>
          <label htmlFor="button-3" className="button-label-3"></label>

          <input id="button-4" type="radio" name="radio-set" className="sp-selector-4"/>
          <label htmlFor="button-4" className="button-label-4"></label>

          <input id="button-5" type="radio" name="radio-set" className="sp-selector-5"/>
          <label htmlFor="button-5" className="button-label-5"></label>

          <label htmlFor="button-1" className="sp-arrow sp-a1"></label>
          <label htmlFor="button-2" className="sp-arrow sp-a2"></label>
          <label htmlFor="button-3" className="sp-arrow sp-a3"></label>
          <label htmlFor="button-4" className="sp-arrow sp-a4"></label>
          <label htmlFor="button-5" className="sp-arrow sp-a5"></label>

          <div className="sp-content">
            <div className="sp-parallax-bg"></div>
            <ul className="sp-slider clearfix">
              <li><img src={image1} alt="image01"/></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

}

let mapRedux = new ReactBase.helpers.mapRedux({actions: actions, bindActionCreators: bindActionCreators});

export default connect(mapRedux.mapStateToProps, mapRedux.mapDispatchToProps)(Slide);
