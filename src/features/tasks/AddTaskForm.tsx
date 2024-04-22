import React, { useState } from 'react';
import { Input, Button, DatePicker, Form } from 'antd';
import { useAppDispatch } from '../../app/hooks';
import { addTask } from './tasksSlice';
import moment from 'moment';

const AddTaskForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(moment().add(1, 'day'));

    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        dispatch(addTask({
            title,
            description,
            dueDate: dueDate.toISOString()
        }));
        setTitle('');
        setDescription('');
        setDueDate(moment().add(1, 'day'));
    };

    return (
        <Form onFinish={handleSubmit} layout="horizontal" style={{ width: '100%', marginBottom: '20px' }}>
            <Form.Item label="Заголовок" required>
                <Input value={title} onChange={e => setTitle(e.target.value)} />
            </Form.Item>
            <Form.Item label="Описание">
                <Input.TextArea value={description} onChange={e => setDescription(e.target.value)} />
            </Form.Item>
            <Form.Item label="Дата">
                <DatePicker value={dueDate} onChange={setDueDate} style={{ width: '100%' }} />
            </Form.Item>
            <Button type="primary" htmlType="submit">
                Добавить задачу
            </Button>
        </Form>
    );
};

export default AddTaskForm;
