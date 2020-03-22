import React, { useCallback, useEffect, useState } from 'react';
import useDebounce from '@hooks/onDebounce';
import styled from 'styled-components';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { MdClose } from 'react-icons/md';
import IconButton from '../../atomic/icon-button';
import Button from '../../atomic/button';

interface ProjectMetricFormInterface {
  onChange?: Function;
  isValid?: Function;
  data?: any[];
}

const theme = createMuiTheme({
  typography: {
    fontFamily: 'var(--font-family)',
    fontSize: 13
  }
});

const MetricActionRow = styled.div`
  display: flex;
  align-items: center;
  padding-top: 16px;
`;

const FlexForm = styled.form`
  display: flex;
  padding: 10px 0;
  flex-direction: column;
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
`;

export const ProjectMetricForm: React.FC<ProjectMetricFormInterface> = ({
  data = [{ type: '', name: '', description: '', key: `template-0` }],
  onChange,
  isValid
}: ProjectMetricFormInterface) => {
  const [metricTemplates, setForm]: [any[], Function] = useState(data);
  const templateChange = useCallback(
    (key, field, value) => {
      setForm(
        metricTemplates.map(temp => {
          if (temp.key === key) {
            temp[field] = value;
          }
          return temp;
        })
      );
    },
    [setForm, metricTemplates]
  );

  const addMetricTemplate = useCallback(() => {
    setForm([...metricTemplates, { type: '', name: '', description: '', key: `template-${metricTemplates.length}` }]);
  }, [setForm, metricTemplates]);

  const removeMetricTemplate = useCallback(
    key => {
      setForm(metricTemplates.filter(template => template.key !== key));
    },
    [setForm, metricTemplates]
  );

  const formDebounce = useDebounce(metricTemplates, 250);
  useEffect(() => {
    if (isValid) {
      isValid(true);
    }
    if (onChange) {
      onChange(formDebounce);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formDebounce]);

  return (
    <ThemeProvider theme={theme}>
      <FlexForm noValidate autoComplete="off">
        <p>Gain insight into how your project is going by tracking key metrics.</p>
        {metricTemplates.map((template, index) => (
          <FormRow key={template.key}>
            <TextField
              style={{ flex: 1, marginRight: '10px' }}
              margin="dense"
              id={`type__${template.key}`}
              label="Select Metric Type"
              value={template.type}
              onChange={data => {
                templateChange(template.key, 'type', data.target.value);
              }}
              variant="outlined"
              select
              required
            >
              {[
                { key: 'String', value: 'string' },
                { key: 'Number', value: 'number' },
                { key: 'Date', value: 'date' }
              ].map(option => (
                <MenuItem key={option.key} value={option.value}>
                  {option.key}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              style={{ flex: 1, marginRight: '10px' }}
              id={`name__${template.key}`}
              margin="dense"
              label="Name"
              variant="outlined"
              onChange={data => templateChange(template.key, 'name', data.target.value)}
            />
            <TextField
              style={{ flex: 2 }}
              id={`description__${template.key}`}
              margin="dense"
              label="Description"
              variant="outlined"
              onChange={data => templateChange(template.key, 'description', data.target.value)}
            />
            <IconButton onClick={() => removeMetricTemplate(template.key)}>
              <MdClose />
            </IconButton>
          </FormRow>
        ))}
        <MetricActionRow>
          <div style={{ flex: 1 }} />
          <Button onClick={addMetricTemplate}>Add Metric</Button>
        </MetricActionRow>
      </FlexForm>
    </ThemeProvider>
  );
};
