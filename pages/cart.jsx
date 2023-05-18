import { Table,CloseButton, Button, Card } from "react-bootstrap";
import Image from "next/image";

export default function Cart(){
    return(
        <div>
            <h1>Cart</h1>
            <div className="row mt-4">
                <div className="col-9">
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Extras</th>
                                <th>Amount</th>
                                <th>Sum</th>
                                <th><CloseButton disabled /></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Image src={"/images/products/cola.jpg"} alt="cola" width={50} height={50} />
                                </td>
                                <td>Cola</td>
                                <td>doppelt</td>
                                <td>1</td>
                                <td>1.99</td>
                                <td><Button className="btn-sm">x</Button></td>
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
                                <Button variant="primary">To Checkout</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}