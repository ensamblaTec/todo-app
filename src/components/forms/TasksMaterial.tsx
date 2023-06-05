import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AxiosResponse } from "axios";
import { deleteTaskByID, getAllTasks } from "../../services/taskService";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import { Task } from "../../utils/types/Task.type";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export const TasksMaterial = () => {
  let loggedIn = useSessionStorage("sessionToken");

  const handleDelete = async (id: string) => {
    await deleteTaskByID(loggedIn,id);
  }


  let navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]); // Initial Tasks
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!loggedIn) return navigate("/login");
    else {
      getAllTasks(loggedIn, 2, 1)
        .then((response: AxiosResponse) => {
          if (
            response.status === 200 &&
            response.data.tasks &&
            response.data.totalPages &&
            response.data.currentPage
          ) {
            console.table(response.data);
            let { tasks, totalPages, currentPage } = response.data;
            setTasks(tasks);
            setTotalPages(totalPages);
            setCurrentPage(currentPage);
          } else
            throw new Error(`[NOTES PAGE] Error obtaining tasks: ${response}`);
        })
        .catch((err) =>
          console.log(`Get all Tasks has failed in NotesPage ${err}`)
        );
    }
  }, [loggedIn]);

  /**
   * Method to navigate to Note details
   * @param {string} id of Note to navigate to
   */
  // const navigateToTaskDetail = (id: string) => {
  //   navigate(`/tasks/${id}`);
  // };
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            All Tasks
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Tasks
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              You can see all tasks here
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Link href="/tasks/new"><Button variant="contained">Create task</Button></Link>
              {/* <Button variant="outlined">Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {tasks.length > 0 ? tasks.map((card) => (
              <Grid item key={card._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* <Link href="/tasks/view"><Button size="small">View</Button></Link> */}
                    <Link href={`/tasks/${card._id}`}><Button size="small">Edit</Button></Link>
                    <Button size="small" onClick={() => handleDelete(card._id)}>Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            )) : "Tasks not found"}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
