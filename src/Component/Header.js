import React from 'react'
import {Navbar,Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
const Header = () => {
  return (
    <div>
        <Navbar bg="primary" variant="dark">
        <Container style={{fontSize:50,color:"#fff",fontWeight:"bold",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <p>React Todo Redux</p>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header