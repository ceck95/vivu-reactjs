/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-02-18T13:24:37+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-01T00:25:12+07:00
*/

import React, { Component } from 'react';

import HeaderListProduct from './header-list-product';
import BodyListProduct from './body-list-product';

class HomeListProduct extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <HeaderListProduct dataItemCategory={ this.props.dataItemCategory } />
        <BodyListProduct dataItemCategory={ this.props.dataItemCategory } />
      </div>
    )
  }

}

export default HomeListProduct;
