import { faker } from '@faker-js/faker';
import { Box, Chip, Stack, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { Fragment, useEffect, useState } from 'react';
import Highlight from 'react-highlighter';
import { Table } from './Table';
import { MetaType } from './interface';
import { SearchInput } from './parts';

/**
 * Tables display information in a way that's easy to scan, so that users can look for patterns and insights. They can be embedded in primary content, such as cards
 */
const meta: Meta<typeof Table> = {
  component: Table,
  tags: ['autodocs'],
};

type Story = StoryObj<typeof Table>;

const createData = (
  name: string,
  description: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) => ({
  name,
  description,
  calories,
  fat,
  carbs,
  protein,
});

const createColumn = (accessorKey: string, header: string, size?: number, meta?: MetaType) => ({
  accessorKey,
  header,
  size,
  meta,
});

const data = [
  createData(faker.lorem.words(2), faker.lorem.words(5), 159, 6.0, 24, 4.0),
  createData(faker.lorem.words(2), faker.lorem.words(5), 237, 9.0, 37, 4.3),
  createData(faker.lorem.words(2), faker.lorem.words(5), 262, 16.0, 24, 6.0),
  createData(faker.lorem.words(2), faker.lorem.words(5), 305, 3.7, 67, 4.3),
  createData(faker.lorem.words(2), faker.lorem.words(5), 356, 16.0, 49, 3.9),
];

export const Default: Story = {
  args: {
    columns: [
      createColumn('name', 'Name', 255),
      createColumn('description', 'Description'),
      createColumn('calories', 'Calories'),
      createColumn('fat', 'Fat'),
      createColumn('carbs', 'Carbs'),
      createColumn('protein', 'Protein'),
    ],
    data,
  },
};

const WithAccordionComponent = () => {
  const getRowProps = ({ row: { original } }: { row: { original: ReturnType<typeof createData> } }) => (
    <Box>
      <Stack direction="row" alignItems="center">
        <Typography variant="overline">Calories: </Typography>
        <Typography variant="body2"> {original.calories}</Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <Typography variant="overline">Fat: </Typography>
        <Typography variant="body2"> {original.fat}</Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <Typography variant="overline">Carbs: </Typography>
        <Typography variant="body2"> {original.carbs}</Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <Typography variant="overline">Protein: </Typography>
        <Typography variant="body2"> {original.protein}</Typography>
      </Stack>
    </Box>
  );

  return (
    <Table
      columns={[createColumn('name', 'Name', 255, { withChevron: true }), createColumn('description', 'Description')]}
      data={data}
      getRowProps={getRowProps}
    />
  );
};

export const WithAccordion: Story = {
  render: WithAccordionComponent,
};

export const WithActionsMenu: Story = {
  args: {
    columns: [
      createColumn('name', 'Name', 255),
      createColumn('description', 'Description'),
      createColumn('calories', 'Calories'),
      createColumn('fat', 'Fat'),
      createColumn('carbs', 'Carbs'),
      createColumn('protein', 'Protein'),
      {
        id: 'actions',
        meta: {
          actions: [
            {
              key: 'action-1',
              label: 'Action',
              onClick: (row: { original: ReturnType<typeof createData> }) =>
                console.log(`You performed action for row`, row),
            },
            {
              key: 'action-2',
              label: 'Another Action',
              onClick: (row: { original: ReturnType<typeof createData> }) =>
                console.log(`You performed another action for row`, row),
            },
          ],
        },
      },
    ],
    data,
  },
};

export const WithPagination: Story = {
  args: {
    columns: [
      createColumn('name', 'Name', 255),
      createColumn('description', 'Description'),
      createColumn('calories', 'Calories'),
      createColumn('fat', 'Fat'),
      createColumn('carbs', 'Carbs'),
      createColumn('protein', 'Protein'),
    ],
    data: [...data, ...data, ...data],
    pagination: true,
  },
};

const WithSearchComponent = () => {
  const [searchString, setSearchString] = useState('');

  return (
    <Fragment>
      <SearchInput onChange={(value) => setSearchString(String(value))} value={searchString ?? ''} debounce={500} />
      <Table
        columns={[
          createColumn('name', 'Name', 255),
          createColumn('description', 'Description', 50),
          {
            header: 'Calories',
            accessorKey: 'calories',
            cell: ({ row }) => (
              <Chip
                label={<Highlight search={searchString}>{String(row.original.calories)}</Highlight>}
                color="primary"
              />
            ),
            meta: {
              flexRender: true,
            },
          },
        ]}
        data={data}
        searchString={searchString}
      />
    </Fragment>
  );
};

export const WithSearch: Story = {
  render: WithSearchComponent,
};

const WithRowsSelectionComponent = () => {
  const [selectedRows, setSelectedRows] = useState({});

  useEffect(() => console.log(selectedRows), [selectedRows]);

  return (
    <Table
      columns={[
        createColumn('name', 'Name', 255),
        createColumn('description', 'Description'),
        createColumn('calories', 'Calories'),
        createColumn('fat', 'Fat'),
        createColumn('carbs', 'Carbs'),
        createColumn('protein', 'Protein'),
      ]}
      data={data}
      rowSelection={{ selectedRows, setSelectedRows }}
    />
  );
};

export const WithRowsSelection: Story = {
  render: WithRowsSelectionComponent,
};

export const WithLazyLoading: Story = {
  args: {
    columns: [
      createColumn('name', 'Name', 255),
      createColumn('description', 'Description'),
      createColumn('calories', 'Calories'),
      createColumn('fat', 'Fat'),
      createColumn('carbs', 'Carbs'),
      createColumn('protein', 'Protein'),
    ],
    data: [...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data],
    lazyLoading: true,
  },
};

export default meta;
