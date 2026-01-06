import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Pane, Button, SideSheet, Position, TextInput } from 'evergreen-ui';
import { ToDoList } from './ToDoList';
import { addItem, getAllItems } from './store';

const AddToDo: React.FC<{
  tasks: string[];
  setTasks: (newTasks: string[]) => void;
}> = ({ tasks, setTasks }) => {
  const [isAdding, setIsAdding] = React.useState(false);
  const [addValue, setAddValue] = React.useState('');
  const handleAdd = () => {
    setTasks([...tasks, addValue]);
    setIsAdding(false);
    setAddValue('');
    addItem(addValue);
  };
  return (
    <Pane border={false} borderLeft padding={16}>
      <Button onClick={() => setIsAdding(true)}>Add task</Button>
      <SideSheet
        position={Position.LEFT}
        isShown={!!isAdding}
        width={350}
        onCloseComplete={() => setIsAdding(false)}
      >
        <Pane padding={8} display="flex" gap={8}>
          <TextInput
            flex={1}
            width="initial"
            value={addValue}
            onChange={(e) => setAddValue(e.target.value)}
            autoFocus
            placeholder="add task"
            onKeyDown={(e) => {
              if (e.metaKey && e.key === 'Enter') {
                handleAdd();
              }
            }}
          />
          <Button appearance="primary" onClick={handleAdd}>
            Add
          </Button>
        </Pane>
      </SideSheet>
    </Pane>
  );
};

const ToDoSection: React.FC<{ tasks: string[] }> = ({ tasks }) => {
  return (
    <Pane border={false} display="flex" paddingLeft={16} flex={1}>
      <ToDoList tasks={tasks} />
    </Pane>
  );
};

function Root() {
  const [tasks, setTasks] = React.useState<string[]>([]);

  React.useEffect(() => {
    const items = getAllItems();
    setTasks(items);
  }, []);

  return (
    <Pane border={false} display="flex" alignItems="center">
      <ToDoSection tasks={tasks} />
      <AddToDo tasks={tasks} setTasks={setTasks} />
    </Pane>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
      </Routes>
    </Router>
  );
}
