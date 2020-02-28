import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '@apollo/react-hoc';
import { gql } from '@apollo/client';
import { MdAdd } from 'react-icons/md';
import moment from 'moment';

// import { FaUserCircle } from 'react-icons/fa';
// import { MdTurnedInNot, MdTurnedIn, MdShare } from 'react-icons/md';

import Button from '@atlaskit/button';
import ModalDialog, { ModalFooter, ModalTransition } from '@atlaskit/modal-dialog';
import Form, { Field, Fieldset, ErrorMessage, CheckboxField } from '@atlaskit/form';
import { Checkbox } from '@atlaskit/checkbox';
import Textfield from '@atlaskit/textfield';
import { DatePicker } from '@atlaskit/datetime-picker';
import Tag from '@atlaskit/tag';
import TextArea from '@atlaskit/textarea';
import Select from '@atlaskit/select';
import { InputButton } from '../atomic/input-button';
// editor breaks build ???
import { Editor } from '@atlaskit/editor-core';

import { isProjectCreationOpen } from '@store/ui/ui.selectors';
import { toggleProjectCreationModal } from '@store/ui/ui.actions';
import { ProjectTypes } from '@environment/constants';

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
  state: { error: any; projectTags: string[]; isDisabled: boolean; metricTemplates: any[] } = {
    projectTags: [],
    error: undefined,
    isDisabled: false,
    metricTemplates: []
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

  templateChange = (key, field, value) => {
    this.setState((state: any) => {
      const metricTemplates = state.metricTemplates.map(temp => {
        if (temp.key === key) {
          temp[field] = value;
        }
        return temp;
      });
      return { metricTemplates };
    });
  };

  onClose = () => this.props.toggleProjectCreationModal(false);

  onFormSubmit = async ({ title, privateProject, startDate, endDate, projectType, description, tag, event }) => {
    const { projectTags, metricTemplates } = this.state;
    const { addProject } = this.props;
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
            tags: tag !== '' ? [...projectTags, tag] : projectTags,
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

  addMetricTemplate = () => {
    this.setState((state: any) => ({
      metricTemplates: [
        ...state.metricTemplates,
        { type: '', name: '', description: '', key: `template-${this.state.metricTemplates.length}` }
      ]
    }));
  };

  removeMetricTemplate = key => {
    this.setState((state: any) => ({
      metricTemplates: state.metricTemplates.filter(template => template.key !== key)
    }));
  };

  render() {
    const { projectTags, isDisabled, metricTemplates, error } = this.state;
    const { isOpen } = this.props;
    return (
      <ModalTransition>
        {isOpen && (
          <ModalDialog shouldCloseOnOverlayClick={false} heading="Add Project" onClose={this.onClose}>
            <Form isDisabled={isDisabled} onSubmit={this.onFormSubmit}>
              {({ formProps }) => (
                <form {...formProps}>
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

                  <Editor appearance="comment" />
                  {/* coverImages */}
                  {/* tags */}
                  <Field label="Tags" name="tag" defaultValue="">
                    {({ fieldProps }) => (
                      <Textfield
                        {...inputProps}
                        {...fieldProps}
                        elemAfterInput={
                          <InputButton
                            onClick={event => {
                              console.log(fieldProps);
                              if (fieldProps.value !== '') {
                                this.addTag(fieldProps.value);
                                fieldProps.value = '';
                                (event.target as any).value = '';
                              }
                            }}
                          >
                            <MdAdd />
                          </InputButton>
                        }
                        elemBeforeInput={projectTags.map(tag => (
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
                      />
                    )}
                  </Field>

                  {/* collaborators */}
                  {/* location */}
                  {/* event */}
                  <Field label="Event" name="event" defaultValue="">
                    {({ fieldProps }) => <Textfield {...inputProps} {...fieldProps} />}
                  </Field>

                  <CheckboxField name="privateProject">
                    {({ fieldProps }) => <Checkbox {...fieldProps} value="" label="Private Project" />}
                  </CheckboxField>

                  <p>
                    Use the metric templates to track data, measure improvements, and activity over the lifetime of your
                    project.
                  </p>
                  {/* metric section */}
                  {metricTemplates.map((template, index) => {
                    return (
                      <Fieldset key={template.key} legend={`Metric Template ${index + 1}`}>
                        <Field label="Type" name={`type__${template.key}`} isRequired>
                          {({ fieldProps }) => (
                            <Select
                              {...inputProps}
                              className="single-select"
                              classNamePrefix="react-select"
                              options={[
                                { label: 'String', key: 'string' },
                                { label: 'Number', key: 'number' },
                                { label: 'Date', key: 'date' }
                              ]}
                              onChange={value => {
                                fieldProps.onChange((value as any).key);
                                this.templateChange(template.key, 'type', (value as any).key);
                              }}
                              onBlur={fieldProps.onBlur}
                              onFocus={fieldProps.onFocus}
                              placeholder="Select Metric Type"
                            />
                          )}
                        </Field>
                        <Field label="Name" name={`name__${template.key}`} isRequired>
                          {({ fieldProps }) => (
                            <Textfield
                              {...inputProps}
                              {...fieldProps}
                              onChange={value => {
                                fieldProps.onChange((value.target as any).value);
                                this.templateChange(template.key, 'name', (value.target as any).value);
                              }}
                            />
                          )}
                        </Field>
                        <Field label="Description" name={`description__${template.key}`} isRequired>
                          {({ fieldProps }) => (
                            <Textfield
                              {...inputProps}
                              {...fieldProps}
                              onChange={value => {
                                fieldProps.onChange((value.target as any).value);
                                this.templateChange(template.key, 'description', (value.target as any).value);
                              }}
                            />
                          )}
                        </Field>
                        <Button appearance="subtle" onClick={() => this.removeMetricTemplate(template.key)}>
                          Remove Template
                        </Button>
                      </Fieldset>
                    );
                  })}
                  <Button onClick={this.addMetricTemplate}>Add Metric Template</Button>

                  <ModalFooter>
                    <Button onClick={this.onClose}>Cancel</Button>
                    <span />
                    <Button appearance="primary" type="submit">
                      Submit
                    </Button>
                  </ModalFooter>
                </form>
              )}
            </Form>
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
