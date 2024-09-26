import React from "react";
import AsyncSelect from "react-select/async";
import { getPlaces } from "@/service/api/trip";
import { Place } from "@/service/interface/ITripApi";

interface AutocompleteFieldProps {
  id: string;
  label: React.ReactNode;
  placeholder: string;
  value: string | null;
  onChange: (selectedPlace: string | null) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
}

interface OptionType {
  value: string | null;
  label: string;
  place: Place;
}

const AutocompleteField: React.FC<AutocompleteFieldProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
}) => {
  const loadOptions = async (inputValue: string) => {
    const places = await getPlaces(inputValue);
    return places.map((place) => ({
      value: place.name,
      label: place.name,
      place: place,
    }));
  };

  const customStyles = {
    control: (provided: Record<string, unknown>) => ({
      ...provided,
      borderColor: error && touched ? "red" : (provided.borderColor as string),
    }),
  };

  return (
    <div className="space-y-1">
      <label htmlFor={id} className={error && touched ? "text-red-500" : ""}>
        {label}
      </label>
      <AsyncSelect<OptionType>
        id={id}
        loadOptions={loadOptions}
        value={value ? { value, label: value, place: {} as Place } : null}
        onChange={(option) => onChange(option ? option.value : null)}
        onBlur={onBlur}
        placeholder={placeholder}
        styles={customStyles}
        formatOptionLabel={(option: OptionType) => (
          <div>
            <div>{option.label}</div>
            <div className="text-sm text-gray-500">
              {option.place.place_formatted}
            </div>
          </div>
        )}
      />
      {error && touched && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default AutocompleteField;
