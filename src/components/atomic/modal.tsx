import React from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: rgba(12, 12, 12, 0.91);
`;
// These two containers are siblings in the DOM
const modalRoot: HTMLElement | null = document.getElementById('modal-root');

interface ModalInterface {
  children: any;
  onClose: Function;
  maxWidth?: string;
}

class Modal extends React.Component<ModalInterface> {
  el: HTMLDivElement;
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
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
    if (modalRoot) {
      this._toggleBodyScroll('off');
      modalRoot.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    this.props.onClose();
    if (modalRoot) {
      this._toggleBodyScroll('on');
      modalRoot.removeChild(this.el);
    }
  }

  _toggleBodyScroll(state: 'on' | 'off') {
    if (state === 'off') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

const ModalComponent: React.FC<ModalInterface> = ({ children, onClose }: ModalInterface) => {
  return (
    <Modal onClose={onClose}>
      <BackDrop />
      {children}
    </Modal>
  );
};
export default ModalComponent;
