import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { TaskItem } from './TaskItem';
import { Button } from 'antd';
import { removeTasks } from './tasksSlice';

const TasksList: React.FC = () => {
    const tasks = useAppSelector(state => state.tasks.tasks);
    const dispatch = useAppDispatch();
    const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());

    const handleRemoveSelected = () => {
        dispatch(removeTasks(Array.from(selectedTasks)));
        setSelectedTasks(new Set()); 
    };

    return (
        <div>
            <Button onClick={handleRemoveSelected} type="primary" disabled={selectedTasks.size === 0} style={{ marginBottom: 16 }}>
                Удалить выбранные задачи
            </Button>
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} />
            ))}
        </div>
    );
};

export default TasksList;
