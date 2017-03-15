/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-18T14:09:42+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-06T12:01:54+07:00
 */

import React, {Component} from 'react';

import ListProductRight from './/list-product-right';
import {Link} from 'react-router';

class BodyRight extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-sm-4">
        <div className="item_sidebar">
          <h3 className="title">Lựa chọn cho bạn</h3>
          <div className="item_sidebar_wrap">
            <ListProductRight dataProductsRight={this.props.dataItemCategory.productsRight}/>
          </div>
          <Link className="more" to={this.props.dataItemCategory.urlKey}>Xem thêm</Link>
        </div>
      </div>
    )
  }

}

export default BodyRight;
