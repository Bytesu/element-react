import React, {Component} from 'react';
import ReactDOM from 'react-dom';
const portalRoot = document.getElementById('portal-root');

export class MountBody extends Component {
  UNSAFE_componentWillMount() {
    let c = React.cloneElement(this.props.children)
    this.tnode = document.createElement('div')
  }

  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    portalRoot.appendChild(this.tnode);
  }

  UNSAFE_componentWillUnmount() {
    portalRoot.removeChild(this.tnode)
  }

  contains(evt){
    let parent = this.tnode.childNodes[0]
    let rect = parent.getBoundingClientRect()
    let isContain = (evt.clientX >= rect.left && evt.clientX <= rect.right) && (evt.clientY >= rect.top && evt.clientY <= rect.bottom )
    return isContain
  }

  render(){
    return ReactDOM.createPortal(
      this.props.children,
      this.tnode
    );
  }
}
