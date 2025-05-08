import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';

function MessagingUsersList({ users, onUserSelect }) {
  const [inputTerm, setInputTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null); // for highlighting

  const handleSearch = () => {
    setSearchTerm(inputTerm.trim().toLowerCase());
  };

  const handleUserClick = (user) => {
    onUserSelect(user);
    setSelectedUserId(user.id); // update selected user
  };

  const filteredUsers = users
    .filter((user) => user.id >= 194)
    .filter((user) => user.email.toLowerCase().includes(searchTerm));

  return (
    <Box>
      {/* Search bar and button */}
      <Stack direction="row" spacing={1} marginBottom={2}>

      <TextField
    sx={{
      bgcolor: "white",
      border: "1px solid #ddd",
      borderRadius: "5px", // Increase the border radius for a rounder appearance

      "& .MuiOutlinedInput-root": {
        borderRadius: "5px", // Apply rounded corners to the input field itself
        bgcolor: "7C3085"
      },
    
    }}
    label="Search by email"
    variant="outlined"
    size="small"
    fullWidth
    value={inputTerm}
    onChange={(e) => setInputTerm(e.target.value)}
  />

        <Button 
          sx={{
            bgcolor: "#007A5A",
          }}
        variant="contained" onClick={handleSearch}>
          <SearchIcon/>
        </Button>
      </Stack>

      {/* Scrollable user list */}
      <Paper
        elevation={2}
        sx={{
          maxHeight: 535,
          overflowY: "auto",
          padding: 1,
          border: "1px solid #ddd",
          bgcolor: "white"

        }}
      >
        <List dense>
          {filteredUsers.map((user) => (
            <ListItem
              key={user.id}
              button
              onClick={() => handleUserClick(user)}
              sx={{
                wordBreak: "break-word",
                backgroundColor:
                  selectedUserId === user.id ? "#e3f2fd" : "transparent", // highlight selected
                "&:hover": {
                  backgroundColor: "#f5f5f5", // hover color
                },
              }}
            >
              <ListItemText primary={user.email} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default MessagingUsersList;
