/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-03-02T21:53:44+07:00
* @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-19T21:41:13+07:00
*/

import React, { Component } from 'react';
import ListProduct from '../common/list-product';
import LeftMenuListProduct from './left-menu-list-product';
import Pagination from './pagination';
import { helpers } from 'react-base';
import loadStatus from '../../../../const/load-status';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../../../actions/index';
import ReactBase from 'react-base';

import config from '../../../../config/index';
import utility from '../../../../helpers/utility';

class BodyPageListProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataListProduct: [],
      dataPaginate: {},
      itemMenuCurrent: {},
      dataItemCategoryGroup: {},
      dataCategoryGroup: []
    };
  }

  setDataItemCategory(dataCategoryGroup, props) {

    let dataItemCategoryGroup = {};

    if (props.urlKeyCategory && props.urlKeyCategoryGroup) {
      if (dataCategoryGroup.length > 0) {

        for (let i in dataCategoryGroup) {
          if (dataCategoryGroup[i].urlKey === props.urlKeyCategoryGroup) {
            dataItemCategoryGroup = dataCategoryGroup[i];

            for (let a in dataCategoryGroup[i].categories) {
              if (dataCategoryGroup[i].categories[a] === props.urlKeyCategory) {
                dataItemCategoryGroup.categories = dataCategoryGroup[i].categories[a];
                break;
              }
            }

            break;
          }
        }

      }
    } else if (!props.urlKeyCategory && props.urlKeyCategoryGroup) {

      dataCategoryGroup.forEach(e => {
        if (e.urlKey === props.urlKeyCategoryGroup) {
          dataItemCategoryGroup = e;
        }
      });

    }

    this.setState({
      dataItemCategoryGroup: dataItemCategoryGroup
    });
  }

  handleSearchProduct(searchKey, props) {
    this.handleEffect();
    let categoryGroupId = this.props.searchMenuCategory.categoryGroupCurrent.id,
      query = props ? props.routing.locationBeforeTransitions.query : this.props.routing.locationBeforeTransitions.query;

    this.props.actions.getProductSearch(searchKey, categoryGroupId, 1, this.props.loadProduct, null, this.props.searchMenuCategory, query);

    this.setState({
      itemMenuCurrent: {
        name: `Tìm kiếm: ${searchKey}`
      }
    })
  }

  componentWillMount() {
    let searchKey = utility.getSearchKey(this.props);
    if (searchKey) {
      this.handleSearchProduct(searchKey);
    } else {
      if (this.props.params.urlKeyCategory && this.props.params.urlKeyCategoryGroup) {
        this.handleGetApiProductHasEffect('category', this.props);
        this.setDataItemCategory(this.props.categoryGroup, {
          urlKeyCategory: this.props.params.urlKeyCategory,
          urlKeyCategoryGroup: this.props.params.urlKeyCategoryGroup
        });
      } else if (this.props.params.urlKeyCategoryGroup) {
        this.handleGetApiProductHasEffect('categoryGroup', this.props);
        this.setDataItemCategory(this.props.categoryGroup, {
          urlKeyCategoryGroup: this.props.params.urlKeyCategoryGroup
        });
      }
      if (this.props.dataBreadCrumb.length > 0) {
        this.handleMenuItemCurrent(this.props.dataBreadCrumb);
      }
    }
    this.setState({
      dataCategoryGroup: this.props.dataCategoryGroup
    });
  }

  handleMenuItemCurrent(dataBreadCrumb) {
    dataBreadCrumb.forEach(e => {
      if (e.currentLink) {
        this.setState({
          itemMenuCurrent: {
            name: e.name,
            urlKey: e.urlKey
          }
        });
      }
    });
  }

  handleEffect() {
    if (config.default.effectLoadListProduct) {
      this.setState({
        dataListProduct: [],
        dataPaginate: {}
      });
    }
  }

  handleGetApiProductHasEffect(options, props) {
    let choose = '',
      chooseUrlKey = '';
    if (options === 'category') {
      choose = 'category';
      chooseUrlKey = 'urlKeyCategory';
      this.setDataItemCategory(props.categoryGroup, {
        urlKeyCategory: props.params.urlKeyCategory,
        urlKeyCategoryGroup: props.params.urlKeyCategoryGroup
      });
    } else if (options === 'categoryGroup') {
      choose = 'categoryGroup';
      chooseUrlKey = 'urlKeyCategoryGroup';
      this.setDataItemCategory(props.categoryGroup, {
        urlKeyCategoryGroup: props.params.urlKeyCategoryGroup
      });
    }
    this.handleEffect();
    let query = props.routing.locationBeforeTransitions.query;

    this.props.actions.getProductByUrlKey(choose, props.params[chooseUrlKey], null, props.loadProduct, null, query);
  }

  checkLoadFilter(nextProps) {
    let pathLast = this.props.routing.locationBeforeTransitions,
      urlCurrentLast = pathLast.pathname + pathLast.search,
      path = nextProps.routing.locationBeforeTransitions,
      urlCurrent = path.pathname + path.search;
    if (nextProps.loadProduct.loadFilterProduct === loadStatus.startLoad) {
      if (urlCurrentLast === urlCurrent) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.dataPaginate.loadingProduct === loadStatus.assignDataLoad) {
      this.setState({
        dataListProduct: nextProps.dataListProduct,
        dataPaginate: nextProps.dataPaginate
      });
      this.props.actions.statusLoadProductByPagination(helpers.Data.assign(nextProps.dataPaginate, {
        loadingProduct: loadStatus.loaded
      }));
    }

    if (nextProps.loadProduct.loadOfRouter === loadStatus.assignDataLoad) {
      this.setState({
        dataListProduct: nextProps.dataListProduct,
        dataPaginate: nextProps.dataPaginate
      });
      this.props.actions.statusLoadProduct(helpers.Data.assign(nextProps.loadProduct, {
        loadOfRouter: loadStatus.loaded
      }));
    }

    if (nextProps.dataPaginate.loadingProduct === loadStatus.loading) {
      this.handleEffect();
    }

    let searchKey = utility.getSearchKey(nextProps);

    if (searchKey) {
      if (nextProps.searchMenuCategory.categoryGroupCurrent.statusLoad === loadStatus.startLoad) {
        this.handleSearchProduct(searchKey, nextProps);
      } else if (this.checkLoadFilter(nextProps)) {
        this.handleSearchProduct(searchKey, nextProps);
      }
    } else {

      if (this.checkLoadFilter(nextProps)) {
        if (nextProps.params.urlKeyCategory && nextProps.params.urlKeyCategoryGroup) {
          this.handleGetApiProductHasEffect('category', nextProps);
        } else {
          this.handleGetApiProductHasEffect('categoryGroup', nextProps);
        }
      }

      if (nextProps.params.urlKeyCategory) {
        if (this.props.params.urlKeyCategory !== nextProps.params.urlKeyCategory) {
          this.handleGetApiProductHasEffect('category', nextProps);
        }
      } else {
        if (this.props.params.urlKeyCategoryGroup !== nextProps.params.urlKeyCategoryGroup) {
          this.handleGetApiProductHasEffect('categoryGroup', nextProps);
        } else if (this.props.params.urlKeyCategory !== nextProps.params.urlKeyCategory) {
          this.handleGetApiProductHasEffect('categoryGroup', nextProps);
        }
      }

      if (this.props.params.urlKeyCategoryGroup !== nextProps.params.urlKeyCategoryGroup || this.props.params.urlKeyCategory !== nextProps.params.urlKeyCategory) {
        if (nextProps.dataBreadCrumb.length > 0) {
          this.handleMenuItemCurrent(nextProps.dataBreadCrumb);
        }
      }

    }

  }

  filterPrice(option) {
    this.props.actions.filterOrderPrice(this.props.routing, option);
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-9 col-md-8 pull-right main_lists">
          <h2 className="main_lists_title">{ this.state.itemMenuCurrent.name }</h2>
          <div className="main_lists_group-btn">
            <button onClick={ this.filterPrice.bind(this, 'desc') } className="btn-default pull-left">Giá cao nhất</button>
            <button onClick={ this.filterPrice.bind(this, 'asc') } className="btn-default pull-left">Giá thấp nhất</button>
          </div>
          <div className="row">
            { this.state.dataListProduct.length > 0
              ? <ListProduct dataItemProduct={ this.state.dataListProduct } dataCategoryGroup={ this.state.dataCategoryGroup } />
              : '' }
          </div>
          { this.state.dataListProduct.length > 0 ?
            <Pagination routing={ this.props.routing } searchMenuCategory={ this.props.searchMenuCategory } dataPaginate={ this.state.dataPaginate } actions={ this.props.actions } params={ this.props.params }
            />
            :
            '' }
        </div>
        <LeftMenuListProduct actions={ this.props.actions } routing={ this.props.routing } dataCategoryGroup={ this.props.dataCategoryGroup } itemMenuCurrent={ this.state.itemMenuCurrent } params={ this.props.params }
        />
      </div>
    )
  }

}

let mapRedux = new ReactBase.helpers.mapRedux({
  actions: actions,
  bindActionCreators: bindActionCreators
});

export default connect(mapRedux.mapStateToProps, mapRedux.mapDispatchToProps)(BodyPageListProduct);
