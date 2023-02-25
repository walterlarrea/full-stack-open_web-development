import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon
} from '@mui/material'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

const BlogList = () => {
  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5
  // }

  const blogs = useSelector(({ blogs }) =>
    [...blogs]
      .sort((a, b) => b.likes - a.likes)
  )
  //const currentUser = useSelector(({ user }) => user.currentUser)

  return (
    <List>
      {blogs.map(blog =>
        <ListItem key={blog.id}>
          <ListItemIcon>
            <FiberManualRecordIcon />
          </ListItemIcon>
          <ListItemButton component={Link} to={`/blogs/${blog.id}`} >
            <ListItemText>{blog.title}</ListItemText>
          </ListItemButton>
        </ListItem>
      )
      }
    </List >
  )
}

// OLD STYLE
{/* <div>
  {blogs.map(blog =>
    <div className='blog' style={blogStyle} key={blog.id}>
      <Link to={`/blogs/${blog.id}`}> {blog.title}</Link>
    </div>
  )}
</div> */}

export default BlogList