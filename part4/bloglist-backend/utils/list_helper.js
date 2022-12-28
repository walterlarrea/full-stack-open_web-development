// const dummy = (blogs) => {
//   return 1
// }

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs
      .reduce((sum, blog) => {
        return sum + blog.likes
      }, 0)
}

const favouriteBlog = (blogs) => {
  const favouriteBlog = blogs.length === 0
    ? {}
    : blogs
      .reduce((acc, blog) => {
        return acc.likes > blog.likes ? acc : blog
      })

  return {
    title: favouriteBlog.title,
    author: favouriteBlog.author,
    likes: favouriteBlog.likes
  }
}

const mostBlogs = (blogs) => {
  let authorsBlogCounts = {}
  let authorWithMostBlogs = {}

  for (const blog of blogs) {
    authorsBlogCounts[blog.author] ? authorsBlogCounts[blog.author] += 1 : authorsBlogCounts[blog.author] = 1
  }

  for (const key in authorsBlogCounts) {
    if (Object.hasOwnProperty.call(authorsBlogCounts, key)) {
      const element = authorsBlogCounts[key]
      if (authorWithMostBlogs.blogs === undefined || element > authorWithMostBlogs.blogs) {
        authorWithMostBlogs.author = key
        authorWithMostBlogs.blogs = element
      }
    }
  }

  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  let authorsLikeCounts = {}
  let authorWithMostLikes = {}

  for (const blog of blogs) {
    authorsLikeCounts[blog.author] ? authorsLikeCounts[blog.author] += blog.likes : authorsLikeCounts[blog.author] = blog.likes
  }

  for (const key in authorsLikeCounts) {
    if (Object.hasOwnProperty.call(authorsLikeCounts, key)) {
      const element = authorsLikeCounts[key]
      if (authorWithMostLikes.likes === undefined || element > authorWithMostLikes.likes) {
        authorWithMostLikes.author = key
        authorWithMostLikes.likes = element
      }
    }
  }

  return authorWithMostLikes
}

module.exports = {
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}