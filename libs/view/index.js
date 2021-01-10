import React from 'react';
import PropTypes from 'prop-types';

/**
 * 透传ref
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */
const View = React.forwardRef((props, ref) => {
  const classNames = [];
  const { show = true, className = '', children } = props;
  const mixed = { style: { ...children.props.style, ref } };
  if (!show) mixed.style.display = 'none';
  if (children.props.className) classNames.push(children.props.className);
  if (className) classNames.push(className);
  mixed.className = classNames.join(' ');
  return React.cloneElement(React.Children.only(children), mixed);
})

/* eslint-disable */
View.propTypes = {
  show: PropTypes.any,
};
/* eslint-enable */

View._typeName = 'View';
export default View
