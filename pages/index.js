import Productlist from "@/components/Productlist";
import Slider from "@/components/Slider";
import Product from "@/models/Product";
import mongodb from "@/utils/mongodb";


export default function Home({products}) {
  return (
    <>
      <Slider />
      <Productlist products={products} />
    </>
  )
}

export async function getServerSideProps(){
  await mongodb.dbConnect();
  const products = await Product.find().lean();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  }
}
