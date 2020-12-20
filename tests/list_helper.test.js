const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const blog1 = {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
  const blog2 = {
    _id: 'testid2',
    title: 'Test Title 2',
    author: 'Test Author 2',
    url: 'http://www.test.url/2',
    likes: 2,
    __v: 0
  }
  const blog3 = {
    _id: 'testid3',
    title: 'Test Title 3',
    author: 'Test Author 3',
    url: 'http://www.test.url/3',
    likes: 3,
    __v: 0
  }
  const listWithOneBlog = [
    blog1
  ]

  test('should return the list of the only blog when only one blog is listed', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('should return 0 when the list of blogs is empty', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('should return the sum of likes of all blogs when more than one blog is listed', () => {
    const result = listHelper.totalLikes([blog1, blog2, blog3])
    expect(result).toBe(10)
  })
})