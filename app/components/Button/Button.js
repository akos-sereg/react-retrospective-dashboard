import React from 'react';
import PropTypes from 'prop-types';
import 'toastr/build/toastr.min.css';
import './style.scss';

class Button extends React.Component {
  render() {
    const classNames = ['btn', 'btn-default'];
    if (this.props.float) {
      classNames.push(this.props.float === 'left' ? 'button-wrapper-left' : 'button-wrapper-right');
    }
    return (
      <input
        style={{ marginTop: this.props.marginTop ? this.props.marginTop : '0px' }}
        type="submit"
        value={this.props.label}
        className={classNames.join(' ')}
        onClick={(event) => this.props.onClick(event)}
      />
    );
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  marginTop: PropTypes.string,
  float: PropTypes.string,
};

export default Button;
