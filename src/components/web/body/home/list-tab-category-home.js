1/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-02-18T13:39:45+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-28T14:11:55+07:00
*/

import React, {Component} from 'react';

class ListTabCategoryHome extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="tabs">
        <li data-tab="tabs-content-1" className="tabs_btn col-xs-4 active">MỚI & NỔI BẬT</li>
        <li data-tab="tabs-content-2" className="tabs_btn col-xs-4">BÁN CHẠY</li>
        <li data-tab="tabs-content-3" className="tabs_btn col-xs-4">GIẢM GIÁ</li>
      </ul>
    );
  }

}

export default ListTabCategoryHome;
