import { deletePost } from "./";
const fetch = require("node-fetch");
const { random, floor } = Math;

describe("delete post", () => {
  let id, title, content, lat, long, image_url;

  beforeEach(async () => {
    title = `title-${random()}`;
    content = `content-${random()}`;
    lat = `${random()}`;
    long = `${random()}`;
    image_url = `image-url-${random()}`;
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

    await deletePost(id);

    response = await fetch(
      `https://wf-challenge-yn8dgzymk9.herokuapp.com/api/v1/posts/`
    );
    posts = await response.json();

    let deletedPost = posts.find((post) => post.id === id);
    expect(deletedPost).toBeUndefined();
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

// const { random, floor } = Math;
// const deletePost = require("./create-post");

// export interface CityPost {
//   id: number;
//   title: string;
//   content: string;
//   lat: string;
//   long: string;
//   image_url: string;
// }
// export interface HttpResponse<T> extends Response {
//   parsedBody?: T;
// }

// describe("create post", () => {
//   let id, title, content, lat, long, image_url;

//   beforeEach(() => {
//     id = random();
//     title = `title-${random()}`;
//     content = `content-${random()}`;
//     lat = `${random()}`;
//     long = `${random()}`;
//     image_url = `image-url-${random()}`;
//   });

//   it("it success with correct data", async () => {
//     await function <T>(data: CityPost): Promise<void> {
//       const response: HttpResponse<T> = await fetch(
//         "https://wf-challenge-yn8dgzymk9.herokuapp.com/api/v1/posts/",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(data),
//         }
//       );
//       if (response.status === 201) return;

//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//     };

//     await deletePost
//   });

//   afterAll(async () => {
//     await function <T>(id: number): Promise<void> {
//       const response: HttpResponse<T> = await fetch(
//         `https://wf-challenge-yn8dgzymk9.herokuapp.com/api/v1/posts/${id}`,
//         {
//           method: "DELETE",
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       if (response.status === 204) return;

//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//     };
//   });
// });
