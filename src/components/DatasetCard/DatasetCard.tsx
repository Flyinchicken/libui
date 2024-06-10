import React from 'react';

import { Badge } from '../Badge/Badge.js';
import { Button } from '../Button/Button.js';
import { Card } from '../Card/Card.js';

export type DatasetInfo = {
  createdAt: Date;
  description: string;
  id: string;
  license: string;
  managerIds: string[];
  name: string;
  updatedAt: Date;
};

// this element is used when a user clicks the view datasets button
// 1. the user can be a public user which will not pass the current user id to
//    the backend server, we should modify the backend function so that it checks
//    for current user id and returns publically available data sets

// 2. if a user has logged in, verified, or a manager of the dataset then the backend
//    server will return the corresponding information accordingly

// upon receiving the backend information, we now display the cards in a new page
// each card provides basic information of a dataset

// the dataset card should provide
//     A) view data button to all users (will navigate to view data page, view data page will have a download button)
//     B) modify data set button to managers only
//     C) delete dataset to managers only
//     D) add manager to dataset for managers
//     E) Delete manager from dataset for managers
//     F) At the end of the page&& we should have a button for any logged in users to create new dataset

export type DatasetCardProps = { isManager: boolean } & DatasetInfo;

const DatasetCard = ({
  createdAt,
  description,
  id,
  isManager,
  license,
  managerIds,
  name,
  updatedAt
}: DatasetCardProps) => {
  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title>{name}</Card.Title>
          <Card.Description>{description}</Card.Description>
        </Card.Header>
        <Card.Content>
          <ul>
            <li>Dataset Id: {id}</li>
            <li>Created at:{createdAt.toDateString()}</li>
            <li>Updated at: {updatedAt.toDateString()}</li>
            <li>Licence: {license}</li>
            <li>
              ManagerId:{' '}
              {managerIds.map((element) => {
                return (
                  <Badge key={`managerId-${element}`} variant={'secondary'}>
                    {element}
                  </Badge>
                );
              })}
            </li>
          </ul>
        </Card.Content>
        <Card.Footer className="flex justify-between">
          {isManager ? (
            <Button
              variant={'primary'}
              onClick={() => {
                alert('Entering Manage Dataset Page');
              }}
            >
              Manage Dataset
            </Button>
          ) : (
            <Button
              variant={'primary'}
              onClick={() => {
                alert('Entering View Dataset Page');
              }}
            >
              View Dataset
            </Button>
          )}
          {isManager && (
            <Button
              variant={'secondary'}
              onClick={() => {
                alert('Added a new Manager');
              }}
            >
              Add Manager
            </Button>
          )}
          {isManager && (
            <Button
              variant={'secondary'}
              onClick={() => {
                alert('Removed a manager');
              }}
            >
              Remove Manager
            </Button>
          )}
          {isManager && (
            <Button
              variant={'danger'}
              onClick={() => {
                alert('Deleting Dataset!');
              }}
            >
              Delete Dataset
            </Button>
          )}
        </Card.Footer>
      </Card>
    </>
  );
};

export default DatasetCard;
