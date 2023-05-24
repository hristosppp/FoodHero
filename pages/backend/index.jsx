import { Table, Button, CloseButton } from "react-bootstrap";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

export default function Orders({orders}){
    const router = useRouter();
    const status = ["Eingegangen", "Zubereitung", "Unterwegs", "Ausgeliefert"];

    const statusUpdate = async (id, curStatus) => {
        try {
            if(curStatus <= 2){
                await axios.put(`../api/orders/${id}`, {status: curStatus + 1});
                router.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }
    const removeOrder = async (id) => {
        try {
            
                await axios.delete(`../api/orders/${id}`);
                router.reload();
        } catch (error) {
            console.log(error);
        }
    }
    
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
                                <th><CloseButton disabled/></th>
                            </tr>
                        </thead>
                        {orders.map((order) => {
                            return (
                                <tbody key={order._id}>
                            <tr>
                                <td>
                                <Link className="text-danger" href={`/orders/${order._id}`}>
                                {order._id}
                                </Link>
                                </td>
                                <td>{order.kunde}</td>
                                <td>{order.adresse}</td>
                                <td>
                                    <Button onClick={() => statusUpdate(order._id, order.status)}>{status[order.status]}</Button>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => removeOrder(order._id)}>X</Button>
                                </td>
                            </tr>
                        </tbody>
                            )
                        })}

                    </Table>
                </div>
            </div>
        </div>
    )
}


export async function getServerSideProps(ctx){
    const myCookie = ctx.req?.cookies || "";
    if(myCookie.token !== process.env.TOKEN){
        return{
            redirect:{
                destination: "/backend/login",
                permant: false
            }
        }
    }
    const res = await axios.get(`${process.env.SERVER_URL}api/orders`);
    return{
        props: {orders: res.data},
    }
}