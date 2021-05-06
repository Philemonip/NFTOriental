import { useSelector, useDispatch } from "react-redux";
import { Button, Card } from "react-bootstrap";

const CreatedNFT = (props) => {
    const currentUser = useSelector((state) => state.detail.currentUser);
    const items = useSelector((state) => state.detail.items);
    let imgsrc
    let createdArr

    const creatorItems = (items, currentUser) => {
        createdArr = items.filter((i) => i.creator === currentUser)
        console.log('this creator created', createdArr)
    }
    creatorItems(items, currentUser)

    const imgSource = (id) => {
        let imgsrcArr = props.itemArr.filter((i) => i.token_id == id)
        imgsrc = imgsrcArr[0].external_url
        return imgsrc
    }

    return (
        <div className="d-flex">
            {createdArr &&
                createdArr.map((item, index) => {
                    return (
                        <Card style={{ width: '18rem' }} className="mx-2">
                            <Card.Img variant="top" src={imgSource(item.id)} roundedCircle />
                            <Card.Body>
                                <Card.Title className="text-center">{item.itemName}</Card.Title>
                                <Card.Text>
                                    <p className="m-1">Owner: <a href="/">{item.owner.substr(0, 16)}...</a></p>
                                    <p className="m-1">Creator: <a href="/">{item.creator.substr(0, 16)}...</a></p>
                                    <p className="m-1">Id: {item.id}</p>
                                    <p className="m-1">Price {item.price}</p>
                                </Card.Text>

                                <div className="d-flex">
                                    {item.owner === currentUser ? <div>
                                        {item.forSale === true ?
                                            <button className="mx-1" onClick={(e) => props.itemNotForSale(item.id)} >Not for Sale</button> :
                                            <button className="mx-1" onClick={(e) => props.itemOnSale(item.id, 20)}>List on Sale</button>
                                        }
                                        {/* <Button variant="success">Approve</Button>
                                    <Button variant="warning">Cancel Approve</Button> */}
                                    </div> : <div></div>}

                                    {item.owner === item.creator ?
                                        <div>
                                            <button className="mx-1" onClick={(e) => props.burnToken(item.id)}>Burn Token</button>
                                        </div>
                                        :
                                        <div>
                                        </div>
                                    }
                                </div>
                            </Card.Body>
                        </Card>
                    );
                })}
        </div >
    )
}

export default CreatedNFT;