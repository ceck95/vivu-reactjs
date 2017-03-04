/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-17T11:34:33+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-18T11:20:19+07:00
 */

import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

class Index extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default Index;
