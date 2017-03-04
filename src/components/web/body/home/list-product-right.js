/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-02-18T14:14:10+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-02T22:00:35+07:00
*/

import React, {Component} from 'react';

import laptop from '../../../../static/images/laptop.jpg';

class ListProductRight extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        <li>
          <a href="#">
            <img className="img-responsive" src={laptop} alt=""/></a>
          <a href="#" className="text">Curabitur aliquet quam id dui posuere blandit.</a>
          <p className="bold price-current">18000d</p>
          <p className="small price">25000d</p>
        </li>
        <li>
          <a href="#">
            <img className="img-responsive" src={laptop} alt=""/></a>
          <a href="#" className="text">Curabitur aliquet quam id dui posuere blandit.</a>
          <p className="bold price-current">18000d</p>
          <p className="small price">25000d</p>
        </li>
        <li>
          <a href="#">
            <img className="img-responsive" src={laptop} alt=""/></a>
          <a href="#" className="text">Donec sollicitudin molestie malesuada. Donec rutrum congue leo eget malesuada.</a>
          <p className="bold price-current">18000d</p>
          <p className="small price">25000d</p>
        </li>
        <li>
          <a href="#">
            <img className="img-responsive" src={laptop} alt=""/></a>
          <a href="#" className="text">Curabitur aliquet quam id dui posuere blandit.</a>
          <p className="bold price-current">18000d</p>
          <p className="small price">25000d</p>
        </li>
      </ul>
    )
  }
}

export default ListProductRight;
