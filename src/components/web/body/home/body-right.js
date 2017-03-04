/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-18T14:09:42+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-18T14:19:39+07:00
 */

import React, {Component} from 'react';

import ListProductRight from './/list-product-right';

class BodyRight extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-sm-4">
        <div className="item_sidebar">
          <h3 className="title">Curabitur aliquet quam id dui.</h3>
          <div className="item_sidebar_wrap">
            <ListProductRight/>
          </div>
          <a className="more" href="#">Xem thêm</a>
        </div>
      </div>
    )
  }

}

export default BodyRight;
