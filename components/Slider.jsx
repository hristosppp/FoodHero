import { Carousel } from "react-bootstrap";
import Image from "next/image";

export default function Slider(){
    return(
        <div>
            <Carousel controls={false} fade={true} interval={3000}>
                <Carousel.Item>
                    <Image className="d-block w-100 rounded-3" src="/images/burger.jpg" alt="burger" width={3000} height={700} />
                </Carousel.Item>
                <Carousel.Item>
                    <Image className="d-block w-100 rounded-3" src="/images/burrito.jpg" alt="burrito" width={3000} height={700} />
                </Carousel.Item>
                <Carousel.Item>
                    <Image className="d-block w-100 rounded-3" src="/images/pizza.jpg" alt="pizza" width={3000} height={700} />
                </Carousel.Item>
            </Carousel>
            <h1>Essen</h1>
        </div>
    )
}