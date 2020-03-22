import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '@apollo/react-hoc';
import { gql } from '@apollo/client';

import { ProjectFlow } from './create/project-flow';

import { isProjectCreationOpen } from '@store/ui/ui.selectors';
import { toggleProjectCreationModal } from '@store/ui/ui.actions';

const ADD_PROJECT = gql`
  mutation addProject($project: CreateProjectInput) {
    addProject(project: $project) {
      id
      user {
        id
        userName
        userIcon
      }
      title
      description
      projectType
      coverImages
      likedBy {
        userName
      }
      followCount
      updatedAt
      collaborators {
        id
        userName
        userIcon
      }
    }
  }
`;

interface ProjectModalBaseInterface {
  isOpen: boolean;
  toggleProjectCreationModal: Function;
  addProject: any;
}
class ProjectModalBase extends React.Component<ProjectModalBaseInterface> {
  state: { error: any; isDisabled: boolean } = {
    error: undefined,
    isDisabled: false
  };

  onClose = () => this.props.toggleProjectCreationModal(false);

  onFormSubmit = async ({
    title,
    metricTemplates,
    privateProject,
    startDate,
    endDate,
    projectType,
    description,
    tag,
    event
  }) => {
    const { addProject } = this.props;
    console.log({
      title,
      metricTemplates,
      privateProject,
      startDate,
      endDate,
      projectType,
      description,
      tag,
      event
    });
    try {
      this.setState({ isDisabled: true });
      const data = await addProject({
        variables: {
          project: {
            title,
            projectType,
            private: privateProject,
            description,
            startDate,
            endDate,
            event: event !== '' ? event : undefined,
            tags: tag,
            metricTemplates: metricTemplates ? metricTemplates : []
          }
        }
      });
      this.setState({ isDisabled: false });
      this.onClose();
      // push to local storage
      console.log(data);
    } catch (err) {
      this.setState({ error: err, isDisabled: false });
      console.error(err);
    }
  };

  render() {
    return <ProjectFlow onSubmit={this.onFormSubmit} />;
  }
}
const mapStatsToProps = state => ({
  isOpen: isProjectCreationOpen(state)
});
const mapDispatchToProps = {
  toggleProjectCreationModal
};
export const ProjectModal = graphql(ADD_PROJECT, { name: 'addProject' })(
  connect(mapStatsToProps, mapDispatchToProps)(ProjectModalBase)
);
