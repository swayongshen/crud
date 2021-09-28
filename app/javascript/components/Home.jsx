import React, { useState, useEffect } from "react";
import {Layout, message, Popconfirm, Table} from "antd";
const { Content, Footer } = Layout;
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MyNavbar from './Navbar'
import {Button} from "react-bootstrap";
import WriteQuoteModal from "./WriteQuoteModal";

function Home() {
    const [quotes, setQuotes] = useState([]);
    const [editModal, setEditModal] = useState(<></>);

    const loadQuotes = () => {
        const url = "api/v1/quotes/";
        fetch(url)
            .then((data) => {
                if (data.ok) {
                    return data.json();
                }
                throw new Error("Network error.");
            })
            .then((data) => {
                data.forEach((quote) => {
                    const newEl = {
                        key: quote.id,
                        id: quote.id,
                        title: quote.title
                    };

                    setQuotes(prevQuotes => [...prevQuotes, newEl]);
                });
            })
            .catch((err) => message.error("Error: " + err));
    }

    const reloadQuotes = () => {
        setQuotes([]);
        loadQuotes();
    }

    const deleteQuote = (id) => {
        const url = `api/v1/quotes/${id}`;

        fetch(url, {
            method: "delete",
        })
            .then(response => {
                if (response.status === 204) {
                    reloadQuotes();
                } else {
                    throw new Error("Network error.");
                }
            })
            .catch((err) => message.error("Error: " + err));
    };

    const generateEditModal = (id, currTitle) => {
        const editModal = <WriteQuoteModal isEdit={true} id={id} currTitle={currTitle} reloadQuotes={reloadQuotes} setEditModal={setEditModal}/>
        setEditModal(() => <></>)
        setEditModal(() => editModal);
    }


    useEffect(() => {
        loadQuotes();
    }, [])

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: "",
            key: "action",
            render: (_text, record) => (
                <>
                    <Popconfirm title="Are you sure to delete this quote?" onConfirm={() => deleteQuote(record.id)} okText="Yes" cancelText="No">
                        <a href="#" type="danger">
                            Delete{" "}
                        </a>
                    </Popconfirm><br/>
                    <a onClick={() => generateEditModal(record.id, record.title)}>Edit</a>
                </>
            ),
        },
    ]

    return (
        <Container fluid>
            <Row className="justify-content-md-center">
            <MyNavbar/>
            </Row><br/>
            <Row className="justify-content-md-center">
                <Table className="table" dataSource={quotes} columns={columns}/>
            </Row>
            <WriteQuoteModal reloadQuotes={reloadQuotes}/>
            {/*<WriteQuoteModal isEdit={true} id={1} currTitle={"Sibei noob"} reloadQuotes={reloadQuotes}/>*/}
            {editModal}
        </Container>
    )
}



export default Home;
