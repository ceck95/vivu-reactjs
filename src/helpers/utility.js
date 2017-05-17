import config from '../config/index';
import { helpers } from 'react-base';

class Utility {

  static translateStatusOrder(status) {
    let str = '',
      orderStatus = config.orderStatus;
    switch (status) {
      case orderStatus.new:
        str = 'Đang xử lý';
        break;
      case orderStatus.accepted:
        str = 'Đã xử lý';
        break;
      case orderStatus.shipping:
        str = 'Đang giao hàng';
        break;
      case orderStatus.completed:
        str = 'Đã giao hàng thành công';
        break;
      case orderStatus.cancel:
        str = 'Đã hủy';
        break;
      default:
        break;
    }
    return str;
  }

  static getSearchKey(props) {
    let key = props.routing.locationBeforeTransitions.query[config.router.search.key];
    return key ? key.split('-').join(' ') : '';
  }

  static formatCurrency(src) {
    return src.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  static filterUrl(baseUrl, url) {

    if (baseUrl.indexOf('?') >= 0) {
      baseUrl = `${baseUrl}&${url}`;
    } else {
      baseUrl = `${baseUrl}?${url}`;
    }

    return baseUrl;
  }

}

export default Utility;