const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => acc + cur.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((acc, cur) => acc && acc.likes > cur.likes ? acc : cur, undefined)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}