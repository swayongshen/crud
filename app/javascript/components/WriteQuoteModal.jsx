import React, {useState, useEffect} from "react";
import Modal from "antd/es/modal/Modal";
import {Button, Form, Input} from "antd";

function WriteQuoteModal(props) {
    const [show, setShow] = useState(props.isEdit);
    const formRef = React.createRef();

    // Submits post request to create a quote. If success, hide modal and reload quotes.
    const onFinish = (values) => {
        const url = props.id ? `api/v1/quotes/${props.id}` : "api/v1/quotes/";
        const method = props.isEdit ? "put" : "post";
        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((data) => {
                if (data.ok) {
                    handleCancel()
                    return data.json();
                }
                throw new Error("Network error.");
            })
            .then(() => {
                props.reloadQuotes();
            })
            .catch((err) => console.error("Error: " + err));
    };

    const handleCancel = () => {
        if (props.isEdit) {
            props.setEditModal(() => <></>)
        } else {
            setShow(false)
        }
    }
    const initialValues = props.currTitle ? {title: props.currTitle} : {}
    const modalTitle = props.isEdit ? "Edit quote" : "Add quote";
    return (
        <>
            { !props.isEdit && <Button variant="primary" onClick={() => setShow(true)}>Add quote</Button> }

            <Modal title={modalTitle} visible={show} onCancel={() => handleCancel()} footer={null}>
                <Form ref={formRef} layout="vertical" onFinish={onFinish} initialValues={initialValues}>
                    <Form.Item name="title" label="Title"
                               rules={[{required: true, message: "Please input your quote!"}]}>
                        {
                            props.currTitle ? <Input placeholder={"Edit quote"} /> : <Input placeholder={"Add quote"}/>
                        }
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

export default WriteQuoteModal;