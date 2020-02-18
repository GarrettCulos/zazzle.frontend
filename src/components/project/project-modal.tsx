import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
// import { FaUserCircle } from 'react-icons/fa';
// import { MdTurnedInNot, MdTurnedIn, MdShare } from 'react-icons/md';

import Button from '@atlaskit/button';
import ModalDialog, { ModalFooter, ModalTransition } from '@atlaskit/modal-dialog';
import Form, { Field, CheckboxField } from '@atlaskit/form';
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
import { useMutation } from '@apollo/react-hooks';

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

export const ProjectModal: React.FC = () => {
  const dispatch = useDispatch();

  const [projectTags, setTags]: [string[], Function] = useState([]);
  const addTag = useCallback(
    tag => {
      if (projectTags.includes(tag)) {
        return;
      }
      setTags([...projectTags, tag]);
    },
    [projectTags, setTags]
  );
  const removeTag = useCallback(
    tag => {
      setTags(projectTags.filter(t => t !== tag));
    },
    [setTags, projectTags]
  );

  const isOpen = useSelector(isProjectCreationOpen);
  const onClose = useCallback(() => {
    dispatch(toggleProjectCreationModal(false));
  }, [dispatch]);

  const [addProject, { loading, error, data }] = useMutation(ADD_PROJECT);
  if (!loading && !error && data && data.addProject) {
    console.log(data);
    console.log('push data to store if setting in user data');
    onClose();
  }
  const onFormSubmit = useCallback(
    async ({ title, privateProject, startDate, endDate, projectType, description, tag, event }) => {
      addProject({
        variables: {
          project: {
            title,
            projectType,
            private: privateProject,
            description,
            startDate,
            endDate,
            event,
            tags: tag !== '' ? [...projectTags, tag] : projectTags
          }
        }
      });
    },
    [projectTags, addProject]
  );

  const footer = () => (
    <ModalFooter>
      <Button onClick={onClose}>Cancel</Button>
      <span />
      <Button appearance="primary" type="submit">
        Submit
      </Button>
    </ModalFooter>
  );

  return (
    <ModalTransition>
      {isOpen && (
        <ModalDialog
          shouldCloseOnOverlayClick={false}
          components={{
            // eslint-disable-next-line react/display-name
            Container: ({ children, className }: ContainerProps) => (
              <Form onSubmit={onFormSubmit}>
                {({ formProps }: any) => (
                  <form {...formProps} className={className}>
                    {children}
                  </form>
                )}
              </Form>
            ),
            Footer: footer
          }}
          heading="Add Project"
          onClose={onClose}
        >
          {/* title */}
          <Field label="Title" name="title" defaultValue="" isRequired>
            {({ fieldProps }) => <Textfield {...inputProps} {...fieldProps} />}
          </Field>

          <CheckboxField name="privateProject">
            {({ fieldProps }) => <Checkbox {...fieldProps} value="" label="Private Project" />}
          </CheckboxField>

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
          <Field label="Project Type" name="projectType" defaultValue="">
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
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    addTag(fieldProps.value);
                    fieldProps.value = '';
                  }
                }}
                {...fieldProps}
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
                onBeforeRemoveAction={() => {
                  removeTag(tag);
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
          {/* metric section */}
        </ModalDialog>
      )}
    </ModalTransition>
  );
};
