/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-02-18T14:14:10+07:00
* @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-24T08:38:35+07:00
*/

import React, { Component } from 'react';

import config from '../../../../config/index';

import { Link } from 'react-router';

class ListProductRight extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataProductsRight: [],
      dataItemCategory: []
    }
  }

  componentWillMount() {
    if (this.props.dataProductsRight
        ? this.props.dataProductsRight.length > 0
        : false) {
      this.setState({
        dataProductsRight: this.props.dataProductsRight,
        dataItemCategory: this.props.dataItemCategory
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataProductsRight) {
      this.setState({
        dataProductsRight: nextProps.dataProductsRight,
        dataItemCategory: this.props.dataItemCategory
      });
    }
  }

  render() {
    let listProductRight = [];
    if (this.state.dataProductsRight.length > 0) {
      this.state.dataProductsRight.forEach((e, i) => {
        this.state.dataItemCategory.categories.forEach(a => {
          if (e.categoryId === a.id) {
            listProductRight.push(
              <li key={ i }>
                <Link to={ `/${this.state.dataItemCategory.urlKey}/${a.urlKey}/${e.urlKey}` }>
                <img className="img-responsive" src={ `${config.cdn.link}${e.imagePath}` } alt="" /></Link>
                <Link to={ `/${this.state.dataItemCategory.urlKey}/${a.urlKey}/${e.urlKey}` } className="text">
                { e.name }
                </Link>
                <p className="bold price-current">
                  { `${e.basePrice} đ` }
                </p>
                <p className="small price">25000d</p>
              </li>
            );
          }
        });

      });
      return (
        <ul>
          { listProductRight }
        </ul>
      )
    }

    return (
      <div>Loading</div>
    )

  }
}

export default ListProductRight;
