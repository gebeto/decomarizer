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
      alignItems="center"
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
  const [taskIndex, setTaskIndex] = React.useState(0);

  const task = React.useMemo(() => {
    if (tasks.length === 0) {
      return null;
    }
    return tasks[taskIndex];
  }, [taskIndex, tasks]);

  return (
    <Pane>
      {task && (
        <ItemCheckbox
          label={task}
          name={task}
          checked={checked}
          onChange={setChecked}
        />
      )}
    </Pane>
  );
};
