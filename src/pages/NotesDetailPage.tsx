import React, { useEffect } from "react";

// React Router DOM Imports
import { useNavigate, useParams } from "react-router-dom";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { Editor } from "../components/editor/Editor";

const NotesDetailPage = () => {
    let loggedIn = useSessionStorage("sessionToken");
    let navigate = useNavigate();
    // Find id from params
    let { id } = useParams();
    
    useEffect(() => {
        if (!loggedIn) return navigate("/login");
    }, [loggedIn]);

  return (
    <div>
      <h1>Note Detail Page {id}</h1>
      <Editor ></Editor>
    </div>
  );
};

export default NotesDetailPage;
