import React from 'react';
import { Select } from 'antd';

interface SearchCityProps {
  onCityChange: (city: string) => void;
}


const SearchCity: React.FC<SearchCityProps> = ({ onCityChange }) => {
  const handleCityChange = (city: string) => {
    onCityChange(city);
    console.log(0)
  };

  return (
    <Select
      showSearch
      style={{ width: 200, marginLeft:110, marginTop:20 }}
      placeholder="Search to Select City"
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? '').includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
      }
      onChange={handleCityChange}
      options={[
        {
          value: 'Southampton',
          label: 'Southampton',
        },
        {
          value: 'London',
          label: 'London',
        },
        {
          value: 'Bath',
          label: 'Bath',
        },
        {
          value: 'York',
          label: 'York',
        },
        {
          value: 'Newcastle',
          label: 'Newcastle',
        },
        {
          value: 'Bristol',
          label: 'Bristol',
        },
      ]}
    />
  );
};
export default SearchCity;