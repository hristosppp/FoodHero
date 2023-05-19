import { Table,CloseButton, Button, Card, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import axios from "axios";

export default function Orders({orders}){
    const router = useRouter();
    const status = ["Eingegangen", "Zubereitung", "Unterwegs", "Ausgeliefert"];


    
    return(
        <div>
            <h1>Admin Backend</h1>
            <div className="row mt-4">
                <div className="col-12">
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>Order number</th>
                                <th>Name</th>
                                <th>Adress</th>
                                <th>Satus</th>
                            </tr>
                        </thead>
                        {orders.map((order) => {
                            <tbody key={order._id}>
                            <tr>
                                <td>{order._id}</td>
                                <td>{order.kunde}</td>
                                <td>{order.adresse}</td>
                                <td>
                                    <span>{status[order.status]} </span>
                
                                </td>
                            </tr>
                        </tbody>
                        })}

                    </Table>
                </div>
            </div>
        </div>
    )
}


export async function getServerSideProps(){
    const res = await axios.get(`http://localhost:3000/api/orders}`);

    return{
        props: {orders: res.data},
    }
}