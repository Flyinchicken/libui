import React from 'react';

import type { NumberFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { Label } from '../../Label/Label.js';
import { Select } from '../../Select/Select.js';
import { FieldGroup } from '../FieldGroup/FieldGroup.js';
import { type BaseFieldComponentProps } from '../types.js';

export type NumberFieldSelectProps<T extends number = number> = Simplify<
  BaseFieldComponentProps<T> & Extract<NumberFormField<T>, { options: object }>
>;

export const NumberFieldSelect = <T extends number = number>({
  description,
  disableAutoPrefix,
  error,
  label,
  name,
  options,
  readOnly,
  setValue,
  value
}: NumberFieldSelectProps<T>) => {
  return (
    <FieldGroup>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <Select name={name} value={value?.toString() ?? ''} onValueChange={(value) => setValue(parseFloat(value) as T)}>
        <Select.Trigger data-cy={`${name}-select-trigger`} data-testid={`${name}-select-trigger`} disabled={readOnly}>
          <Select.Value />
        </Select.Trigger>
        <Select.Content data-cy={`${name}-select-content`} data-testid={`${name}-select-content`}>
          {Object.keys(options).map((option) => {
            // Option needs to be type number (this was a design flaw), but is actually always coerced to string anyways
            const text = (disableAutoPrefix ? '' : `${option} - `) + options[option as any as T];
            return (
              <Select.Item key={option} value={option}>
                {text}
              </Select.Item>
            );
          })}
        </Select.Content>
      </Select>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
