import { createPost } from "./";
const fetch = require("node-fetch");
const { random, floor } = Math;

describe("create post", () => {
  let id, title, content, lat, long, image_url;

  beforeEach(async () => {
    title = `title-${random()}`;
    content = `content-${random()}`;
    lat = `${random()}`;
    long = `${random()}`;
    image_url = `image-url-${random()}`;
  });

  it("it success with correct data", async () => {
    await createPost({ id, title, content, lat, long, image_url });

    const response = await fetch(
      `https://wf-challenge-yn8dgzymk9.herokuapp.com/api/v1/posts/`
    );
    let posts = await response.json();

    expect(posts).toBeDefined();
    let createdPost = posts.find((post) => post.title === title);
    id = createdPost.id;
    expect(createdPost).toBeDefined();
    expect(createdPost).toBeInstanceOf(Object);
    expect(createdPost.content).toMatch(content);
    expect(createdPost.lat).toMatch(lat);
    expect(createdPost.long).toMatch(long);
    expect(createdPost.image_url).toMatch(image_url);
    expect(createdPost.created_at).toBeDefined();
    expect(createdPost.updated_at).toBeDefined();
  });

  afterAll(() => {
    (async () => {
      const response = await fetch(
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
    })();
  });
});
