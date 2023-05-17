import Image from "next/image";
import Link from "next/link";
import { Badge } from "react-bootstrap";



export default function Navbar() {
    return (
      <div className="shadow sticky-top p-2 mb-2 bg-danger">
        <div className="d-flex justify-content-between aling-items-center">
            <Link href="/">
                <Image src={"/images/imagesFastFood.png"} alt="logo" width={140} height={75} />
            </Link>
            <Link href="/orders">
                <Image src={"/images/warenkorb.png"} alt="logo" width={60} height={50} />
                <Badge pill bg="success">2</Badge>
            </Link>
        </div>
      </div>
    )
  }