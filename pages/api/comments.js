// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GraphQLClient, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken=process.env.GRAPHCMS_TOKEN;
export default async function comments(req,res) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    header: {
      authorization: `Bearer ${graphcmsToken}`,
    }
  });
  const { name, email, slug, comment } = req.body;
  const query = gql`
  mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
    createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
  }
  `
  const result = await graphQLClient.request(query, req.body);

  return res.status(200).send(result);
}
