const listHelper = require('../utils/list_helper');

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
];

test('dummy returns one', () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);

  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of an empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test('when a list has only one blog item equals the likes of that', () => {
    const listWithOneBlog = [blogs[0]];
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(listWithOneBlog[0].likes);
  });

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36);
  });
});

describe('favourite blog', () => {
  test('of an empty list is null', () => {
    expect(listHelper.favouriteBlog([])).toBeNull();
  });

  test('when a list has only one blog item equals the item itself', () => {
    const listWithOneBlog = [blogs[0]];
    const {author, title, likes} = blogs[0];
    const expected = { author, title, likes };
    expect(listHelper.favouriteBlog(listWithOneBlog)).toEqual(expected);
  });

  test('of a bigger list returns right item', () => {
    const {author, title, likes} = blogs[2];
    const expected = {author, title, likes};
    expect(listHelper.favouriteBlog(blogs)).toEqual(expected);
  });
});

describe('most blogs', () => {
  test('of an empty list is null', () => {
    expect(listHelper.mostBlogs([])).toBeNull();
  });

  test('when a list has only one blog it returns the author of that item', () => {
    const blogWithOneItem = [blogs[0]];
    expect(listHelper.mostBlogs(blogWithOneItem)).toEqual(
      { author: blogs[0].author, blogs: 1 }
    );
  });

  test('of a bigger list returns right author', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual(
      { author: "Robert C. Martin", blogs: 3 }
    );
  });
});

describe('most likes', () => {
  test('of an empty list is null', () => {
    expect(listHelper.mostLikes([])).toBeNull();
  });

  test('when a list has only one blog it returns that author', () => {
    const blogWithOneItem = [blogs[0]];
    expect(listHelper.mostLikes(blogWithOneItem)).toEqual(
      { author: blogWithOneItem[0].author, likes: blogWithOneItem[0].likes }
    );
  });

  test('of a bigger list returns the right author', () => {
    expect(listHelper.mostLikes(blogs)).toEqual(
      { author: "Edsger W. Dijkstra", likes: 17 }
    );
  });
});
