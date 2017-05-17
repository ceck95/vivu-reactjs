/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-02-18T13:46:47+07:00
* @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-17T23:32:40+07:00
*/

import React, { Component } from 'react';

import ListProduct from '../common/list-product';

class ListTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataItemCategory: []
    }
  }

  componentWillMount() {
    let arr = [];
    arr.push(this.props.dataItemCategory)
    if (arr.length > 0) {
      this.setState({
        dataItemCategory: arr
      })
    }
  }

  render() {
    let dataItemCategory = this.state.dataItemCategory;
    return (
      <div className="tabs-content">
        <div id="tabs-content-1" className="row tabs-content_wrap active">
          { dataItemCategory.length > 0 ?
            <ListProduct dataItemProduct={ this.props.dataItemCategory.products } dataCategoryGroup={ dataItemCategory } />
            : '' }
        </div>
        <div id="tabs-content-2" className="tabs-content_wrap">content-2</div>
        <div id="tabs-content-3" className="tabs-content_wrap">content-3</div>
      </div>
    )
  }

}

export default ListTab;
