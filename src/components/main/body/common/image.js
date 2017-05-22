import React, { Component } from 'react';

import config from '../../../../config/index';

class Image extends Component {

  constructor(props) {
    super(props);
    this.state = {
      linkImage: '',
      height: ''
    }
  }

  componentWillMount() {
    this.setState({
      linkImage: this.props.linkImage
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.setHeight.bind(this));
    this.setHeight();
  }

  setHeight() {
    let width = this.refs.imageSize.offsetWidth - 5;
    this.setState({
      height: width
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setHeight.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      linkImage: this.props.linkImage
    });
    this.setHeight();
  }

  render() {

    return (
      <img style={ { height: this.state.height } } ref="imageSize" src={ `${config.cdn.link}${this.state.linkImage}` } className="img-responsive" alt="" />
      );

  }

}

Image.propTypes = {
  name: React.PropTypes.string
};

export default Image;