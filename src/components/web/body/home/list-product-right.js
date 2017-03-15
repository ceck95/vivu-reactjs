/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-02-18T14:14:10+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-06T09:52:48+07:00
*/

import React, {Component} from 'react';

import config from '../../../../config/index';

class ListProductRight extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataProductsRight: []
    }
  }

  componentWillMount() {
    if (this.props.dataProductsRight
      ? this.props.dataProductsRight.length > 0
      : false) {
      this.setState({dataProductsRight: this.props.dataProductsRight});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataProductsRight) {
      this.setState({dataProductsRight: nextProps.dataProductsRight});
    }
  }

  render() {
    let listProductRight = [];
    if (this.state.dataProductsRight.length > 0) {
      this.state.dataProductsRight.forEach((e, i) => {
        listProductRight.push(
          <li key={i}>
            <a href="#">
              <img className="img-responsive" src={`${config.cdn.link}/${e.imagePath}`} alt=""/></a>
            <a href="#" className="text">{e.name}</a>
            <p className="bold price-current">{`${e.basePrice} đ`}
            </p>
            <p className="small price">25000d</p>
          </li>
        )
      });
      return (
        <ul>
          {listProductRight}
        </ul>
      )
    }

    return (
      <div>Loading</div>
    )

  }
}

export default ListProductRight;
