import { Table,CloseButton, Button, Card, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import axios from "axios";

export default function Orders({order}){
    const router = useRouter();
    const {num} = router.query;

    let status;
    switch (order.status){
        case 0:
            status = "Eingegangen";
            break;
        case 1:
            status = "Zubereitung";
            break;
        case 2:
            status = "Unterwegs";
            break;
        case 3:
            status = "Ausgeliefert";
            break;
    }

    if(num !== order._id){
        return(
            <div>
                <h2>Ordernumber {num} not found</h2>
                <Button variant="primary" onClick={()=> router.push("/")}>to Menu</Button>
            </div>
        )
    }else{

    
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
                                <td>{order.kunde}</td>
                                <td>{order.adresse}</td>
                                <td>
                                    <span>{status} </span>
                                    {order.status < 3 ? 
                                        ( <Spinner animation="border" variant="success" size="sm" /> )
                                        : 
                                        ( <span>√</span>)
                                    }
                                    
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>Product name</th>
                                <th>Extras</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.produkte.map((product) => (
                                <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>
                                {product.extras.map((extra) =>(
                                    <span key={extra._id}>{extra}</span>
                                ))}
                                </td>
                                <td>{product.menge}</td>
                            </tr>
                            ))}

                        </tbody>
                    </Table>
                </div>
                <div className="col-3 p-2">
                    <div className="shadow">
                        <Card>
                            <Card.Header as="h5">Total</Card.Header>
                            <Card.Body className="text-center">
                                <Card.Title>
                                    {order.betrag.toFixed(2)} €
                                </Card.Title>
                                {order.zahlung === 0 ?
                                (<Button variant="danger disabled">offen</Button>)
                                :
                                (<Button variant="success disabled">bezahlt</Button>)
                                }
                                
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export async function getServerSideProps({params}){
    const res = await axios.get(`${process.env.SERVER_URL}pages/api/orders/${params.num}`);

    return{
        props: {order: res.data},
    }
}