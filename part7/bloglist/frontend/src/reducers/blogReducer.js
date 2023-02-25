import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      return state.map(blog =>
        blog.id !== action.payload.id ? blog : action.payload)
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload.id)
    }
  }
})

export const { appendBlog, setBlogs, updateBlog, removeBlog } = blogSlice.actions

export const createBlog = (newBlogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(newBlogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (modifiedBlogObject) => {
  return async dispatch => {
    const likedBlog = await blogService
      .update(
        modifiedBlogObject.id,
        { ...modifiedBlogObject, likes: modifiedBlogObject.likes + 1 }
      )

    dispatch(updateBlog(likedBlog))
  }
}

export const commentBlog = (modifiedBlogObject) => {
  return async dispatch => {
    dispatch(updateBlog(modifiedBlogObject))
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(removeBlog({ id: id }))
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogSlice.reducer