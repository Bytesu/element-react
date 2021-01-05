/* @flow */

import React, {useContext, useImperativeHandle, useRef, useState} from 'react';
import Popper from 'popper.js';
import {Transition, View} from '../../libs';
import {ParentContext} from './ParentContext'
import {classNameFn, styleFn} from '../../libs/component/'

type State = {
  showPopper: boolean
};

const DropdownMenu = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const _ref = useRef(null);
  const self = this;
  var popperJS = null;
  const parent = useContext(ParentContext);
  const onEnter = (): void => {
    const parent = parent.parentDomRef.current;//ReactDOM.findDOMNode(context);
    popperJS = new Popper(parent, _ref.current, {
      placement: `bottom-${parent.menuAlign}`,
      modifiers: {
        computeStyle: {
          gpuAcceleration: false
        }
      }
    })
  }
  // const ref1 =  createRef();
  useImperativeHandle(ref, () => ({
    onVisibleChange: (visible) => {
      setVisible(visible);
    },
    domRef: _ref
  }));

  const onAfterLeave = (): void => {
    popperJS && popperJS.destroy();
  }
  return <Transition
    name="el-zoom-in-top"
    domRef={_ref}
    {...{onEnter, onAfterLeave}}
  >
    <View
      show={visible}
    >
      <ul
        ref={_ref}
        style={styleFn(props)}
        className={classNameFn(props, 'el-dropdown-menu')}
      >
        {props.children}
      </ul>
    </View>
  </Transition>;
})
export default DropdownMenu;
