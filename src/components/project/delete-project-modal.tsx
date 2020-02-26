import React from 'react';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/react-hoc';

import ModalDialog, { ModalTransition } from '@atlaskit/modal-dialog';

const REMOVE_PROJECT = gql`
  mutation removeProject($projectId: String) {
    removeProject(projectId: $projectId)
  }
`;

interface RemoveProjectInterface {
  isOpen: boolean;
  toggleModal: Function;
  projectId: any;
  removeProject?: any;
}
class RemoveProjectModal extends React.Component<RemoveProjectInterface> {
  state: { isDisabled: boolean } = { isDisabled: false };
  onClose = () => this.props.toggleModal(false);
  removeProject = async () => {
    const { projectId, removeProject } = this.props;
    try {
      this.setState({ isDisabled: true });
      await removeProject({
        variables: {
          projectId: projectId
        }
      });
      this.onClose();
    } catch (err) {
      this.setState({ isDisabled: false });
      console.log(err);
    }
  };

  render() {
    const { isOpen } = this.props;
    const { isDisabled } = this.state;
    return (
      <ModalTransition>
        {isOpen && (
          <ModalDialog
            shouldCloseOnOverlayClick={false}
            heading={`Remove Project`}
            appearance="warning"
            onClose={this.onClose}
            actions={[
              { text: 'Cancel', appearance: 'default', onClick: this.onClose },
              { text: 'Delete Project', appearance: 'warning', isDisabled: isDisabled, onClick: this.removeProject }
            ]}
          >
            Are you sure? <br /> This action cannot be undone.
          </ModalDialog>
        )}
      </ModalTransition>
    );
  }
}

export const RemoveProject = graphql<RemoveProjectInterface, any>(REMOVE_PROJECT, { name: 'removeProject' })(
  RemoveProjectModal
);
