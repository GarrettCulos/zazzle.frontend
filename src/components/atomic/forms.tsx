import 'date-fns';
import React from 'react';
import styled from 'styled-components';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

type MaterialUiPickersDate = any;
interface DatePickerInterface {
  format: string;
  id: string;
  label: string;
  value?: Date;
  required?: boolean;
  onChange: (date: MaterialUiPickersDate, value?: string | null | undefined) => void;
}
const PickerStyle = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.21);
  border-radius: 4px;
  position: relative;
  margin: 10px 0;
  margin-top: 16px;
  padding: 0 0 10px 14px;
  &:hover {
    border-color: rgba(0, 0, 0, 0.84);
  }
  &:focus {
    outline: none;
  }
  .MuiInputLabel-shrink {
    padding: 0 5px;
  }
  .MuiInputLabel-formControl {
    left: 10px;
    top: -8px;
    background-color: white;
  }
  label + .MuiInput-formControl {
    margin-top: 10px;
  }
  .MuiTextField-root {
    position: unset;
    margin: 0;
    .MuiInput-underline:after,
    .MuiInput-underline:before {
      border: none !important;
    }
  }
`;
export const DatePicker: React.FC<DatePickerInterface> = ({
  format,
  id,
  label,
  value,
  onChange,
  required
}: DatePickerInterface) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <PickerStyle>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format={format}
        margin="normal"
        id={id}
        required={required}
        label={label}
        value={value}
        onChange={onChange}
        KeyboardButtonProps={{
          'aria-label': 'change date'
        }}
      />
    </PickerStyle>
  </MuiPickersUtilsProvider>
);
