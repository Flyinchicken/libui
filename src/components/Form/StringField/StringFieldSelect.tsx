import React from 'react';

import type { StringFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { Label } from '../../Label/Label.js';
import { Select } from '../../Select/Select.js';
import { FieldGroup } from '../FieldGroup/FieldGroup.js';
import { type BaseFieldComponentProps } from '../types.js';

export type StringFieldSelectProps<T extends string = string> = Simplify<
  BaseFieldComponentProps<T> & Extract<StringFormField<T>, { options: object }>
>;

export const StringFieldSelect = <T extends string = string>({
  description,
  error,
  label,
  name,
  options,
  readOnly,
  setValue,
  value
}: StringFieldSelectProps<T>) => {
  return (
    <FieldGroup>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <Select name={name} value={value ?? ''} onValueChange={(value: T) => setValue(value)}>
        <Select.Trigger data-cy={`${name}-select-trigger`} data-testid={`${name}-select-trigger`} disabled={readOnly}>
          <Select.Value />
        </Select.Trigger>
        <Select.Content data-cy={`${name}-select-content`} data-testid={`${name}-select-content`}>
          {Object.keys(options).map((option) => (
            <Select.Item key={option} value={option}>
              {options[option as T]}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
