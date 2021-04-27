// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {query } from 'faunadb'
import { fauna } from './../../../services/fauna';

export default async (req, res) => {
    if (req.method === 'POST') {
        const product = req.body
        await fauna.query(
            query.Create(
              query.Collection('products'),
              {data: {
                ...product,
                available: true,
              }}
            )
          )
        res.status(201).send()
    } 
    else  {
        res.status(200).send()
    }
}
  