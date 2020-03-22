import React, { useCallback, useEffect, useState } from 'react';
import useDebounce from '@hooks/onDebounce';
import styled from 'styled-components';

import moment from 'moment';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Tag from '@atlaskit/tag';
import { DatePicker } from '../../atomic/forms';
import { ProjectTypes } from '@environment/constants';

interface FormData {
  tags: string[];
  startDate?: Date;
  endDate?: Date;
  title?: string;
  projectType?: string;
  isPrivate?: boolean;
  event?: string;
}

interface BaseFormInterface {
  onChange?: Function;
  isValid?: Function;
  data?: FormData;
}

const theme = createMuiTheme({
  typography: {
    fontFamily: 'var(--font-family)',
    fontSize: 13
  }
});

const FlexForm = styled.form`
  display: flex;
  padding: 10px 0;
  flex-direction: column;
`;
const FormRow = styled.div`
  display: flex;
  & > * {
    margin-right: 16px;
  }
`;

const validate = ({ startDate, endDate, title, projectType }: FormData): boolean =>
  Boolean(startDate !== undefined && endDate !== undefined && title && projectType);

export const ProjectBaseForm: React.FC<BaseFormInterface> = ({
  data = {
    tags: [],
    startDate: new Date(),
    endDate: moment()
      .add(30, 'days')
      .toDate(),
    title: '',
    projectType: '',
    isPrivate: false
  },
  onChange,
  isValid
}: BaseFormInterface) => {
  const [form, setForm]: [FormData, Function] = useState(data);

  const setFormData = useCallback(
    (type: string, data: any) => {
      setForm({ ...form, [type]: data });
    },
    [form, setForm]
  );

  const setTags = useCallback(
    (tags: string[]) => {
      // const uniqueTags = tags.filter(tag => !form.tags.some(t => t === tag));
      setFormData('tags', tags);
    },
    [setFormData]
  );

  const removeTag = useCallback(
    (tag: string) => {
      setFormData(
        'tags',
        form.tags.filter(t => t !== tag)
      );
    },
    [form, setFormData]
  );

  const formDebounce = useDebounce(form, 250);
  useEffect(() => {
    if (isValid) {
      isValid(validate(formDebounce));
    }
    if (onChange) {
      onChange(formDebounce);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formDebounce]);

  return (
    <ThemeProvider theme={theme}>
      <FlexForm noValidate autoComplete="off">
        <p>Provide us with some of the general information regarding your project.</p>
        <TextField
          value={form.title}
          onChange={data => setFormData('title', data.target.value)}
          id="title"
          margin="normal"
          label="Project Title"
          variant="outlined"
          required
        />
        <FormRow>
          <DatePicker
            format="MM/dd/yyyy"
            id="start-date"
            label="Start Date"
            value={form.startDate}
            onChange={(date, value) => setFormData('startDate', value)}
            required
          />
          <DatePicker
            format="MM/dd/yyyy"
            id="end-date"
            label="End Date"
            value={form.endDate}
            onChange={(date, value) => setFormData('endDate', value)}
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(data, val) => setFormData('isPrivate', val)}
                value={data.isPrivate}
                color="primary"
              />
            }
            label="Private Project"
          />
        </FormRow>
        <TextField
          margin="normal"
          id="project-type"
          select
          label="Project Type"
          value={form.projectType}
          onChange={data => {
            setFormData('projectType', data.target.value);
          }}
          helperText="Please select your project type"
          variant="outlined"
          required
        >
          {ProjectTypes.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {/* coverImages */}
        <TextField
          id="tags"
          margin="normal"
          label="Tags"
          variant="outlined"
          helperText="Tags will be parsed as a comma separated list"
          onChange={data => setTags(data.target.value.split(','))}
        />
        <div>
          {form.tags.map(tag => (
            <Tag
              key={tag}
              text={tag}
              color="standard"
              removeButtonText="Remove"
              appearance="rounded"
              onBeforeRemoveAction={() => {
                removeTag(tag);
                return false;
              }}
            />
          ))}
        </div>
        {/* collaborators */}
        {/* location */}
        <TextField
          id="event"
          margin="normal"
          label="Event"
          variant="outlined"
          value={form.event}
          onChange={data => setFormData('event', data.target.value)}
        />
      </FlexForm>
    </ThemeProvider>
  );
};
