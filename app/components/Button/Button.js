import React from 'react';
import PropTypes from 'prop-types';
import 'toastr/build/toastr.min.css';

class Button extends React.Component {
  render() {
    return (
      <input
        style={{ marginTop: this.props.marginTop ? this.props.marginTop : '0px' }}
        type="submit"
        value={this.props.label}
        className="btn btn-default"
        onClick={(event) => this.props.onClick(event)}
      />
    );
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  marginTop: PropTypes.string,
};

export default Button;
