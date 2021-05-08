import { Modal, Form } from "react-bootstrap";
import { useState } from "react";

function ListSaleModal(props) {
    let tokenId = props.tokenId
    const [price, setprice] = useState('')

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    List Sale
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Set Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter Price (CCH)" onChange={(e) => setprice(e.target.value)} required />
                        <Form.Text className="text-muted">
                            <p>{tokenId}</p>
                            {/* We'll never share your email with anyone else. */}
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button className="mx-1" onClick={(e) => props.itemOnSale(tokenId, price)}>
                    List on Sale
					</button>
                <button onClick={props.onHide}>Cancel</button>
            </Modal.Footer>
        </Modal >
    );
}

export default ListSaleModal;