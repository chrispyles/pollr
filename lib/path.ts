const Path = {
  HOME: '/',
  QUESTION: '/polls/[questionId]',
  ALL_RESPONSES: '/polls/[questionId]/responses',
  RESPONSE: '/polls/[questionId]/responses/[responseId]',
};


export function makeHref(path: string, query: {}) {
  return {
    pathname: path,
    query,
  };
}


export default Path;
