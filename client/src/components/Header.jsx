import React from 'react';
import { Nav, Navbar, NavDropdown, Container, FormControl, Form, Button } from 'react-bootstrap';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getCities } from '../services/citiesService';

function Header() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Загружаем города для выпадающего списка
  const { data: cities } = useFetch(getCities);
  
  // Получаем текущий регион из URL (по умолчанию 'world')
  // const currentCity = searchParams.get('city') || 'world';
  const currentCity = searchParams.get('city') || localStorage.getItem('newsCity') || 'world';
  

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    localStorage.setItem('newsCity', selectedCity); // 👈 Сохраняем
    if (selectedCity === 'world') {
      navigate('/?type=world'); 
    } else {
      navigate(`/?type=region&city=${selectedCity}`);
    }
  };

  return (
    <div>
      {/* 1. ВЕРХНЯЯ ПАНЕЛЬ (Pills) */}
      <Nav variant="pills" fill defaultActiveKey="/home" className="p-2 bg-dark">
        <Nav.Item>
          <Nav.Link href="/home" className="text-white">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" className="text-white">Much longer nav link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" className="text-white" disabled>Disabled</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* 2. ХЭДЕР */}
      <header className="two" id="myHeader">
        <Navbar expand="lg" className="">
          <Container fluid>
            {/* <Navbar.Brand href="/" className="text-white">MY-LOGO</Navbar.Brand> */}
            {/* <Navbar.Brand as={Link} to="/?type=world" className="text-white">MY-LOGO</Navbar.Brand> */}
            <Navbar.Brand 
    as={Link} 
    to="/?type=world" 
    className="text-white"
    onClick={() => {
        // Очищаем сохраненный регион, чтобы шапка сбросилась на "Весь мир"
        localStorage.removeItem('newsCity'); 
        localStorage.setItem('newsType', 'world');
    }}
>
    MY-LOGO
</Navbar.Brand>
            <Navbar.Toggle className='navbar-light-color' aria-controls="basic-navbar-nav" />
            
            <Navbar.Collapse id="basic-navbar-nav">
              {/* Меню по центру */}
              <Nav className="mx-auto">
                <Nav.Link as={Link} to="/equipment">Инвентарь</Nav.Link>
                <Nav.Link as={Link} to="/videos">Видео</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>

              {/* Правая часть: Выбор региона + Поиск */}
              <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
                <Form.Select 
                  value={currentCity}
                  onChange={handleCityChange}
                  style={{ 
                    width: '180px', 
                    backgroundColor: 'transparent', 
                    color: '#38ebeb', 
                    borderColor: '#38ebeb' 
                  }}
                >
                  <option value="world" style={{ color: 'black' }}>🌍 Весь мир</option>
                  {cities && cities.map((c) => (
                    <option key={c.value} value={c.value} style={{ color: 'black' }}>
                      {c.label}
                    </option>
                  ))}
                </Form.Select>

                <Form className="d-flex">
                  <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </div>

            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </div>
  )
}

export { Header };