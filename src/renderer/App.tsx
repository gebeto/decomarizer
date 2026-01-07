import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Pane, Button, TextInput } from 'evergreen-ui';
import { ToDoList } from './ToDoList';
import { addItem, getAllItems } from './store';

const AddToDoInput: React.FC<{
  tasks: string[];
  setTasks: (newTasks: string[]) => void;
  setIsAdding: (isAdding: boolean) => void;
}> = ({ tasks, setTasks, setIsAdding }) => {
  const [addValue, setAddValue] = React.useState('');
  const handleAdd = () => {
    setTasks([...tasks, addValue]);
    setIsAdding(false);
    addItem(addValue);
    setAddValue('');
  };
  return (
    <Pane padding={8} paddingX={16} display="flex" gap={8} flex={1}>
      <TextInput
        flex={1}
        width="initial"
        value={addValue}
        onChange={(e) => setAddValue(e.target.value)}
        autoFocus
        placeholder="add task"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAdd();
          }
        }}
      />
      <Button appearance="primary" onClick={handleAdd}>
        Add
      </Button>
    </Pane>
  );
};

const AddToDo: React.FC<{
  setIsAdding: (newTasks: boolean) => void;
}> = ({ setIsAdding }) => {
  return (
    <Pane border={false} borderLeft padding={16}>
      <Button onClick={() => setIsAdding(true)}>Add task</Button>
    </Pane>
  );
};

function Root() {
  const [isAdding, setIsAdding] = React.useState(false);
  const [tasks, setTasks] = React.useState<string[]>([]);

  React.useEffect(() => {
    const items = getAllItems();
    setTasks(items);
  }, []);

  return (
    <Pane border={false} display="flex" alignItems="center">
      {isAdding ? (
        <AddToDoInput
          setIsAdding={setIsAdding}
          tasks={tasks}
          setTasks={setTasks}
        />
      ) : (
        <Pane border={false} display="flex" paddingLeft={16} flex={1}>
          <ToDoList tasks={tasks} />
        </Pane>
      )}
      <AddToDo setIsAdding={setIsAdding} />
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
