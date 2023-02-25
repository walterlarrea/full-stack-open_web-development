import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <>
      <h2>{user.name}</h2>

      <p>added blogs</p>

      <List>
        {user.blogs.map(blog =>
          <ListItem key={blog.id}>
            <ListItemIcon>
              <FiberManualRecordIcon />
            </ListItemIcon>
            <ListItemText>{blog.title}</ListItemText>
          </ListItem>
        )}
      </List>
    </>
  )
}

export default User