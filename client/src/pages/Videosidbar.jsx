import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Videosidbar({videos}) {
 
  return (
    <>
        {videos.map((item, index) => (
        <Card className="bg-dark text-white" key={item.id} >
            <Card.Img variant="top" src={`http://localhost:5001/image/${item.image}`} />
            <Card.Body>
                <Card.Title>Seria {item.episode}</Card.Title>
                <Card.Text>
                {item.description}
                </Card.Text>
                <Button  as={Link} variant="primary" to={`/mainvideos/${item.id}`}>Серия: {item.episode}</Button>
            </Card.Body>
        </Card>
        ))}
    </>
  );
}

export {Videosidbar};
