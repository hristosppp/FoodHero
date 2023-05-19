import mongodb from "@/utils/mongodb";
import Orders from "@/models/Orders";

export default async function handler(req, res) {
    const {method, query: {num}} = req;

    await mongodb.dbConnect();

    if(method === "GET"){
        try {
            const orders = await Orders.findById(num);
            res.status(200).json(orders);
        } catch (error) {
            res.status(200).json(error)
        }
    }
    
    if(method === "PUT"){
        try{
            const order = await Orders.findByIdAndUpdate(num, req.body, {new:true});
            res.status(200).json(order);
        }catch(error){
            res.status(500).json(error);
        }
    } 

    if(method === "DELETE"){
        try{
            const order = await Orders.findByIdAndDelete(num);
            res.status(200).json(order);
        }catch(error){
            res.status(500).json(error);
        }
    }
   
}