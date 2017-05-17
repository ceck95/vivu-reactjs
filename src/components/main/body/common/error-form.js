import React, { Component } from 'react';

class ErrorForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
  }

  componentWillMount() {
    this.setState({
      message: this.props.message
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      message: nextProps.message
    });
  }

  render() {

    return (
      <span className="require error required">{ this.state.message }</span>
      );

  }

}

ErrorForm.propTypes = {
  message: React.PropTypes.string
};

export default ErrorForm;