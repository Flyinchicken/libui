import type {
  BooleanFormField,
  DateFormField,
  EnumFormField,
  NumberFormField,
  PrimitiveFieldValue,
  TextFormField
} from '@douglasneuroinformatics/libui-form-types';

import { BooleanField, type BooleanFieldProps } from './BooleanField';
import { DateField, type DateFieldProps } from './DateField';
import { EnumField, type EnumFieldProps } from './EnumField';
import { NumberField, type NumberFieldProps } from './NumberField';
import { TextField, type TextFieldProps } from './TextField';

import type { BaseFieldComponentProps } from './types';

export type PrimitiveFieldProps = BaseFieldComponentProps<PrimitiveFieldValue> & {
  field: BooleanFormField | DateFormField | EnumFormField | NumberFormField | TextFormField;
};

export const PrimitiveField = ({ field, ...props }: PrimitiveFieldProps) => {
  switch (field.kind) {
    case 'text':
      return <TextField {...field} {...(props as TextFieldProps)} />;
    case 'number':
      return <NumberField {...field} {...(props as NumberFieldProps)} />;
    case 'enum':
      return <EnumField {...field} {...(props as EnumFieldProps)} />;
    case 'date':
      return <DateField {...field} {...(props as DateFieldProps)} />;
    case 'boolean':
      return <BooleanField {...field} {...(props as BooleanFieldProps)} />;
  }
};
