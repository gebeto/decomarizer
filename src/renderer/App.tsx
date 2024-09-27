import React, { ChangeEvent } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import {
  Textarea,
  Heading,
  Pane,
  Button,
  SideSheet,
  Position,
} from 'evergreen-ui';
import { ToDoList } from './ToDoList';

const ToDoSection: React.FC<{ label: string }> = ({ label }) => {
  const [isAdding, setIsAdding] = React.useState(false);
  const [tasks, setTasks] = React.useState<string[]>([]);
  const [addValue, setAddValue] = React.useState('');
  const handleAdd = () => {
    setTasks([...tasks, addValue]);
    setIsAdding(false);
    setAddValue('');
  };
  return (
    <>
      <Heading size={500}>{label}</Heading>
      <ToDoList tasks={tasks} />
      <Button onClick={() => setIsAdding(true)}>Add task</Button>
      <SideSheet
        position={Position.BOTTOM}
        isShown={!!isAdding}
        onCloseComplete={() => setIsAdding(false)}
      >
        <Pane padding={8} height="80vh">
          <Heading size={500} marginBottom={8}>
            {label}
          </Heading>
          <Textarea
            value={addValue}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setAddValue(e.target.value)
            }
            autoFocus
            minHeight="auto"
            placeholder="add task"
            onKeyDown={(e) => {
              if (e.metaKey && e.key === 'Enter') {
                handleAdd();
              }
            }}
          />
          <Button width="100%" appearance="primary" onClick={handleAdd}>
            Add
          </Button>
        </Pane>
      </SideSheet>
    </>
  );
};

function Hello() {
  return (
    <Pane display="flex" flexDirection="column">
      <Pane
        border="muted"
        borderTop={false}
        borderBottom={false}
        display="flex"
        flexDirection="column"
        padding={16}
      >
        <ToDoSection label="In Progress" />
      </Pane>
      <Pane
        border="muted"
        display="flex"
        flexDirection="column"
        padding={16}
        borderBottom={false}
      >
        <ToDoSection label="Plan" />
      </Pane>
      <Pane height="63px" />
    </Pane>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
