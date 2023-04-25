import React from 'react';
import { Select } from 'antd';

const SearchCity: React.FC = () => (
  <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Search to Select City"
    optionFilterProp="children"
    filterOption={(input, option) => (option?.label ?? '').includes(input)}
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    }
    options={[
      {
        value: '1',
        label: 'Southampton',
      },
      {
        value: '2',
        label: 'London',
      },
      {
        value: '3',
        label: 'Bath',
      },
      {
        value: '4',
        label: 'York',
      },
      {
        value: '5',
        label: 'Newcastle',
      },
      {
        value: '6',
        label: 'Bristol',
      },
      {
        value: '6',
        label: 'A',
      },
    ]}
  />
);

export default SearchCity;