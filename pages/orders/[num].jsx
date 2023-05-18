import { Table,CloseButton, Button, Card, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Orders(){
    const router = useRouter();
    const {num} = router.query;
    return(
        <div>
            <h1>Order status</h1>
            <div className="row mt-4">
                <div className="col-9">
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>Order number</th>
                                <th>Name</th>
                                <th>Adress</th>
                                <th>Satus</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{num}</td>
                                <td>doppelt</td>
                                <td>1</td>
                                <td>
                                    <span>in process </span>
                                    <Spinner animation="border" variant="success" size="sm" />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="col-3 p-2">
                    <div className="shadow">
                        <Card>
                            <Card.Header as="h5">Total</Card.Header>
                            <Card.Body className="text-center">
                                <Card.Title>
                                    6.95€
                                </Card.Title>
                                <Button variant="success disabled">payed</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}