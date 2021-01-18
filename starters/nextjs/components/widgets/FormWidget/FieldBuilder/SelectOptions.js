import React from "react";
import { TextInput, List } from "@raketa-cms/raketa-cms";

const SelectOptionField = ({ settings, onChangeItem }) => (
  <div className="fileds-row">
    <div className="options-filed-wrapper">
      <TextInput
        label="Value"
        onChange={(value) => onChangeItem("value", value)}
        value={settings.value}
      />
    </div>

    <div className="options-filed-wrapper">
      <TextInput
        label="Label"
        onChange={(value) => onChangeItem("label", value)}
        value={settings.label}
      />
    </div>
  </div>
);

const SelectOtions = ({ onChange, options }) => (
  <div className="options-wrapper">
    <label htmlFor="">Select options</label>

    <List
      listItem={(settings, onChangeItem) => (
        <SelectOptionField settings={settings} onChangeItem={onChangeItem} />
      )}
      onChangeList={(_, selectOptions) =>
        onChange(Object.assign({}, options, { selectOptions }))
      }
      items={options.selectOptions}
      primaryField="label"
      template={{ type: "value", name: "label" }}
    />
  </div>
);

export default SelectOtions;
