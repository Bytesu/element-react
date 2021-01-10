import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const classNameFn = (props, ...args) => {
  const { className } = props;
  return classnames.apply(this, args.concat([className]));
}

export const styleFn = (props, ...args) => {
  const { style } = props;
  return Object.assign({}, args, style)
}

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.domRef = React.createRef();
    this.state = {}
  }

  genDomRef() {
    return this.domRef;
  }

  classNames(...args) {
    return classnames(args);
  }

  className(...args) {
    const { className } = this.props;
    return this.classNames.apply(this, args.concat([className]));
  }

  style(args) {
    const { style } = this.props;
    return Object.assign({}, args, style)
  }
}

Component.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
};
