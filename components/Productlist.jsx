import Link from "next/link";
import data from "../jsondb/products.json";
import { Card, Button } from "react-bootstrap";


export default function Productlist() {
    return(
        <div>
            <div className="row row-cols-3">
                {data.map((product) => {
                    return(
                        <div key={product.name} className="mt-3 col">
                            <Card>
                                <Link href={`/products/${product.url}`} passHref>
                                    <Card.Img variant="top" src={product.bild} />
                                </Link>
                                <Card.Body>
                                    <Card.Title>
                                        {product.name} {product.preis}€
                                    </Card.Title>
                                    <Card.Text>
                                        {product.beschreibung}
                                    </Card.Text>
                                    <Button variant="danger">add to Card</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    )
                })}
            </div>
            <br></br>
        </div>
    )
}