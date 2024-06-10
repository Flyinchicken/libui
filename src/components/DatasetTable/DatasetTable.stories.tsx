import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import DatasetTable, { type DatasetTableProps, type TabularDataset } from './DatasetTable.js';

const meta: Meta<typeof DatasetTable> = {
  component: DatasetTable,
  decorators: [
    (Story) => (
      <div className="h-full w-full p-12">
        <Story />
      </div>
    )
  ]
};

export default meta;

const mockDataset: TabularDataset = {
  columnIds: {
    Col1: 'columnId1',
    Col2: 'columnId2',
    Col3: 'columnId3',
    Col4: 'columnId4',
    Col5: 'columnId5'
  },
  columns: ['Col1', 'Col2', 'Col3', 'Col4', 'Col5'],
  createdAt: new Date(),
  description: 'A sample dataset',
  id: 'ds001',
  license: 'PUBLIC',
  managerIds: ['wowowow111'],
  metadata: {
    Col1: {
      nullable: false,
      summary: {
        count: 5
      },
      type: 'string'
    },

    Col2: {
      nullable: false,
      summary: {
        count: 5
      },
      type: 'string'
    },
    Col3: {
      nullable: false,
      summary: {
        count: 5
      },
      type: 'string'
    },
    Col4: {
      nullable: false,
      summary: {
        count: 5
      },
      type: 'string'
    },
    Col5: {
      nullable: false,
      summary: {
        count: 5
      },
      type: 'string'
    }
  },
  name: 'Dataset 001',
  primaryKeys: ['Col1', 'Col2'],
  rows: [
    {
      Col1: '1',
      Col2: '1',
      Col3: '1',
      Col4: '1',
      Col5: '1'
    },
    {
      Col1: '2',
      Col2: '2',
      Col3: '2',
      Col4: '2',
      Col5: '2'
    },
    {
      Col1: '3',
      Col2: '3',
      Col3: '3',
      Col4: '3',
      Col5: '3'
    },
    {
      Col1: '4',
      Col2: '4',
      Col3: '4',
      Col4: '4',
      Col5: '4'
    },
    {
      Col1: '5',
      Col2: '5',
      Col3: '5',
      Col4: '5',
      Col5: '5'
    }
  ],
  updatedAt: new Date()
};

const nonManagerDatasetTableProps: DatasetTableProps = {
  isManager: false,
  ...mockDataset
};

const managerDatasetTableProps: DatasetTableProps = {
  isManager: true,
  ...mockDataset
};

export const Default: StoryObj<typeof DatasetTable> = {
  args: managerDatasetTableProps
};

export const NonManagerDatasetTable: StoryObj<typeof DatasetTable> = {
  args: nonManagerDatasetTableProps
};
