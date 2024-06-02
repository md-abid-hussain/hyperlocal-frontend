import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import { ListItem, ListItemButton } from "@mui/material";

const CustomDrawer = () => {
  const [sendLogout] = useSendLogoutMutation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const drawerItem = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <ListItem>
        <ListItemButton onClick={() => navigate("/home")}>Home</ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => navigate("/profile")}>
          Profile
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => navigate("/login")}>
          Login
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => navigate("/register")}>
          Register
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => navigate("/task")}>
          Task
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => navigate("/task/new")}>
         Create Task
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => navigate("/helper")}>
          Helper
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => navigate("/user")}>
          User
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton
          onClick={() => {
            sendLogout({});
            navigate("/");
          }}
        >
          Logout
        </ListItemButton>
      </ListItem>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)} sx={{
      }}>
        <MenuIcon
          sx={{
            color: "white",
          }}
        />
      </Button> 
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {drawerItem}
      </Drawer>
    </div>
  );
};

export default CustomDrawer;
