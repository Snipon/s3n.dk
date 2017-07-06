export default {

  apiEndpoint: 'https://snipon.cdn.prismic.io/api',

  // -- Access token if the Master is not open
  accessToken: 'MC5XVjVucFNrQUFOc0hzS19s.77-9X--_vRoE77-977-977-977-977-9We-_vQcl77-9IGvvv73vv71zfXfvv71Nfnjvv73vv70oD1nvv70',

  // OAuth
  clientId: 'WV5npSkAAK0AsK_k',
  clientSecret: '0fc7911760a9985952b95c78d69f196d',

  // -- Links resolution rules
  // This function will be used to generate links to Prismic.io documents
  // As your project grows, you should update this function according to your routes
  linkResolver(doc, ctx) {
    return '/';
  },
};
