import { Table,CloseButton, Button, Card } from "react-bootstrap";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { removeProduct } from "@/redux/cartSlice";
import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

export default function Cart(){
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const clientID = "AeDAOELMF2BRbMxl2g7qqAgMy2ZfVg3IE-T920N7oEN_oWzfkr_5NV1FxNIAViXnvUAmBiSSTTucz9xP";
    const [kasse, setKasse] = useState(false)

    const remove = (product) => {
        dispatch(removeProduct(product))
    }

    const amount = cart.totalSum;
    const currency = "EUR";
    const style = { "layout": "vertical" };

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
                        console.log(details);
                        console.log(details.purchase_units[0].shipping);
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
                                <td>{(product.preis*product.menge).toFixed(2)}</td>
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
                                    {cart.totalSum.toFixed(2)}
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