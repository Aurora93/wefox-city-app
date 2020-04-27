const fetch = require("node-fetch");

interface CityPost {
  id: number;
  title: string;
  content: string;
  lat: string;
  long: string;
  image_url: string;
}

interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

async function createPost<T>(data: CityPost): Promise<void> {
  const response: HttpResponse<T> = await fetch(
    "https://wf-challenge-yn8dgzymk9.herokuapp.com/api/v1/posts/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  if (response.status === 201) return;

  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

export default createPost;
