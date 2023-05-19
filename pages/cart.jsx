import { Table,CloseButton, Button, Card } from "react-bootstrap";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { removeProduct, leeren } from "@/redux/cartSlice";
import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";


export default function Cart(){
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const clientID = "AeDAOELMF2BRbMxl2g7qqAgMy2ZfVg3IE-T920N7oEN_oWzfkr_5NV1FxNIAViXnvUAmBiSSTTucz9xP";
    const [kasse, setKasse] = useState(false);
    const router = useRouter()

    const remove = (product) => {
        dispatch(removeProduct(product))
    }

    const amount = cart.totalSum.toFixed(2);
    const currency = "EUR";
    const style = { 
        "layout": "vertical",
        "height": 30
    };

    const createOrder = async (data) => {
        try {
            const res = await axios.post("http://localhost:3000/api/orders", data);

            if(res.status === 201){
                dispatch(leeren());
                router.push(`/orders/${res.data._id}`);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const ButtonWrapper = ({currency, showSpinner }) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

        return(
        <>
            { (showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            //Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        
                        const client = details.purchase_units[0].shipping;
                        createOrder({
                            kunde: client.name.full_name,
                            adresse: client.address.address_line_1 + ", " + client.address.admin_area_2,
                            betrag: cart.totalSum,
                            status: 0,
                            zahlung: 1,
                            produkte: cart.produkte.map((produkt) => (
                            {
                                name: produkt.name,
                                menge: produkt.menge, 
                                extras: produkt.extras.map(extra => (extra.text))
                            }))
                        });
                    });
                }}
            />
        </>
        );
    }

    return(
        
        <div>
            {cart.cAmount === 0 ? (
                <h2>The Cart is empty</h2>
            ) :
            (
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
                            {cart.products.map( product => {
                                return(
                            <tr key={product._id}>
                                <td>
                                    <Image src={product.bild} alt={product.name} width={50} height={50} />
                                </td>
                                <td>
                                <Link className="text-danger" href={`/products/${product.url}`}>{product.name}</Link></td>
                                <td>
                                {product.extras.map( extra => {
                                    return(
                                        <span key={extra._id}>
                                            {extra.text} 
                                        </span>
                                    )
                                })}
                                </td>
                                <td>{product.menge}</td>
                                <td>{(product.preis*product.menge).toFixed(2)} €</td>
                                <td><Button className="btn-sm" onClick={() => remove(product)}>x</Button></td>
                            </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
                <div className="col-3 p-2">
                    <div className="shadow">
                        <Card>
                            <Card.Header as="h5">Total</Card.Header>
                            <Card.Body className="text-center">
                                <Card.Title>
                                    {cart.totalSum.toFixed(2)} €
                                </Card.Title>
                                
                                { kasse ? 
                                
                                    (<PayPalScriptProvider
                                    options={{
                                        "client-id": clientID,
                                        components: "buttons",
                                        currency: "EUR",
                                    }}
                                >
                                    <ButtonWrapper
                                        currency={currency}
                                        showSpinner={false}
                                    />
                                </PayPalScriptProvider>)
                                
                                    :
                                
                                    <Button onClick={() => setKasse(true)} variant="primary">To Checkout</Button>
                                }
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
            </div>
            )}
        </div>
    )
}