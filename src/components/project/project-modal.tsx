import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '@apollo/react-hoc';
import moment from 'moment';

// import { FaUserCircle } from 'react-icons/fa';
// import { MdTurnedInNot, MdTurnedIn, MdShare } from 'react-icons/md';

import Button from '@atlaskit/button';
import ModalDialog, { ModalFooter, ModalTransition } from '@atlaskit/modal-dialog';
import Form, { Field, ErrorMessage, CheckboxField } from '@atlaskit/form';
import { Checkbox } from '@atlaskit/checkbox';
import Textfield from '@atlaskit/textfield';
import { DatePicker } from '@atlaskit/datetime-picker';
import Tag from '@atlaskit/tag';
import TagGroup from '@atlaskit/tag-group';
import TextArea from '@atlaskit/textarea';
import Select from '@atlaskit/select';
// editor breaks build ???
// import { Editor } from '@atlaskit/editor-core';

import { isProjectCreationOpen } from '@store/ui/ui.selectors';
import { toggleProjectCreationModal } from '@store/ui/ui.actions';
import { ProjectTypes } from '@environment/constants';

import gql from 'graphql-tag';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}
const inputProps = { autoComplete: 'off' };
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
  state: { error: any; projectTags: string[] } = {
    projectTags: [],
    error: undefined
  };

  addTag = (tag: string) => {
    if (this.state.projectTags.includes(tag)) {
      return;
    }
    this.setState({ projectTags: [...this.state.projectTags, tag] });
  };
  removeTag = (tag: string) => {
    this.setState({ projectTags: this.state.projectTags.filter(t => t !== tag) });
  };

  onClose = () => toggleProjectCreationModal(false);

  onFormSubmit = async ({ title, privateProject, startDate, endDate, projectType, description, tag, event }) => {
    const { projectTags } = this.state;
    const { addProject } = this.props;
    try {
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
            tags: tag !== '' ? [...projectTags, tag] : projectTags
          }
        }
      });
      this.onClose();
      console.log(data);
    } catch (err) {
      this.setState({ error: err });
      console.error(err);
    }
  };
  footer = () => (
    <ModalFooter>
      <Button onClick={this.onClose}>Cancel</Button>
      <span />
      <Button appearance="primary" type="submit">
        Submit
      </Button>
    </ModalFooter>
  );
  render() {
    const { projectTags, error } = this.state;
    const { isOpen } = this.props;
    return (
      <ModalTransition>
        {isOpen && (
          <ModalDialog
            shouldCloseOnOverlayClick={false}
            components={{
              // eslint-disable-next-line react/display-name
              Container: ({ children, className }: ContainerProps) => (
                <Form
                  onSubmit={(event: any) => {
                    console.log(event);
                    // if (event.key === 13) {
                    //   event.preventDefault();
                    //   return;
                    // }
                    return this.onFormSubmit(event);
                  }}
                >
                  {({ formProps }) => (
                    <form {...formProps} className={className}>
                      {children}
                    </form>
                  )}
                </Form>
              ),
              Footer: this.footer
            }}
            heading="Add Project"
            onClose={this.onClose}
          >
            {error && <ErrorMessage>An error has happened. poop.</ErrorMessage>}

            {/* title */}
            <Field label="Title" name="title" defaultValue="" isRequired>
              {({ fieldProps }) => <Textfield {...inputProps} {...fieldProps} />}
            </Field>

            {/* startDate */}
            <Field label="Start Date" name="startDate" defaultValue={new Date().toISOString()} isRequired>
              {({ fieldProps }) => <DatePicker {...fieldProps} />}
            </Field>

            {/* endDate */}
            <Field
              label="End Date"
              name="endDate"
              defaultValue={moment()
                .add(30, 'days')
                .toISOString()}
              isRequired
            >
              {({ fieldProps }) => <DatePicker {...fieldProps} />}
            </Field>

            {/* project type */}
            <Field label="Project Type" name="projectType" isRequired>
              {({ fieldProps }) => (
                <Select
                  {...inputProps}
                  className="single-select"
                  classNamePrefix="react-select"
                  options={ProjectTypes}
                  onChange={value => {
                    fieldProps.onChange((value as any).value);
                  }}
                  onBlur={fieldProps.onBlur}
                  onFocus={fieldProps.onFocus}
                  placeholder="Select Project Type"
                />
              )}
            </Field>

            {/* description */}
            <Field label="Description" name="description" isRequired>
              {({ fieldProps }) => {
                return (
                  <TextArea
                    {...inputProps}
                    isDisabled={fieldProps.isDisabled}
                    isRequired={fieldProps.isRequired}
                    name={fieldProps.name}
                    onBlur={fieldProps.onBlur}
                    onFocus={fieldProps.onFocus}
                    onChange={event => {
                      fieldProps.onChange(event.target ? event.target.value : '');
                    }}
                  />
                );
              }}
            </Field>

            {/* <Editor appearance="full-width" /> */}
            {/* coverImages */}
            {/* tags */}
            <Field label="Tags" name="tag" defaultValue="">
              {({ fieldProps }) => (
                <Textfield
                  {...inputProps}
                  {...fieldProps}
                  onKeyPress={event => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      this.addTag(event.target && (event.target as any).value);
                      fieldProps.value = '';
                      return;
                    }
                  }}
                />
              )}
            </Field>
            <TagGroup>
              {projectTags.map(tag => (
                <Tag
                  key={tag}
                  text={tag}
                  color="standard"
                  removeButtonText="Remove"
                  appearance="rounded"
                  onBeforeRemoveAction={() => {
                    this.removeTag(tag);
                    return false;
                  }}
                />
              ))}
            </TagGroup>

            {/* collaborators */}
            {/* location */}
            {/* event */}
            <Field label="Event" name="event" defaultValue="">
              {({ fieldProps }) => <Textfield {...inputProps} {...fieldProps} />}
            </Field>

            <CheckboxField name="privateProject">
              {({ fieldProps }) => <Checkbox {...fieldProps} value="" label="Private Project" />}
            </CheckboxField>
            {/* metric section */}
          </ModalDialog>
        )}
      </ModalTransition>
    );
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
