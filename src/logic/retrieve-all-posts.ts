const fetch = require("node-fetch");

interface CityPost {
  id: number;
  title: string;
  content: string;
  lat: string;
  long: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

async function retrieveAllPosts<T>(): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(
    "https://wf-challenge-yn8dgzymk9.herokuapp.com/api/v1/posts/"
  );
  if (response.status === 200) {
    try {
      let body = await response.json();
      return body;
    } catch (ex) {}
  }

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

export default retrieveAllPosts;
