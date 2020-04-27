import { retrieveAllPosts } from "./";
const fetch = require("node-fetch");

describe("retrieve all post", () => {
  it("it should retrieve all post", async () => {
    const allPost = await retrieveAllPosts();
    expect(allPost).toBeDefined();
    expect(allPost).toBeInstanceOf(Array);
    allPost.forEach((post) => {
      expect(post).toBeDefined();
      expect(post).toBeInstanceOf(Object);
      expect(post.id).toBeDefined();
      expect(typeof post.id).toMatch("number");
      expect(post.title).toBeDefined();
      expect(typeof post.title).toMatch("string");
      expect(post.content).toBeDefined();
      expect(typeof post.content).toMatch("string");
      expect(post.lat).toBeDefined();
      expect(typeof post.lat).toMatch("string");
      expect(post.long).toBeDefined();
      expect(typeof post.long).toMatch("string");
      expect(post.image_url).toBeDefined();
      expect(typeof post.image_url).toMatch("string");
      expect(post.created_at).toBeDefined();
      expect(typeof post.created_at).toMatch("string");
      expect(post.updated_at).toBeDefined();
      expect(typeof post.updated_at).toMatch("string");
    });
  });
});
