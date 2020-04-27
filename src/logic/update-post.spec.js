import { updatePost } from "./";
const fetch = require("node-fetch");
const { random, floor } = Math;

describe("update post", () => {
  let id,
    title,
    content,
    lat,
    long,
    image_url,
    title2,
    content2,
    lat2,
    long2,
    image_url2;

  beforeEach(async () => {
    title = `title-${random()}`;
    content = `content-${random()}`;
    lat = `${random()}`;
    long = `${random()}`;
    image_url = `image-url-${random()}`;
    title2 = `title-${random()}`;
    content2 = `content-${random()}`;
    lat2 = `${random()}`;
    long2 = `${random()}`;
    image_url2 = `image-url-${random()}`;
  });

  it("it success with correct data", async () => {
    await fetch("https://wf-challenge-yn8dgzymk9.herokuapp.com/api/v1/posts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, lat, long, image_url }),
    });

    let response = await fetch(
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

    await updatePost(
      {
        title: title2,
        content: content2,
        lat: lat2,
        long: long2,
        image_url: image_url2,
      },
      id
    );

    response = await fetch(
      `https://wf-challenge-yn8dgzymk9.herokuapp.com/api/v1/posts/`
    );
    posts = await response.json();

    expect(posts).toBeDefined();
    let updatedPost = posts.find((post) => post.title === title2);
    id = updatedPost.id;
    expect(updatedPost).toBeDefined();
    expect(updatedPost).toBeInstanceOf(Object);
    expect(updatedPost.content).toMatch(content2);
    expect(updatedPost.lat).toMatch(lat2);
    expect(updatedPost.long).toMatch(long2);
    expect(updatedPost.image_url).toMatch(image_url2);
    expect(updatedPost.created_at).toBeDefined();
    expect(updatedPost.updated_at).toBeDefined();
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
