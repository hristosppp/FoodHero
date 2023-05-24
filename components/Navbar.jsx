import Image from "next/image";
import Link from "next/link";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";



export default function Navbar() {
  const cAmount = useSelector( (state) => state.cart.cAmount);

    return (
      <div className="shadow sticky-top p-2 mb-2 bg-danger">
        <div className="d-flex justify-content-between aling-items-center">
            <Link href="/">
                <Image src={"/images/imagesFastFood.png"} alt="logo" width={140} height={75} />
            </Link>
            <Link href="/cart">
              {cAmount > 0 
                ? 
                <>
                  <Image src={"/images/warenkorb.png"} alt="logo" width={60} height={50} />
                  <Badge pill bg="success" style={{position: "absolute", right: "25px", top: "25px"}}>{cAmount}</Badge>
                </>
                :
                <Image src={"/images/warenkorb.png"} alt="logo" width={60} height={50} />
              }
                
            </Link>
        </div>
      </div>
    )
  }