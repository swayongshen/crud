import React, {useState, useEffect} from "react";
import Modal from "antd/es/modal/Modal";
import {Button, Form, Input} from "antd";

function AddQuoteModal(props) {
    const [show, setShow] = useState(false);
    const formRef = React.createRef();

    const onFinish = (values) => {
        const url = "api/v1/quotes/";
        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((data) => {
                if (data.ok) {
                    setShow(false);
                    return data.json();
                }
                throw new Error("Network error.");
            })
            .then(() => {
                props.reloadQuotes();
            })
            .catch((err) => console.error("Error: " + err));
    };
    return (
        <>
            <Button variant="primary" onClick={() => setShow(true)}>Add quote</Button>
            <Modal title="Add new quote" visible={show} onCancel={() => setShow(false)}>
                <Form ref={formRef} layout="vertical" onFinish={onFinish}>
                    <Form.Item name="title" label="Title"
                               rules={[{required: true, message: "Please input your quote!"}]}>
                        <Input placeholder="Input your quote" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default AddQuoteModal;
