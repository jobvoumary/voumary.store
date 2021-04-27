// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {query } from 'faunadb'
import { fauna } from './../../../services/fauna';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { id } = req.body
        await fauna.query(
            query.Delete(
                query.Ref(
                    query.Collection('products'),
                    id                    
                )
            )
          )
        res.status(201).send()
    } 
    else  {
        res.status(200).send()
    }
}
  