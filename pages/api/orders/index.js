import mongodb from "@/utils/mongodb";
import Orders from "@/models/Orders";

export default async function handler(req, res) {
    const {method} = req;

    await mongodb.dbConnect();

    if(method === "GET"){
        try {
            const orders = await Orders.find();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json(error)
        }
    }
    if(method === "POST"){
        try{
            const order = await Orders.create(req.body);
            res.status(200).json(order);
        }catch(error){
            res.status(500).json(error);
        }
    }
}