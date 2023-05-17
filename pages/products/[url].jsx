import { useRouter } from "next/router";
import data from "../../jsondb/products.json"
import Link from "next/link";
import Image from "next/image";
import { ListGroup, Button, ListGroupItem } from "react-bootstrap";


export default function Productpage(){
    const router = useRouter();
    const {url} = router.query;
    const product = data.find((product) => product.url === url);

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
                                {product.preis} €
                            </h2>
                        </ListGroupItem>
                        <ListGroupItem>
                            {product.beschreibung}
                        </ListGroupItem>
                        <ListGroupItem>
                            Extras:
                            doppelt <input className="form-check-input me-2" type="checkbox" />
                            extra Pommes <input className="form-check-input me-2" type="checkbox" />
                        </ListGroupItem>
                        <ListGroupItem>
                            <input className="form-control w-50" type="number" placeholder="1" min="1"></input>
                        </ListGroupItem>
                        <ListGroupItem>
                            <div className="row shadow">
                                <Button variant="danger">add to Card</Button>
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                </div>
            </div>
        </div>
    )
}