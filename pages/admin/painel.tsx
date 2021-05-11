import withSession from "../../lib/session";

import { query } from "faunadb";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { fauna } from "../../services/fauna";
import Dashboard from "../_home";

export default function Admin(props) {
  const isAdmin = !!props.user
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </Head>

      <Dashboard products={props.products} isAdmin={isAdmin}/>
    </div>
  )
}
export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");

  if (user === undefined) {
    res.setHeader("location", "/admin/login");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }
  else {
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

    return {
      props: { user: req.session.get("user"),  products: products },
    }
  };
});
