/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-02T21:47:11+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   root
* @Last modified time: 2017-03-07T22:19:44+07:00
 */

import React, { Component } from 'react';
import { Link } from 'react-router';
import config from '../../../../config/index';
import utility from '../../../../helpers/utility';

class LeftMenuListProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemMenuCurrent: {}
    }
  }

  componentWillMount() {
    this.setState({
      itemMenuCurrent: this.props.itemMenuCurrent
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.urlKeyCategoryGroup !== nextProps.params.urlKeyCategoryGroup || this.props.params.urlKeyCategory !== nextProps.params.urlKeyCategory) {
      this.setState({
        itemMenuCurrent: nextProps.itemMenuCurrent
      });
    }
  }

  filterPrice(price, nextPrice) {
    this.props.actions.filterPrice(this.props.routing, `${price}-${nextPrice}`);
  }

  render() {
    let listCategoryGroup = [],
      dataCategoryGroup = this.props.dataCategoryGroup,
      categoryGroupCurrent = null;
    for (let i in dataCategoryGroup) {
      if (dataCategoryGroup[i].urlKey === this.state.itemMenuCurrent.urlKey) {
        categoryGroupCurrent = dataCategoryGroup[i].id
        break;
      } else {

        if (dataCategoryGroup[i].categories ? dataCategoryGroup[i].categories.length > 0 : false) {
          for (let y in dataCategoryGroup[i].categories) {
            if (dataCategoryGroup[i].categories[y].urlKey === this.state.itemMenuCurrent.urlKey) {
              categoryGroupCurrent = dataCategoryGroup[i].id
              break;
            }
          }
        }

      }
    }

    this.props.dataCategoryGroup.forEach((e, a) => {
      let listCategory = [];
      if (e.id === categoryGroupCurrent && e.categories ? e.categories.length > 0 : false) {
        e.categories.forEach((i, b) => {
          listCategory.push(
            <li key={ b }>
              <Link to={ `/${e.urlKey}/${i.urlKey}` }>
              { i.name }
              </Link>
            </li>
          )
        });
      }

      listCategoryGroup.push(
        <li className="list-link" key={ a }>
          <Link className="bold" to={ `/${e.urlKey}` }>
          { e.name }
          </Link>
          <ul className="lists">
            { listCategory }
          </ul>
        </li>
      )
    });
    let filterItemPrice = config.default.filterItemPrice,
      filterItemPriceDistance = config.default.filterItemPriceDistance,
      listElementPrice = [],
      price = 0;
    for (let i = 0; i < filterItemPrice; i++) {
      let priceDistance = price + filterItemPriceDistance;
      listElementPrice.push(<li onClick={ this.filterPrice.bind(this, price, priceDistance) } className="list-link" key={ i }>
                              <a className="link">
                                { `${utility.formatCurrency(price)}đ - ${utility.formatCurrency(priceDistance)}đ` }
                              </a>
                            </li>);
      price = price + filterItemPriceDistance;
    }

    return (
      <div className="col-sm-3 col-md-4 pull-right">
        <div className="sidebar-left">
          <h4 className="sb-left_title">Danh mục sản phẩm</h4>
          <ul className="sb-left_lists">
            { listCategoryGroup }
          </ul>
        </div>
        <div className="sidebar-left">
          <h4 className="sb-left_title">Giá</h4>
          <ul className="sb-left_lists">
            { listElementPrice }
          </ul>
        </div>
      </div>
    )
  }

}

export default LeftMenuListProduct;
