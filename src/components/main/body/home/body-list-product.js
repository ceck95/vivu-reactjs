/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-02-18T13:32:12+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-05T14:09:19+07:00
*/

import React, { Component } from 'react';

import banner from '../../../../static/images/banner-1.jpg';

import ListTabCategoryHome from './list-tab-category-home';
import ListTab from './list-tab';
import BodyRight from './body-right';

import config from '../../../../config/index';

class BodyListProduct extends Component {

  constructor(props) {
    super(props)
    this.state = {
      coverImagePath: ''
    }
  }

  componentWillMount() {
    this.setState({
      coverImagePath: this.props.dataItemCategory.coverImagePath
    })
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-8 main_items_content">
          <a href="#">
            <img className="img-responsive" src={ `${config.cdn.link}${this.state.coverImagePath}` } alt="" />
          </a>
          <div className="tabs-wrap">
            <ListTabCategoryHome/>
            <ListTab dataItemCategory={ this.props.dataItemCategory } />
          </div>
        </div>
        <BodyRight dataItemCategory={ this.props.dataItemCategory } />
      </div>
    )
  }
}

export default BodyListProduct;
