import * as React from 'react';
import {
  Pane,
  Checkbox,
  Heading,
  ArrowUpIcon,
  ArrowDownIcon,
  Card,
} from 'evergreen-ui';
import { deleteItem } from './store';

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
    <Pane display="flex" flex={1} alignItems="center">
      {task ? (
        <Card display="flex" alignItems="center" flex={1}>
          <Card flex={1}>
            <ItemCheckbox
              label={task}
              name={task}
              checked={checked}
              onChange={(v) => {
                setChecked(v);
                setTimeout(() => {
                  deleteItem(task);
                  setTaskIndex((idx) => Math.min(idx + 1, tasks.length));
                }, 1000);
              }}
            />
          </Card>
          <Card display="flex" flexDirection="column" paddingRight={8} gap={8}>
            <ArrowUpIcon
              color={taskIndex === 0 ? 'gray400' : 'gray800'}
              size={14}
              onClick={() =>
                taskIndex === 0
                  ? undefined
                  : setTaskIndex(Math.max(0, taskIndex - 1))
              }
            />
            <ArrowDownIcon
              color={taskIndex === tasks.length - 1 ? 'gray400' : 'gray800'}
              size={14}
              onClick={() =>
                taskIndex === tasks.length - 1
                  ? undefined
                  : setTaskIndex(Math.min(tasks.length, taskIndex + 1))
              }
            />
          </Card>
        </Card>
      ) : (
        <Heading size={100}>No tasks available</Heading>
      )}
    </Pane>
  );
};
