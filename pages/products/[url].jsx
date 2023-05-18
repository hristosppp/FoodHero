import Link from "next/link";
import Image from "next/image";
import { ListGroup, Button, ListGroupItem } from "react-bootstrap";
import mongodb from "@/utils/mongodb";
import Product from "@/models/Product";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProducts } from "@/redux/cartSlice";
import { v4 as uuidv4} from "uuid";
import { useRouter } from "next/router";

export default function Productpage({product}){
    const [preis, setPreis] = useState(product.preis);
    const [extras, setExtras] = useState([]);
    const [menge, setMenge] = useState(1);
    const dispatch = useDispatch();
    const router = useRouter();

    const addExtra = (e, extra) => {
        const checked = e.target.checked;

        if(checked){
            setPreis((prevPreis) => prevPreis + extra.preis);
            setExtras([...extras, extra]);
        }else{
            setPreis((prevPreis) => prevPreis - extra.preis);
            setExtras(extras.filter((alleExtras) => alleExtras._id !== extra._id));
        }
    }

    const toCart = () => {
        const _id = uuidv4();
        dispatch(addProducts({...product, extras, preis, menge, _id}));
        router.push("/cart");
    }

    
    if(!product){
        return (
            <div>
                <h2>Product not found</h2>
            </div>
        )
    }

    return(
        <div>
            <div>
                <Link href="/">
                    back to Productlist
                </Link>
            </div>

            <div className="row row-cols-2 mt-2">
                <div>
                    <Image className="round-3" src={product.bild} alt={product.name} width={600} height={600} layout="responsive" />
                </div>
                <div>
                    <h1>
                        {product.name}
                    </h1>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h2 className="text-danger">
                                {preis.toFixed(2)} €
                            </h2>
                        </ListGroupItem>
                        <ListGroupItem>
                            {product.beschreibung}
                        </ListGroupItem>
                        <ListGroupItem>
                            {product.extras.length ? "Extras: " : <p></p>}
                            {product.extras.map( extra => {
                                return(
                                    <span key={extra.name}>
                                        {extra.text}<input 
                                        className="form-check-input me-2" 
                                        type="checkbox" 
                                        id={extra.text}
                                        onChange={(e) => {addExtra(e, extra)}} />
                                    </span>
                                )
                            })}
                        </ListGroupItem>
                        <ListGroupItem>
                            <input className="form-control w-50" type="number" value={menge} min="1" max="100" onChange={(e)=> setMenge(e.target.value)}></input>
                        </ListGroupItem>
                        <ListGroupItem>
                            <div className="row shadow">
                                <Button variant="danger" onClick={toCart}>add to Card</Button>
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const url = context.params.url
    await mongodb.dbConnect();
    const product = await Product.findOne({url}).lean();
    return {
        props: {
            product: JSON.parse(JSON.stringify(product))
        }
    }
}