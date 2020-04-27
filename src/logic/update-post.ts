export interface UpdatePostProps {
  title: string;
  content: string;
  lat: string;
  long: string;
  image_url: string;
}

export interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

async function updatePost<T>(data: UpdatePostProps, id: number): Promise<void> {
  const response: HttpResponse<T> = await fetch(
    `https://wf-challenge-yn8dgzymk9.herokuapp.com/api/v1/posts/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  if (response.status === 200) return;

  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

export default updatePost;
