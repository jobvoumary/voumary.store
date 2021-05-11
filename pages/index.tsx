import Dashboard from './_home'
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { fauna } from '../services/fauna';
import { query } from 'faunadb';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Catálogo - @voumary</title>
        <meta name="og:image" content="https://i.imgur.com/UAAhJRr.png"/>
      </Head>
     
      <Dashboard products={props.products}/>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const productsRaw = await fauna.query(
        query.Map(
          query.Paginate(
            query.Match(
              query.Index('products')
            )
          ), 
          (ref) => query.Get(ref)
        )
      )
  const products = productsRaw.data.map(productRaw => (
    {
      id: productRaw.ref.id,
      ...productRaw.data,
    }
  )
    ).filter(product => product.price)
    .map((product, index, products) => products[products.length - index - 1])
  return {
   props:{
     products: products
   }
 }
}