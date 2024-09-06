import { Button, Table } from 'antd';
import { NavLink } from 'react-router-dom';
import {useEffect, useState} from "react";
import {getTopic} from "../../services/topicService";

function Topic () {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getTopic();
            if (response.length > 0) {
                setTopics(response);
            }
        }

        fetchApi();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Topic',
            dataIndex: 'name',
            key: 'topic',
        },
        {
            title: 'Quiz',
            key: 'quiz',
            render: (_, record) => (
                <NavLink to={`/quiz/${record.id}`}>
                    <Button>Quiz</Button>
                </NavLink>
            )
        }
    ];


    return (
        <>
            <Table columns={columns} dataSource={topics} rowKey="id" />
        </>
    )
}

export default Topic;