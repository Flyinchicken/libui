import React, { useState } from 'react';

import { toBasicISOString } from '@douglasneuroinformatics/libjs';
import { range } from 'lodash-es';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '../../utils.js';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu.js';
import { Table } from '../Table/Table.js';
import { ClientTablePagination } from './ClientTablePagination.js';

/** Coerces the value in a cell to a string for consistant display purposes */
function defaultFormatter(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  } else if (typeof value === 'number') {
    return value.toFixed(2).toString();
  } else if (typeof value === 'undefined') {
    return 'NA';
  }
  if (value instanceof Date) {
    return toBasicISOString(value);
  }
  return JSON.stringify(value);
}

export type ClientTableEntry = { [key: string]: unknown };

export type ClientFieldFactory<T extends ClientTableEntry = ClientTableEntry> = (entry: T) => string;

export type ClientTableColumn<T extends ClientTableEntry> = {
  /** How to determine the values for column */
  field: ClientFieldFactory<T> | keyof T;

  /** Override the default formatter for this field */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatter?: (value: any) => string;

  /** The label to be displayed on the header */
  label: string;
};

export type ClientTableDropdownOptions<T extends ClientTableEntry> = {
  icon?: React.ComponentType<Omit<React.SVGProps<SVGSVGElement>, 'ref'>>;
  label: string;
  onSelection: (column: ClientTableColumn<T>) => void;
}[];

export type ClientTableColumnProps<T extends ClientTableEntry> = {
  column: ClientTableColumn<T>;
  dropdownOptions?: ClientTableDropdownOptions<T>;
};

export type ClientTableProps<T extends ClientTableEntry> = {
  className?: string;
  columnDropdownOptions?: ClientTableDropdownOptions<T>;
  columns: ClientTableColumn<T>[];
  data: T[];
  entriesPerPage?: number;
  minRows?: number;
  onEntryClick?: (entry: T) => void;
};

export const ClientTable = <T extends ClientTableEntry>({
  className,
  columnDropdownOptions,
  columns,
  data,
  entriesPerPage = 10,
  minRows,
  onEntryClick
}: ClientTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pageCount = Math.max(Math.ceil(data.length / entriesPerPage), 1);

  const firstEntry = data.length === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1;
  const lastEntry = Math.min(firstEntry + entriesPerPage - 1, data.length);
  const currentEntries = data.slice(firstEntry - 1, lastEntry);
  const nRows = Math.max(currentEntries.length, minRows ?? -1);

  return (
    <div className={className}>
      <div className="rounded-md border bg-card tracking-tight text-muted-foreground shadow-sm">
        <Table>
          <Table.Header>
            <Table.Row>
              {columns.map((column, i) => (
                <Table.Head className="whitespace-nowrap text-foreground" key={i}>
                  {columnDropdownOptions ? (
                    <DropdownMenu>
                      <DropdownMenu.Trigger className="flex items-center justify-between gap-3">
                        <span>{column.label}</span>
                        <ChevronDownIcon />
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content align="start">
                        <DropdownMenu.Group>
                          {columnDropdownOptions.map((option) => {
                            const Icon = option.icon;
                            return (
                              <DropdownMenu.Item
                                key={option.label}
                                onClick={() => {
                                  option.onSelection(column);
                                }}
                              >
                                {Icon && <Icon className="mr-2" height={16} width={16} />}
                                {option.label}
                              </DropdownMenu.Item>
                            );
                          })}
                        </DropdownMenu.Group>
                      </DropdownMenu.Content>
                    </DropdownMenu>
                  ) : (
                    column.label
                  )}
                </Table.Head>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {range(nRows).map((i) => {
              const entry = currentEntries[i];
              return (
                <Table.Row
                  className={cn(typeof onEntryClick === 'function' && 'cursor-pointer hover:backdrop-brightness-95')}
                  key={i}
                  onClick={() => {
                    onEntryClick?.(entry);
                  }}
                >
                  {columns.map(({ field, formatter }, j) => {
                    let value: unknown;
                    if (!entry) {
                      value = 'NA';
                    } else if (typeof field === 'function') {
                      value = field(entry);
                    } else {
                      value = entry[field];
                    }
                    const formattedValue = entry && formatter ? formatter(value) : defaultFormatter(value);
                    return (
                      <Table.Cell className={cn('text-ellipsis leading-none', !entry && 'invisible')} key={j}>
                        {formattedValue}
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
      <ClientTablePagination
        currentPage={currentPage}
        firstEntry={firstEntry}
        lastEntry={lastEntry}
        pageCount={pageCount}
        setCurrentPage={setCurrentPage}
        totalEntries={data.length}
      />
    </div>
  );
};
