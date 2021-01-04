/* @flow */

import React, {useContext, useImperativeHandle, useRef, useState} from 'react';
import Popper from 'popper.js';
import {Transition, View} from '../../libs';
import {ParentContext} from './DropDown'
import {classNameFn, styleFn} from '../../libs/component/'

type State = {
  showPopper: boolean
};

const DropdownMenu = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const _ref = useRef();
  const self = this;
  var popperJS = null;
  const context = useContext(ParentContext);
  // debugger;
  console.log(context)
  const onEnter = (): void => {
    const parent = context.parentDomRef.current;//ReactDOM.findDOMNode(context);
    popperJS = new Popper(parent, _ref.current, {
      placement: `bottom-${context.menuAlign}`,
      modifiers: {
        computeStyle: {
          gpuAcceleration: false
        }
      }
    });
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
export default function Test(props){

  const context = useContext(ParentContext);
 return <div>
   <div>
     123123
   </div>
   {props.children}</div>
};
