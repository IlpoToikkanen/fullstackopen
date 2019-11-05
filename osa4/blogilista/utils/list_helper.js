const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  const likes = blogs.reduce(reducer, 0)
  return blogs.length === 0 ? 0 : likes / blogs.length
}

const favouriteBlog = blogs => {
  const mostLiked = blogs.reduce(
    (prev, current) => (prev.likes > current.likes ? prev : current),
    0
  )
  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes
  }
}

const mostBlogs = blogs => {
  // Creating an object with author + amount of blogs pairs "{author: x, ...}"
  const blogsByAuthor = blogs.reduce(
    (total, post) => ({
      ...total,
      [post.author]: total[post.author] ? total[post.author] + 1 : 1
    }),
    {}
  )
  // Finding the author with highest value of blogposts
  const author = Object.keys(blogsByAuthor).reduce((prev, current) =>
    blogsByAuthor[prev] > blogsByAuthor[current] ? prev : current
  )
  return { author: author, blogs: blogsByAuthor[author] }
}

const mostLikes = blogs => {
  const likesByAuthor = blogs.reduce(
    (total, post) => ({
      ...total,
      [post.author]: total[post.author]
        ? total[post.author] + post.likes
        : post.likes
    }),
    {}
  )
  const author = Object.keys(likesByAuthor).reduce((prev, current) =>
    likesByAuthor[prev] > likesByAuthor[current] ? prev : current
  )

  return { author: author, likes: likesByAuthor[author] }
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }
