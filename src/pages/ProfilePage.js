import Navi from "../components/Common/Navbar";
import { Jumbotron, Button, Image, Col } from "react-bootstrap";

function ProfilePage() {
    return (
        <>
            <Navi />
            <Jumbotron>
                <h1>Hello, name</h1>
                <Col xs={6} md={4}>
                    <Image src="https://cdn.vox-cdn.com/thumbor/ypiSSPbwKx2XUYeKPJOlW0E89ZM=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/7812969/nick_young_confused_face_300x256_nqlyaa.png" roundedCircle />
                </Col>
                <Button variant="info">Edit Profile</Button>
            </Jumbotron>
            <div>
                <p>Address</p>
                <p>Edit Profile / Sharelink</p>

                <p>Collectibles</p>
                <Button variant="info">List on Sale</Button>
                <Button variant="info">Not for Sale</Button>
                <Button variant="info">Approve</Button>
                <Button variant="info">Cancel Approve</Button>

                {/* Only Creator functions */}
                <Button variant="danger">Set Token URI</Button>
                <Button variant="danger">Burn Token</Button>
                <p>Activity / Transactions</p>

            </div>
        </>

    )
}

export default ProfilePage;