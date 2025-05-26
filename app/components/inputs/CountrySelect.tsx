/* eslint-disable @next/next/no-img-element */
"use client";

import Select from "react-select";
import useCountries from "@/app/hooks/useCountries";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue | null) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Escolha uma localização"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue | null)}
        formatOptionLabel={(option: CountrySelectValue) => (
          <div className="flex flex-row items-center gap-3">
            <img
              src={`https://flagcdn.com/w40/${option.value.toLowerCase()}.png`}
              alt={option.label}
              width={20}
            />
            <div>
              {option.label},
              <span className="ml-1">{option.region}</span>
            </div>
          </div>
        )}
        styles={{
          control: (provided) => ({
            ...provided,
            padding: "0.75rem",
            borderWidth: "2px",
          }),
          input: (provided) => ({
            ...provided,
            fontSize: "1.125rem",
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#1e3a8a" : provided.backgroundColor,
            color: state.isFocused ? "white" : "#1e3a8a",
          }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "white",
            primary25: "#1e3a8a",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
