import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox.js';

type Story = StoryObj<typeof Checkbox>;

export default { component: Checkbox, tags: ['autodocs'] } as Meta<typeof Checkbox>;

export const Default: Story = {
  decorators: [
    (Story) => {
      return (
        <div className="flex items-center space-x-2">
          <Story
            args={{
              onCheckedChange: (checked) => {
                alert(`checked: ${checked}`);
              }
            }}
            id="terms"
          />
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="terms"
          >
            Accept terms and conditions
          </label>
        </div>
      );
    }
  ]
};
