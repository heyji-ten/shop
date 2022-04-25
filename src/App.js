import React, {useState, useContext, lazy, Suspense} from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

import Data from './data.js';
import axios from 'axios';
import Cart from './Cart.js';

import { Link, Route, Switch, useHistory } from 'react-router-dom';
// import Detail from './Detail.js';

// 컴포넌트 import 할 때 lazy loading 하기
let Detail = lazy(()=>{ return import('./Detail.js') }); //Detail 을 보여줄 때만 import 해옴






export let 재고context = React.createContext(); //같은 변수값을 공유할 범위 생성

function App() {

  let [shoes, shoes변경] = useState(Data);
  let [재고, 재고변경] = useState([10,11,12]); //중요데이터는 App.js에 저장할것

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
  <Container fluid>
    <Navbar.Brand href="#">ShoeShop</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
        <NavDropdown title="Link" id="navbarScrollingDropdown">
          <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action5">
            Something else here
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#" disabled>
          Link
        </Nav.Link>
      </Nav>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>


<Switch>

  <Route exact path="/">
    <div className="background hei">
      <h1>20% Season off</h1>
      <p>
        This is a simple hero unit, a simple jumbotron-style component for calling
        extra attention to featured content or information.
      </p>
      <p>
        <Button variant="primary">Learn more</Button>
      </p>
    </div>

    <div className="container">

      <재고context.Provider value={재고}> {/* 값 공유를 원하는 HTMl들을 <범위.Provider>로 감싸고 value={공유원하는값} */}

      <div className="row">
        {
          shoes.map((a,i)=>{
            return <Products shoes={shoes[i]} i={i} key={i} />
          })
        }
      </div>

      </재고context.Provider>

      <button className='btn btn-primary' onClick={() => { 

        // axios.post('서버url',{ id : 'codingapple', pw : 1234 }); //서버에 데이터를 보내는 법

        // 로딩중이라는 UI 띄움

        axios.get('https://codingapple1.github.io/shop/data2.json') //새로고침 없이 데이터를 가져옴
        .then((result) => {

          // 로딩중이라는 UI 안보이게 처리

          console.log(result.data);
          shoes변경( [...shoes, ...result.data] ); //...연산자는 {}괄호를 벗겨줍니다. 카피본 만든것임.
        }) // 데이터 요청이 성공했을 때 실행함
        .catch(() => {
          // 로딩중이라는 UI 안보이게 처리

          console.log('실패')
        }) //데이터 요청이 실패했을 때 실행함

      }}>더보기</button>
    </div>
  </Route>

  <재고context.Provider value={재고}> 

  <Route path="/detail/:id">
    <Suspense fallback={ <div>로딩중입니다~!</div> }>
      <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}/>
    </Suspense>
  </Route>

  <Route path="/cart">
      <Cart></Cart>
  </Route>

  {/* redux 쓰는 이유
  1. props 없이 모든 컴포넌트가 state를 갖다쓰기 가능 */}
  
  </재고context.Provider> 

  <Route path="/:id">
    <div>아무거나 적었을때 이거 보여줌</div>
  </Route>

</Switch>

{/* <Route path="/어쩌구" component={Modal}></Route> */}

    </div>
  );
}



function Products(props) {

  let 재고 = useContext(재고context);
  let history = useHistory();

  return (
    <div className="col-md-4" onClick={() => { history.push('/detail/' + props.shoes.id) }}>
      <img src={ 'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg' } width="100%"/>
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.content } & { props.shoes.price }</p>

      {/* props 대신 context를 쓰자
      - 하위 컴포넌트들이 props 없이도 부모의 값을 사용가능
      1. React.createContext()로 범위생성
      2. 같은 값을 공유할 HTML을 범위로 싸매기 ex. <재고context.Provider value={재고}>
      3. useContext(범위이름)로 공유된 값 사용하기 
      ---------
      * 간단한 데이터 전송은 간단한 props를 쓰자
      * 컴포넌트가 많을 때 사용하기 좋음 */}

      <Test />

    </div>
  )
}

function Test() {

  let 재고 = useContext(재고context);

  return <p>재고 : {재고[0]}</p>
}

export default App;
