import React from 'react';
import { Task } from '../../types';
import { Card, Button, Checkbox } from 'antd';
import { useAppDispatch } from '../../app/hooks';
import { removeTask, addChildTask } from './tasksSlice';  
import dayjs from 'dayjs';

interface Props {
    task: Task;
    selectedTasks: Set<string>;
    setSelectedTasks: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export const TaskItem: React.FC<Props> = ({ task, selectedTasks, setSelectedTasks }) => {
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        dispatch(removeTask(task.id));  
    };

    const handleAddSubtask = () => {
        const title = prompt("Введи описание подзадачи");
        if (title) {
            dispatch(addChildTask({
                parentId: task.id,
                child: {
                    title,
                    description: "Новая подзадача",
                    dueDate: dayjs().add(1, 'day').toISOString(),
                    children: []  
                }
            }));
        }
    };

    const handleToggleTask = (checked: boolean, id: string) => {
        const newSelectedTasks = new Set(selectedTasks);
        if (checked) {
            newSelectedTasks.add(id);
            task.children.forEach(child => newSelectedTasks.add(child.id)); 
        } else {
            newSelectedTasks.delete(id);
            task.children.forEach(child => newSelectedTasks.delete(child.id)); 
        }
        setSelectedTasks(newSelectedTasks);
    };

    return (
        <Card
            title={task.title}
            extra={
                <>
                    <Button onClick={handleAddSubtask} type="default">
                        Добавить подзадачу
                    </Button>
                    <Button onClick={handleDelete} danger style={{ marginLeft: 8 }}>
                        Удалить
                    </Button>
                    <Checkbox
                        onChange={e => handleToggleTask(e.target.checked, task.id)}
                        checked={selectedTasks.has(task.id)}
                        indeterminate={
                            task.children.some(child => selectedTasks.has(child.id)) &&
                            !task.children.every(child => selectedTasks.has(child.id))
                        }
                        style={{ marginLeft: 8 }}
                    />
                </>
            }
        >
            <p>{task.description}</p>
            <p>Дата: {dayjs(task.dueDate).format('YYYY-MM-DD HH:mm')}</p>
            {task.children.map(child => (
                <TaskItem key={child.id} task={child} selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} />
            ))}
        </Card>
    );
};
