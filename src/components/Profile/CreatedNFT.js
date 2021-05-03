import { useSelector, useDispatch } from "react-redux";
import { Button, Card } from "react-bootstrap";

const CreatedNFT = (props) => {
    const currentUser = useSelector((state) => state.detail.currentUser);
    const items = useSelector((state) => state.detail.items);

    let createdArr

    const creatorItems = (items, currentUser) => {
        createdArr = items.filter((i) => i.creator === currentUser)
        console.log('this creator created', createdArr)
    }
    creatorItems(items, currentUser)


    return (
        <div className="d-flex">
            {createdArr &&
                createdArr.map((item, index) => {
                    return (
                        <Card style={{ width: '18rem' }} className="mx-2">
                            <Card.Img variant="top" src="https://via.placeholder.com/150" roundedCircle />
                            <Card.Body>
                                <Card.Title>{item.itemName}</Card.Title>
                                <Card.Text>
                                    <h6>Id: {item.id}</h6>
                                    <h6>Owner: {item.owner}</h6>
                                    <h6>Creator: {item.creator}</h6>
                                    <h6>Price {item.price}</h6>
                                </Card.Text>


                                {item.owner === currentUser ? <div>
                                    {item.forSale === true ?
                                        <Button variant="warning" onClick={(e) => props.itemNotForSale(item.id)} >Not for Sale</Button> :
                                        <Button variant="success" onClick={(e) => props.itemOnSale(item.id, 20)}>List on Sale</Button>
                                    }
                                    <Button variant="success">Approve</Button>
                                    <Button variant="warning">Cancel Approve</Button>
                                </div> : <div></div>}

                                {item.owner === item.creator ?
                                    <div>
                                        <Button variant="danger" onClick={(e) => props.burnToken(item.id)}>Burn Token</Button>
                                    </div>
                                    :
                                    <div>
                                    </div>
                                }
                            </Card.Body>
                        </Card>
                    );
                })}
        </div >
    )
}

export default CreatedNFT;