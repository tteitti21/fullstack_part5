const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    __v: 0
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  const allBlogs = initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = allBlogs.map(blog => blog.save())
  await Promise.all(promiseArray)
})


describe('Tests that content-type is JSON and all the blogs are included', () => {
  test('blogs are fetched from a different database', async () => {

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(6)
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)

  })
})

describe('Tests that id is not named _id for every blog', () => {
  test('tests that id is not named _id', async () => {

    const response = await api.get('/api/blogs')
    response.body.forEach( (b) => expect(b.id).toBeDefined())
  })
})

describe('Posted blogs must have all attributes and length of array increased', () => {
  test('new blog can be added', async () => {
    const newBlog = {
      title: 'New blog',
      author: 'Tino Teittinen',
      url: 'http://howToWriteaBlog.com//firstBlog.html',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)

    const newNumberOfBlogs = await api.get('/api/blogs')
    newNumberOfBlogs.body.forEach( (blog) => expect(blog.id).toBeDefined())
    expect(newNumberOfBlogs.body).toHaveLength(initialBlogs.length + 1)

    const titles = newNumberOfBlogs.body.map(n => n.title)
    expect(titles).toContain(
      'New blog'
    )
  })
})

describe('Likes property should default to 0 if its missing', () => {
  test('empty likes defaults to 0', async () => {
    const newBlog = {
      title: 'New blog',
      author: 'Tino Teittinen',
      url: 'http://howToWriteaBlog.com//firstBlog.html',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)

    const newNumberOfBlogs = await api.get('/api/blogs')

    if (Object.hasOwn(newBlog, 'likes')) {
      expect(true)
    } else {
      const testBlog = newNumberOfBlogs.body.filter(blog => blog.title === 'New blog')
      expect(testBlog[0].likes).toBe(0)
    }
  })
})

describe('Title or url missing => 400 Bad Request', () => {

  test('title missing', async () => {
    const newBlog = {
      author: 'Tino Teittinen',
      url: 'http://howToWriteaBlog.com//firstBlog.html',
    }

    if (!Object.hasOwn(newBlog, 'title') || !Object.hasOwn(newBlog, 'url')) {
      await api.
        post('/api/blogs')
        .send(newBlog)
        .expect(400)
    }
  })

  test('url missing', async () => {
    const newBlog = {
      title: 'New blog',
      author: 'Tino Teittinen',
    }

    if (!Object.hasOwn(newBlog, 'title') || !Object.hasOwn(newBlog, 'url')) {
      await api.
        post('/api/blogs')
        .send(newBlog)
        .expect(400)
    }
  })

  test('title and url missing', async () => {
    const newBlog = {
      author: 'Tino Teittinen',
    }

    if (!Object.hasOwn(newBlog, 'title') || !Object.hasOwn(newBlog, 'url')) {
      await api.
        post('/api/blogs')
        .send(newBlog)
        .expect(400)
    }
  })
})

describe('deleting a specific blog', () => {
  test('deleting a valid blog based on id', async () => {

    const blogs = await api.get('/api/blogs')
    const blogToDelete = blogs.body[0]
    console.log(blogToDelete)
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const refreshedBlogs = await api.get('/api/blogs')
    expect(refreshedBlogs.body).toHaveLength(initialBlogs.length -1)

    const titles = refreshedBlogs.body.map(blog => blog.title)
    expect(titles).not.toContain(blogs.title)
  })
})

describe('updating a specific blog', () => {
  test('updating a valid blog based on id', async () => {

    const blogs = await api.get('/api/blogs')
    const blogToUpdate = blogs.body[0]
    const updatedBlog = {
      'likes': 1000
    }
    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
    expect(response.body.likes).toBe(1000)

    const refreshedBlogs = await api.get('/api/blogs')
    const inspectableBlog = refreshedBlogs.body[0]
    expect(inspectableBlog).toEqual({
      id: blogToUpdate.id,
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 1000,
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})