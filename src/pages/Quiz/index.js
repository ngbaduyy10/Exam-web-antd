import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getQuestion} from "../../services/questionService";
import {Button, Form, Radio, Space} from "antd";
import {getTopicById} from "../../services/topicService";
import {getCookie} from "../../helpers/cookie";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {postAnswer} from "../../services/answerService";

function Quiz () {
    const params = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [topic, setTopic] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getQuestion(params.id);
            if (response.length > 0) {
                setQuestions(response);
            }
        }

        fetchApi();
    }, [params]);

    useEffect(() => {
      const fetchApi = async () => {
        const response = await getTopicById(params.id);
        if (response) {
          setTopic(response);
        }
      }

      fetchApi();
    }, [params])

    const onFinish = (values) => {
        let answers = [];
        for (let i = 0; i < questions.length; i++) {
            const temp = Object.keys(values)[i]
            answers.push({
                "questionId": temp,
                "answer": parseInt(values[temp])
            })
        }

        let data = {
            "userId": getCookie("id"),
            "topicId": params.id,
            "answers": answers
        }
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                const fetchApi = async () => {
                    const response = await postAnswer(data);
                    if (response) {
                        await Swal.fire({
                            title: "Success",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate("/answers");
                    }
                }
                fetchApi();
            }
        });

    }

    return (
        <>
            <Form layout="vertical" onFinish={onFinish}>
                <h1>Topic: {topic.name}</h1>
                {questions.map((item, index) => (
                    <Form.Item
                        key={item.id}
                        name={`${item.id}`}
                        label={<h3>Question {index + 1}: {item.question}</h3>}
                    >
                        <Radio.Group>
                            <Space direction="vertical">
                                <Radio value={1}>{item.answers[0]}</Radio>
                                <Radio value={2}>{item.answers[1]}</Radio>
                                <Radio value={3}>{item.answers[2]}</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                ))}
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form>
        </>
    )
}

export default Quiz;