const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const blogList = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('Total likes', () => {
  test('Summs likes of all blogs and compares the values', () => {
    const result = listHelper.totalLikes(blogList)
    expect(result).toBe(36)
  })
})

describe('Most liked blog', () => {
  test('Searches the most liked blog and returns it', () => {
    const result = listHelper.favoriteBlog(blogList)
    expect(result).toEqual(blogList[2])
  })
})

describe('Returns author with the most blogs', () => {
  test('Searches the author with most blogs and returns it with num. of blogs', () => {
    const result = listHelper.mostBlogs(blogList)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('Returns author with the most likes', () => {
  test('Searches the author with most summed likes and returns it', () => {
    const result = listHelper.mostLikes(blogList)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})