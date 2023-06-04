import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useSessionStorage } from "../hooks/useSessionStorage";

const NotesPage = () => {
  
  let loggedIn = useSessionStorage("sessionToken");

  let navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) return navigate("/login");
  }, [loggedIn]);

  /**
   * Method to navigate to Note details
   * @param {string} id of Note to navigate to
   */
  const navigateToNoteDetail = (id: string) => {
    navigate(`/notes/${id}`);
  };

  return (
    <div>
      <h1>Notes Page</h1>
      <ul>
        <li onClick={() => navigateToNoteDetail("1")}>First Note</li>
        <li onClick={() => navigateToNoteDetail("2")}>Second Note</li>
        <li onClick={() => navigateToNoteDetail("3")}>Third Note</li>
      </ul>
    </div>
  );
};

export default NotesPage;
