import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAnswerById} from "../../services/answerService";
import {getQuestion} from "../../services/questionService";
import {Button, Form, Radio, Space, Badge} from "antd";
import "./result.scss";

function Result () {
    const params = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            const responseAnswer = await getAnswerById(params.id);
            const responseQuestion = await getQuestion(responseAnswer.topicId);
            let result = [];
            for (let i = 0; i < responseQuestion.length; i++) {
                let answer = responseAnswer.answers.find(item => item.questionId === responseQuestion[i].id);
                result.push({
                    ...responseQuestion[i],
                    answer: answer.answer
                })
            }
            setData(result);
        }
        fetchApi();
    }, []);
    return (
        <>
            <Form layout="vertical">
                <h1>Topic:</h1>
                {data.map((item, index) => (
                    <Badge.Ribbon
                        text={item.answer === item.correctAnswer ? "Correct" : "Incorrect"}
                        color={item.answer === item.correctAnswer ? "green" : "red"}
                    >
                        <Form.Item
                            key={item.id}
                            label={<h3>Question {index + 1}: {item.question}</h3>}
                        >
                            <Radio.Group value={item.correctAnswer}>
                                <Space direction="vertical" className="radio">
                                    <Radio
                                        value={1}
                                        className={(item.answer !== item.correctAnswer && item.answer === 1) && "active"}
                                    >
                                        {item.answers[0]}
                                    </Radio>
                                    <Radio
                                        value={2}
                                        className={(item.answer !== item.correctAnswer && item.answer === 2) && "active"}
                                    >
                                        {item.answers[1]}
                                    </Radio>
                                    <Radio
                                        value={3}
                                        className={(item.answer !== item.correctAnswer && item.answer === 3) && "active"}
                                    >
                                        {item.answers[2]}
                                    </Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    </Badge.Ribbon>
                ))}
                <Button type="primary" onClick={() => {navigate("/answers")}}>Back</Button>
            </Form>
        </>
    )
}

export default Result;