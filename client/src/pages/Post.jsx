import React from 'react';
import {Row,Col,} from 'react-bootstrap';
import janjake from '../pages/img/janjake.jpg';
import janjake2 from '../pages/img/janjake2.png';


function Post() {
  return (
    <div>
        <Row className="mb-4 border-bottom pb-3">
                        {/* ЛЕВАЯ ЧАСТЬ */}
            <Col xs={12} lg={8}>             
                <div className=" text-white p-5 text-center">{/*bg-secondary*/}
                   <h4>H2 ДВА ТРИ СЛОВА</h4>
                   "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes
                </div>
            </Col>
                            {/* ПРАВАЯ ЧАСТЬ */}
            <Col xs={12} lg={4}>
                <Row>
                                     {/* ФОТО */}
                    <Col xs={6}>
                        <div className="img-fluid  text-center">
                             <img
                                src={janjake}
                                 alt="preview"
                                className="img-fluid rounded"
                            />         
                        </div>
                     </Col>
                                         {/* МАЛЕНЬКИЕ БЛОКИ */}
<Col xs={6} className="d-flex flex-column justify-content-between h-100">
    <div className="text-center">
        <img
            // src={janjake2}
            // src={`http://localhost:3000/media/image/rubbers/tenergy-05_1.webp`}
            src={`http://localhost:5001/image/rubbers/tenergy-05_1.webp`}
        //    http://localhost:5001/image/rubbers/30129_1_LRG-300x300.jpg
                 
            alt="preview"
            className="rounded mb-2 d-block mx-auto"
            style={{
                width: '100%',
                height: '80px',
                objectFit: 'cover'
            }}
        />
        <div className="border p-2 mb-3">
            три слова
        </div>
    </div>
    <div className="text-center">
        <img
            src={janjake2}
            alt="preview"
            className="rounded mb-2 d-block mx-auto"
            style={{
                width: '100%',
                height: '80px',
                objectFit: 'cover'
            }}
        />
        <div className="border p-2">
            три слова
        </div>
    </div>
</Col>
                </Row>
             </Col>
        </Row>
    </div>
  )
}
export {Post};
