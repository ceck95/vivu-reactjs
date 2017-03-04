/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-02T21:47:11+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-03T12:50:04+07:00
 */

import React, {Component} from 'react';
import {Link} from 'react-router';

class LeftMenuListProduct extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let listCategoryGroup = [];
    this.props.dataCategoryGroup.forEach((e, a) => {
      let listCategory = [];
      e.categories.forEach((i, b) => {
        listCategory.push(
          <li key={b}>
            <Link to={`/${e.urlKey}/${i.urlKey}`}>{i.name}</Link>
          </li>
        )
      });
      listCategoryGroup.push(
        <li className="list-link" key={a}>
          <Link className="bold" to={`/${e.urlKey}`}>{e.name}</Link>
          <ul className="lists">{listCategory}</ul>
        </li>
      )
    });

    return (
      <div className="col-sm-3 col-md-4 pull-right">
        <div className="sidebar-left">
          <h4 className="sb-left_title">Danh mục sản phẩm</h4>
          <ul className="sb-left_lists">
            {listCategoryGroup}
          </ul>
        </div>

        <div className="sidebar-left">
          <h4 className="sb-left_title">Đánh giá</h4>
          <ul className="sb-left_lists">
            <li className="list-link">
              <a href="#">
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star-o" aria-hidden="true"></i>
                (Ít nhất 4 sao)
              </a>
            </li>
            <li className="list-link">
              <a href="#">
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star-o" aria-hidden="true"></i>
                <i className="fa fa-star-o" aria-hidden="true"></i>
                (Ít nhất 3 sao)
              </a>
            </li>
            <li className="list-link">
              <a href="#">
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star-o" aria-hidden="true"></i>
                <i className="fa fa-star-o" aria-hidden="true"></i>
                <i className="fa fa-star-o" aria-hidden="true"></i>
                (Ít nhất 2 sao)
              </a>
            </li>
            <li className="list-link">
              <a href="#">
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star-o" aria-hidden="true"></i>
                <i className="fa fa-star-o" aria-hidden="true"></i>
                <i className="fa fa-star-o" aria-hidden="true"></i>
                <i className="fa fa-star-o" aria-hidden="true"></i>
                (Ít nhất 1 sao)
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }

}

export default LeftMenuListProduct;
