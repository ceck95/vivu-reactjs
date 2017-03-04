/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-02-18T13:32:12+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-02T22:00:17+07:00
*/

import React, {Component} from 'react';

import banner from '../../../../static/images/banner-1.jpg';

import ListTabCategoryHome from './list-tab-category-home';
import ListTab from './list-tab';
import BodyRight from './body-right';

class BodyListProduct extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-8 main_items_content">
          <a href="#">
            <img className="img-responsive" src={banner} alt=""/>
          </a>
          <div className="tabs-wrap">
            <ListTabCategoryHome/>
            <ListTab dataItemCategory={this.props.dataItemCategory}/>
          </div>
        </div>
        <BodyRight/>
      </div>
    )
  }
}

export default BodyListProduct;
