/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-02-18T13:46:47+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-02T21:57:47+07:00
*/

import React, {Component} from 'react';

import ListProduct from '../common/list-product';

class ListTab extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="tabs-content">
        <div id="tabs-content-1" className="row tabs-content_wrap active">
          <ListProduct dataItemProduct={this.props.dataItemCategory.products}/>
        </div>
        <div id="tabs-content-2" className="tabs-content_wrap">content-2</div>
        <div id="tabs-content-3" className="tabs-content_wrap">content-3</div>
      </div>
    )
  }

}

export default ListTab;
