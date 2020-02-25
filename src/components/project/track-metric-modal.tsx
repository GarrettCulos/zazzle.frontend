import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '@apollo/react-hoc';

import Button from '@atlaskit/button';
import ModalDialog, { ModalFooter, ModalTransition } from '@atlaskit/modal-dialog';
import Form, { Field, ErrorMessage } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
import { DatePicker } from '@atlaskit/datetime-picker';

import gql from 'graphql-tag';

const inputProps = { autoComplete: 'off' };
const ADD_METRIC = gql`
  mutation addMetrics($projectId: String, $metrics: [MetricInput]) {
    addMetrics(projectId: $projectId, metrics: $metrics) {
      metrics {
        value
        date
        key
      }
    }
  }
`;

interface AddMetricInterface {
  isOpen: boolean;
  toggleModal: Function;
  projectId: any;
  metricTemplate: any;
  addMetric?: any;
}
class AddMetricModal extends React.Component<AddMetricInterface> {
  state: { error: any; isDisabled: boolean } = {
    error: undefined,
    isDisabled: false
  };

  onClose = () => this.props.toggleModal(false);

  onFormSubmit = async ({ value, date }) => {
    const { addMetric, projectId, metricTemplate } = this.props;
    try {
      if (metricTemplate.type === 'number' && isNaN(parseInt(value))) {
        this.setState({ error: 'Value entered must be a number' });
        return;
      }
      this.setState({ isDisabled: true });
      console.log([{ value, date, key: metricTemplate.key }]);
      await addMetric({
        variables: {
          projectId: projectId,
          metrics: [{ value, date, key: metricTemplate.key }]
        }
      });
      this.setState({ isDisabled: false });
      this.onClose();
      // push to local storage
    } catch (err) {
      this.setState({ error: err, isDisabled: false });
      console.error(err);
    }
  };

  render() {
    const { isDisabled, error } = this.state;
    const { isOpen, metricTemplate } = this.props;
    return (
      <ModalTransition>
        {isOpen && (
          <ModalDialog
            shouldCloseOnOverlayClick={false}
            heading={`Add Data for ${metricTemplate.name}`}
            onClose={this.onClose}
          >
            <Form isDisabled={isDisabled} onSubmit={this.onFormSubmit}>
              {({ formProps }) => (
                <form {...formProps}>
                  {error && <ErrorMessage>An error has happened. poop.</ErrorMessage>}
                  {/* value */}

                  {metricTemplate.type === 'date' ? (
                    <Field label="Value" name="value" isRequired>
                      {({ fieldProps }) => <DatePicker {...fieldProps} />}
                    </Field>
                  ) : (
                    <Field label="Value" name="value" isRequired>
                      {({ fieldProps }) => (
                        <Textfield
                          {...inputProps}
                          {...fieldProps}
                          onChange={value => {
                            fieldProps.onChange((value.target as any).value);
                          }}
                        />
                      )}
                    </Field>
                  )}
                  {/* date */}
                  <Field label="Start Date" name="date" defaultValue={new Date().toISOString()} isRequired>
                    {({ fieldProps }) => <DatePicker {...fieldProps} />}
                  </Field>
                  <ModalFooter>
                    <Button onClick={this.onClose}>Cancel</Button>
                    <span />
                    <Button appearance="primary" type="submit">
                      Add
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
const mapStatsToProps = () => ({});
const mapDispatchToProps = {};
export const AddMetric = graphql<AddMetricInterface, any>(ADD_METRIC, { name: 'addMetric' })(
  connect(mapStatsToProps, mapDispatchToProps)(AddMetricModal)
);
