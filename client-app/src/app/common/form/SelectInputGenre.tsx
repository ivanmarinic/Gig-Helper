import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Select, Label } from "semantic-ui-react";
import { Genre } from "../../models/genre";


interface IProps
  extends FieldRenderProps<Genre, HTMLElement>,
    FormFieldProps {}

export const SelectInput: React.FC<IProps> = ({
  input,
  width,
  options,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <Select
        value={input.value}
        onChange={(e, data) => input.onChange(data.value)}
        placeholder={placeholder}
        options={options}
        search
        selection
        fluid
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};
