import NoteIcon from '@mui/icons-material/Note';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AxiosResponse } from "axios";
import { createTask, updateTaskByID } from "../../services/taskService";
import React from "react";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import TextField from '@mui/material/TextField';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export const TasksDetailMaterial = ({_id, title, description}: any) => {
  let loggedIn = useSessionStorage("sessionToken");
  let email = useSessionStorage("email");
  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      title: data.get('title'),
      description: data.get('description'),
      owner: email
    };

    if(!formData.title || !formData.description) {
      return alert("Verify your data")
    }

    createTask(loggedIn, formData)
      .then(async (response: AxiosResponse) => {
        if (response.status !== 201) {
          throw new Error("Invalid Credentials");
        }
        console.table(response.data);
      })
      .catch((err) =>
        console.error(`[TaskDetailMaterial ERROR] Something has occurred: ${err}`)
      );
  };

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      title: data.get('title'),
      description: data.get('description'),
    };

    updateTaskByID(loggedIn, _id, formData)
      .then(async (response: AxiosResponse) => {
        if (response.status !== 200) {
          throw new Error("Invalid Credentials");
        }
        console.table(response.data);
      })
      .catch((err) =>
        console.error(`[TaskDetailMaterial ERROR] Something has occurred: ${err}`)
      );
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <NoteIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Task
          </Typography>
          <Box
            component="form"
            onSubmit={!_id ? handleCreate : handleUpdate}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              // value={task?.title || ""}
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
              defaultValue={title}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="description"
              id="description"
              autoComplete="description"
              defaultValue={description}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {!_id ? "Create" : "Update"}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
