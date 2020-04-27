const fetch = require("node-fetch");

interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

async function deletePost<T>(id: number): Promise<void> {
  const response: HttpResponse<T> = await fetch(
    `https://wf-challenge-yn8dgzymk9.herokuapp.com/api/v1/posts/${id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (response.status === 204) return;

  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

export default deletePost;
