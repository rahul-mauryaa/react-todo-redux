import React, { useState,useEffect } from "react";
import { Card, Button, InputGroup, Form, Table } from "react-bootstrap";
import { TiDeleteOutline } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addTodo,deleteAllTodo ,removeTodo ,handleEditSubmit ,handleCheckbox} from "../redux/action/TodoAction";


const Todo = () => {
  const [todovalue, setTodovalue] = useState("");
  const todos = useSelector((state) => state.TodoReducer);

  const [editFormVisibility,setEditFormVisibility] = useState(false)

  const [editTodo, setEditTodo]=useState('');


  const [editValue, setEditValue]=useState('');

  

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    let date = new Date();
    let time = date.getTime();
    let todoObj = {
      id: time,
      todo: todovalue,
      completed: false,
    };
    setTodovalue("");
    dispatch(addTodo(todoObj));
  };

  const deleteAll = () => {
    dispatch(deleteAllTodo());
  };


  const handleEditClick = (todo) =>{
    setEditFormVisibility(true)
    setEditTodo(todo)
  }


  const cancelUpdate=()=>{
    setEditFormVisibility(false);
  }


  const editSubmit = (e) =>{
    e.preventDefault();
    let editedObj={
      id: editTodo.id,
      todo: editValue,
      completed: false
    }
    dispatch(handleEditSubmit(editedObj))
  }



  useEffect(()=>{
    setEditValue(editTodo.todo)
  },[editTodo])




  return (
    <div
      style={{
        height: "auto",
        width: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          width: "80rem",
          height: "40rem",
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "1px 2px 9px #F4AAB9",
        }}
      >
        <Card.Body style={{ width: "auto", height: "auto", marginTop: 20 }}>
          <Card.Title
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: 25,
              fontWeight: "bold",
            }}
          >
            React Todo
          </Card.Title>
          <div style={{ width: "500px", marginTop: 20 }}>
            {editFormVisibility === false ? (<InputGroup size="lg" className="mb-3">
              <Form.Control
                placeholder="Enter Your Todo Name"
                aria-label="Enter Your Todo Name"
                aria-describedby="basic-addon2"
                onChange={(e) => setTodovalue(e.target.value)}
                value={todovalue}
              />
              <Button
                onClick={handleSubmit}
                variant="primary"
                id="button-addon2"
              >
                ADD
              </Button>
            </InputGroup>):(<><InputGroup size="lg" className="mb-3">
              <Form.Control
                placeholder="Enter Your Todo Name"
                aria-label="Enter Your Todo Name"
                aria-describedby="basic-addon2"
                 onChange={(e) => setEditValue(e.target.value)}
                value={editValue || ""}
              />
              <Button
                onClick={editSubmit}
                variant="primary"
                id="button-addon2"
              >
                UPDATE
              </Button><br />
            </InputGroup>
             <Button type="button" onClick={cancelUpdate} className='btn btn-primary btn-md back-btn mb-2'
             >BACK</Button></>
            )}
            
            <div style={{ width: "auto" }}>
              <Table striped bordered hover>
                <tbody>
                  {todos &&
                    todos.map((items, index) => (
                      <tr style={{ verticalAlign: "center" }}>
                        {editFormVisibility === false &&(
                          <td>
                          <input type="checkbox" onChange={()=>dispatch(handleCheckbox(items.id))} checked={items.completed} />
                        </td>
                        )}
                        <td
                          style={
                            items.completed === true
                              ? { textDecoration: "line-through" }
                              : { textDecoration: "none" }
                          }
                        >
                          {items.todo}
                        </td>
                        {editFormVisibility === false &&(
                            <td style={{ textAlign: "center" }}>

                            <span style={{ cursor: "pointer", marginRight: 10 }}>
                              <TiDeleteOutline
                                onClick={() => dispatch(removeTodo(items.id))}
                                size="25px"
                              />
                            </span>
                            <span onClick={()=>handleEditClick(items)}>
                              <FiEdit size="22px" />
                            </span>
                          </td>
                        )}
                        
                      </tr>
                    ))}
                </tbody>
              </Table>
              {todos.length > 0 && (
                <Button onClick={deleteAll} variant="danger">
                  Delete All
                </Button>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Todo;
