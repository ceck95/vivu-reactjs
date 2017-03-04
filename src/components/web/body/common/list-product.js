/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-02-18T13:50:18+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-03T20:23:59+07:00
*/

import React, {Component} from 'react';

//map props
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actions from '../../../../actions/index';
import ReactBase from 'react-base';

//config
import config from '../../../../config/index';

class ListProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataItemProduct: []
    };
  }

  componentWillMount() {
    this.setState({dataItemProduct: this.props.dataItemProduct});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({dataItemProduct: nextProps.dataItemProduct});
  }

  render() {
    let listDataProduct = this.state.dataItemProduct,
      listElementProduct = [];
    if (listDataProduct.length > 0) {
      listDataProduct.forEach((e, i) => {
        listElementProduct.push(
          <div key={i} className="col-sm-6 col-md-4">
            <div className="tabs_items">
              <a className="link-img" href="#">
                <img className="" src={`${config.cdn.link}${e.imagePath}`} className="img-responsive" alt=""/></a>
              <a href="#" className="link-text">{e.name}</a>
              <p className="price-current bold">{`${e.basePrice}đ`}
                <span className="promotion">30%</span>
              </p>
              <p className="small price">40000d</p>
              <p className="comment">Chưa có nhận xét</p>
              <button className="add-to-cart">
                <i className="fa fa-cart-plus" aria-hidden="true"></i>Thêm vào giỏ hàng</button>
            </div>
          </div>
        )
      });
    }

    if (listElementProduct.length > 0) {
      return (
        <div>
          {listElementProduct}
        </div>
      )
    }

    return (
      <div>
        Loading Product
      </div>
    )

  }

}

let mapRedux = new ReactBase.helpers.mapRedux({actions: actions, bindActionCreators: bindActionCreators});

export default connect(mapRedux.mapStateToProps, mapRedux.mapDispatchToProps)(ListProduct);
