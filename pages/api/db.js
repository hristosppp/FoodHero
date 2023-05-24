// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import mongodb from "../../utils/mongodb";
import data from "../../jsondb/products.json";
import Product from "../../models/Product";


export default async function handler(req, res) {
  await mongodb.dbConnect();
  await Product.deleteMany();
  await Product.insertMany(data)
  await mongodb.dbDisconnect();
  res.send({ text: 'Daten gespeichert' })
}
