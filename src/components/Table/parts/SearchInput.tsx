import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';

type SearchInputProps = {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
};

export const SearchInput: React.FC<TextFieldProps & SearchInputProps> = ({
  onChange,
  debounce,
  value: initialValue,
  ...props
}) => {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <TextField
      {...props}
      size="small"
      placeholder="Search by all columns"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
