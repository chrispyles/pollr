const Path = {
  HOME: '/',
  QUESTION: '/polls/[questionId]',
  ALL_RESPONSES: '/polls/[questionId]/responses',
  RESPONSE: '/polls/[questionId]/responses/[responseId]',
  CREATE_POLL: '/api/polls/create',
  CREATE_RESPONSE: '/api/responses/create',
};


export function makeHref(path: string, query: {}) {
  return {
    pathname: path,
    query,
  };
}


export default Path;
