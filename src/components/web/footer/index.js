/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-01T12:55:07+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-01T13:05:08+07:00
 */

import React, {Component} from 'react';

class Footer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer>
        <div className="footer-wrap container">
          <div className="row">
            <div className="col-sm-3 col-md-2">
              <a href="#" className="brand_logo">Vivu</a>
            </div>
            <div className="col-sm-3 col-md-4">
              <h3 className="footer_title">VỀ VIVU</h3>
              <ul className="footer_lists">
                <li>
                  <a href="#" className="list">Giới thiệu</a>
                </li>
                <li>
                  <a href="#" className="list">Chính sách bảo mật</a>
                </li>
                <li>
                  <a href="#" className="list">Điều khoản sử dụng</a>
                </li>
                <li>
                  <a href="#" className="list">Chính sách quảng cáo</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-3 col-md-4">
              <h3 className="footer_title">HỢP TÁC VÀ LIÊN KIẾT</h3>
              <ul className="footer_lists">
                <li>
                  <a href="#" className="list">NhutDev.com</a>
                </li>
                <li>
                  <a href="#" className="list">NhutDev.com</a>
                </li>
                <li>
                  <a href="#" className="list">NhutDev.com</a>
                </li>
                <li>
                  <a href="#" className="list">NhutDev.com</a>
                </li>
              </ul>
            </div>

            <div className="col-sm-3 col-md-2">
              <h3 className="footer_title">KẾT NỐI VỚI CHÚNG TÔI</h3>
              <ul className="footer_lists footer_lists-socials">
                <li>
                  <a href="#" className="social">
                    <i className="fa fa-2x fa-facebook" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="social">
                    <i className="fa fa-2x fa-youtube" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="social">
                    <i className="fa fa-2x fa-twitter" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
              <p className="copyright">
                Copyright (c) 2017 Copyright VIVU All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    )
  }

}

export default Footer;
