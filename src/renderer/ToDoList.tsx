import * as React from 'react';
import { Pane, Checkbox } from 'evergreen-ui';

const ItemCheckbox: React.FC<{
  label: string;
  name: string;
  checked: Record<string, boolean>;
  onChange: (updates: Record<string, boolean>) => void;
}> = ({ name, label, onChange, checked }) => {
  return (
    <Checkbox
      name={name}
      label={label}
      checked={checked[name]}
      onChange={(e) => {
        onChange({
          ...checked,
          [name]: e.target.checked,
        });
      }}
    />
  );
};

export const ToDoList: React.FC<{ tasks: string[] }> = ({ tasks }) => {
  const [checked, setChecked] = React.useState<Record<string, boolean>>({});

  return (
    <Pane>
      <ItemCheckbox
        label="Hello world"
        name="1"
        checked={checked}
        onChange={setChecked}
      />
      <ItemCheckbox
        label="Hello world"
        name="2"
        checked={checked}
        onChange={setChecked}
      />
      {tasks.map((task) => (
        <ItemCheckbox
          label={task}
          name={task}
          checked={checked}
          onChange={setChecked}
        />
      ))}
    </Pane>
  );
};
