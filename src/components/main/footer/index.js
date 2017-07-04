/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-01T12:55:07+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-01T13:05:08+07:00
 */

import React, { Component } from 'react';
import cash from '../../../static/images/ic-cash.svg'
import installment from '../../../static/images/ic-installment.svg'
import internetBakking from '../../../static/images/ic-internet-banking.svg'
import jcb from '../../../static/images/ic-jcb.svg'
import masterCard from '../../../static/images/ic-mastercard.svg'
import visa from '../../../static/images/ic-visa.svg'

class Footer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer>
        <div className="footer-wrap container-fluid">
          <div className="row">
            <div className="col-sm-3">
              <h3 className="footer_title">Hỗ trợ khách hàng</h3>
              <ul className="footer_lists">
                <li>
                  <p className="red bold">Hot line: +84987654321</p>
                </li>
                <li><a href="#" className="list">Câu hỏi thường gặp</a></li>
                <li><a href="#" className="list">Gửi yêu cầu hổ trợ</a></li>
                <li><a href="#" className="list">Hướng dẫn đặt hàng</a></li>
                <li><a href="#" className="list">Chính sách đổi trả</a></li>
              </ul>
            </div>
            <div className="col-sm-2">
              <h3 className="footer_title">Về Vivu</h3>
              <ul className="footer_lists">
                <li><a href="#" className="list">Giới thiệu</a></li>
                <li><a href="#" className="list">Tuyển dụng</a></li>
                <li><a href="#" className="list">Chính sách bảo mật</a></li>
                <li><a href="#" className="list">Điều khoản sử dụng</a></li>
              </ul>
            </div>
            <div className="col-sm-3">
              <h3 className="footer_title">Hợp tác và liên kết</h3>
              <ul className="footer_lists">
                <li><a href="#" className="list">Quy chế hoạt động sàn GDTMDT</a></li>
                <li><a href="#" className="list">Cras ultricies ligula</a></li>
                <li><a href="#" className="list">Cras ultricies ligula</a></li>
                <li><a href="#" className="list">Cras ultricies ligula</a></li>
              </ul>
            </div>
            <div className="col-sm-2">
              <h3 className="footer_title">Phương thức thanh toán</h3>
              <ul className="footer_lists">
                <li className="list-img"><span><img src={ cash } alt=""/></span></li>
                <li className="list-img"><span><img src={ installment } alt=""/></span></li>
                <li className="list-img"><span><img src={ internetBakking } alt=""/></span></li>
                <li className="list-img"><span><img src={ jcb } alt=""/></span></li>
                <li className="list-img"><span><img src={ masterCard } alt=""/></span></li>
                <li className="list-img"><span><img src={ visa } alt=""/></span></li>
              </ul>
            </div>
            <div className="col-sm-2">
              <h3 className="footer_title">Liên hệ</h3>
              <ul className="footer_lists footer_lists-socials">
                <li><a href="#" className="social"><i className="fa fa-2x fa-facebook" aria-hidden="true"></i></a></li>
                <li><a href="#" className="social"><i className="fa fa-2x fa-youtube" aria-hidden="true"></i></a></li>
                <li><a href="#" className="social"><i className="fa fa-2x fa-twitter" aria-hidden="true"></i></a></li>
              </ul>
              <p className="copyright">
                Copyright (c) 2017 Copyright Vivu All Rights Reserved.</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <span className="pull-left"><i className="fa fa-4x fa-map-marker" aria-hidden="true"></i></span>
              <p className="p-l-15"><span className="bold">Địa chỉ văn phòng:</span> 52 Út Tịch, phường 4, quận Tân Bình, thành phố Hồ Chí Minh</p>
              <p className="p-l-15 footer-small">Vivu.vn nhận đặt hàng trực tuyến và giao hàng tận nơi, chưa hỗ trợ mua và nhận hàng trực tiếp tại văn phòng hoặc trung tâm xử lý đơn hàng</p>
            </div>
            <div className="col-sm-6">
              <p><span className="bold">Địa chỉ gửi hàng đổi/trả/bảo hành:</span> Trung tâm xử lý đơn hàng TIKI - 367/F370 Đường Bạch Đằng, P.2, Q.Tân Bình TP. Hồ Chí Minh</p>
              <p className="footer-small">(Tham khảo hướng dẫn đổi, trả, bảo hành hoặc liên hệ 1900-6035 để được hướng dẫn thêm)</p>
            </div>
          </div>
        </div>
      </footer>
    )
  }

}

export default Footer;
