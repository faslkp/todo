import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as DeleteIcon } from "../assets/delete.svg";
import { ReactComponent as RevertIcon } from "../assets/revert.svg";
import { ReactComponent as PlusIcon } from "../assets/plus.svg";

function ToDo() {
    const [items, setItems] = useState([
        { id: 1, title: "Sample task; please add your task", completed: false },
        {
            id: 2,
            title: "Sample completed task; please add your task",
            completed: true,
        },
    ]);
    const [lastId, setLastId] = useState(0);
    const [input, setInput] = useState("");

    let addItem = () => {
        if (input) {
            if (lastId === 0) {
                setItems([{ id: lastId + 1, title: input }]);
            } else {
                setItems([...items, { id: lastId + 1, title: input }]);
            }
            setLastId((prevState) => prevState + 1);
            setInput("");
        }
    };

    let markCompleted = (id, title) => {
        for (var i in items) {
            if (items[i].id === id) {
                setItems([
                    ...items.filter((item) => item.id !== id),
                    { id: id, title: title, completed: true },
                ]);
                break;
            }
        }
    };

    let revertCompleted = (id, title) => {
        for (var i in items) {
            if (items[i].id === id) {
                setItems([
                    ...items.filter((item) => item.id !== id),
                    { id: id, title: title, completed: false },
                ]);
                items[i].completed = false;
                break;
            }
        }
    };

    let deleteItem = (id) => {
        setItems([...items.filter((item) => item.id !== id)]);
    };

    useEffect(() => {
        var input = document.getElementById("newtask");
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                document.getElementById("addbutton").click();
            }
        });
    });

    return (
        <Main>
            <Wrapper>
                <Hh1>ToDo List</Hh1>
                <div>
                    <Hh2>Things to be done</Hh2>
                    <Ul>
                        {items
                            .filter((item) => {
                                if (!item.completed) {
                                    return true;
                                }
                                return false;
                            })
                            .map((item) => (
                                <Li key={item.id}>
                                    <LiDiv>
                                        <RoundMark
                                            className="button"
                                            onClick={() =>
                                                markCompleted(
                                                    item.id,
                                                    item.title
                                                )
                                            }
                                        >
                                            <ImgHover
                                                src={
                                                    require("../assets/tick-green.svg")
                                                        .default
                                                }
                                                alt="hovertick"
                                            />
                                        </RoundMark>
                                        <LiText>
                                            {item.id}, {item.title}
                                        </LiText>
                                    </LiDiv>
                                    <DeleteIcon
                                        className="button"
                                        onClick={() => deleteItem(item.id)}
                                    />
                                </Li>
                            ))}
                        <FormDiv>
                            <LiDiv style={{ width: "100%" }}>
                                <PlusIcon />
                                <InputText
                                    id="newtask"
                                    placeholder="Type new task..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                            </LiDiv>
                            <ButtonAdd id="addbutton" onClick={addItem}>
                                Add New
                            </ButtonAdd>
                        </FormDiv>
                    </Ul>
                </div>
                <div>
                    <Hh2>Completed</Hh2>
                    <Ul>
                        {items
                            .filter((item) => {
                                if (item.completed) {
                                    return true;
                                }
                                return false;
                            })
                            .map((item) => (
                                <Li key={item.id}>
                                    <LiDiv>
                                        <RoundMarkGreen>
                                            <img
                                                src={
                                                    require("../assets/tick-green.svg")
                                                        .default
                                                }
                                                alt="tick"
                                                style={{ width: "100%" }}
                                            />
                                        </RoundMarkGreen>
                                        <LiTextGreen>
                                            {item.id}, {item.title}
                                        </LiTextGreen>
                                    </LiDiv>
                                    <LiDiv>
                                        <RevertIcon
                                            className="button"
                                            style={{ marginRight: "15px" }}
                                            onClick={() =>
                                                revertCompleted(
                                                    item.id,
                                                    item.title
                                                )
                                            }
                                        />
                                        <DeleteIcon
                                            className="button"
                                            onClick={() => deleteItem(item.id)}
                                        />
                                    </LiDiv>
                                </Li>
                            ))}
                    </Ul>
                </div>
            </Wrapper>
        </Main>
    );
}

export default ToDo;

// styled components
const Main = styled.section`
    width: 700px;
    margin: 0 auto;
    min-height: 100vh;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    padding: 80px 0;
`;

const Wrapper = styled.section`
    width: 70%;
    margin: 0 auto;
`;
const Hh1 = styled.h1`
    font-size: 32px;
    text-align: center;
    font-weight: bold;
`;
const Hh2 = styled.h2`
    font-size: 26px;
    font-weight: bold;
`;
const Ul = styled.ul`
    list-style: none;
`;
const Li = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    &:last-child {
        margin-bottom: 0px;
    }
`;
const LiDiv = styled.div`
    display: flex;
    align-items: center;
`;
const RoundMark = styled.div`
    max-width: 20px;
    max-height: 20px;
    min-width: 20px;
    min-height: 20px;
    border-radius: 50%;
    border: 1px solid #757575;
    margin: -3px 15px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        border-color: #08c494;
    }
    &:hover img {
        visibility: visible;
    }
`;
const ImgHover = styled.img`
    width: 100%;
    visibility: hidden;
`;
const LiText = styled.p`
    font-size: 22px;
    display: inline-block;
    margin: 0;
    max-width: 100%;
    word-break: break-all;
`;
const RoundMarkGreen = styled(RoundMark)`
    border-color: #08c494;
`;
const LiTextGreen = styled(LiText)`
    color: #08c494;
`;
const FormDiv = styled.div`
    border: 1px solid #b3b4b5;
    border-radius: 4px;
    height: 50px;
    width: 100%;
    margin-top: 30px;
    padding-left: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const InputText = styled.input`
    padding: 6px 8px;
    height: 100%;
    border: none;
    font-size: 16px;
    width: 100%;
    &:focus-visible {
        outline: none;
    }
`;
const ButtonAdd = styled.button`
    font-size: 16px;
    color: #fff;
    background-color: #000;
    height: 100%;
    border: none;
    width: 100px;
    border-radius: 4px;
    cursor: pointer;
`;
