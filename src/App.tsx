import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import TasksList from './features/tasks/TasksList';
import AddTaskForm from './features/tasks/AddTaskForm';
import 'antd/dist/antd.css';

function App() {
  return (
    <Provider store={store}>
      <div style={{ margin: '2rem' }}>
        <AddTaskForm />
        <TasksList />
      </div>
    </Provider>
  );
}

export default App;
