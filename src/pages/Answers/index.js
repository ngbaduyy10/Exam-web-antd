import {useEffect, useState} from "react";
import {getAnswer} from "../../services/answerService";
import {getTopic} from "../../services/topicService";
import {NavLink} from "react-router-dom";
import {Button, Table} from "antd";

function Answers () {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const responseAnswer = await getAnswer();
            const responseTopic = await getTopic();

            let result = [];
            for (let i = 0; i < responseAnswer.length; i++) {
                result.push({
                    ...responseTopic.find(item => item.id === responseAnswer[i].topicId),
                    ...responseAnswer[i],
                    "number": i + 1
                });
            }

            setData(result.reverse());
        }

        fetchApi();
    }, []);

    const columns = [
        {
            title: 'Number',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Topic',
            dataIndex: 'name',
            key: 'topic',
        },
        {
            title: 'Detail',
            key: 'detail',
            render: (_, record) => (
                <NavLink to={`/result/${record.id}`}>
                    <Button>View more</Button>
                </NavLink>
            )
        }
    ];

    return (
        <>
            <Table columns={columns} dataSource={data} rowKey="number" />
        </>
    )
}

export default Answers;