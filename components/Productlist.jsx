import Link from "next/link";
import { Card, Button } from "react-bootstrap";


export default function Productlist({products}) {
    return(
        <div>
            <div className="row row-cols-3">
                {products?.map((product) => {
                    return(
                        <div key={product.name} className="mt-3 col">
                            <Card>
                                <Link href={`/products/${product.url}`} passHref>
                                    <Card.Img variant="top" src={product.bild} />
                                </Link>
                                <Card.Body>
                                    <Card.Title>
                                        {product.name} {product.preis.toFixed(2)}€
                                    </Card.Title>
                                    <Card.Text>
                                        {product.beschreibung}
                                    </Card.Text>
                                    <Link href={`/products/${product.url}`}>
                                        <Button variant="danger">add to Card</Button>
                                    </Link>
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