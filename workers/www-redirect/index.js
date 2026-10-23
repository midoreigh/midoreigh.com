// Permanently redirects www.midoreigh.com/* to midoreigh.com/*, keeping path and query.
export default {
  fetch(request) {
    const url = new URL(request.url);
    url.hostname = 'midoreigh.com';
    return Response.redirect(url.toString(), 301);
  },
};
