import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

import NewCommentForm from './NewCommentForm'
import Togglable from './Togglable'

import commentService from '../services/comments'
import { setNotification } from '../reducers/notificationReducer'

import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

const CommentsList = ({ blog }) => {

  const commentFormRef = useRef()
  const dispatch = useDispatch()

  const addComment = async (commentObject) => {
    commentFormRef.current.toggleVisibility()
    try {
      const response = await commentService.create(commentObject)
      const commentedBlog = { ...blog, comments: blog.comments.concat(response) }

      dispatch(commentBlog(commentedBlog))
    } catch (exception) {
      setNotification('A problem occured during operation', 5, 'BAD')
    }
  }

  return (
    <div>
      <h3>comments</h3>

      <Togglable buttonLabel='add comment' ref={commentFormRef}>
        <NewCommentForm blog={blog} createComment={addComment} />
      </Togglable>

      <List>
        {blog.comments.map(comment =>
          <div key={comment.id}>
            <ListItem>
              <ListItemIcon>
                <FiberManualRecordIcon />
              </ListItemIcon>
              <ListItemText>{comment.content}</ListItemText>
            </ListItem>
            <Divider />
          </div>
        )}
      </List>
    </div>
  )
}

export default CommentsList