// Start coding here
import express from "express";
import { assignments } from "./data/assignments.js";
import { comments } from "./data/comments.js";

const app = express();
const port = 4001;

let assignmentsData = assignments;
let commentsData = comments;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Hello ! This is port ${port}!`);
});

app.get("/", (req, res) => {
  return res.send("Hello");
});

app.get("/assignments", (req, res) => {
  const limit = +req.query.limit;
  if (limit > 0) {
    const newData = [...assignmentsData].slice(0, limit);
    return res.json({
      limit: limit,
      message: "Complete Fetching assignments by limit",
      data: newData,
    });
  }
  if (!limit) {
    const newData = [...assignmentsData].slice(0, 10);
    return res.json({
      message: "Complete Fetching assignments by default",
      data: newData,
    });
  }
  if (limit > 10) {
    return res.status(401).json({
      message: "Invalid request,limit must not exceeds 10 assignments",
    });
  }
});

app.get("/assignments/:assignmentsId", (req, res) => {
  const assignmentsId = +req.params.assignmentsId;
  const newData = assignmentsData.filter((item) => item.id === assignmentsId);
  if (newData.length === 0) {
    return res.status(401).json({
      message: `Invalid request,Can't found assignments No.${assignmentsId}`,
    });
  }
  return res.json({
    message: "Complete Fetching assignments",
    data: newData,
  });
});

app.post("/assignments", (req, res) => {
  if (!req.body.title || !req.body.categories || !req.body.description) {
    return res.status(401).json({
      message: "Invalid request,Miss body value.",
    });
  }
  const newAssignments = { ...req.body };
  assignmentsData.push({
    id: assignments[assignments.length - 1].id + 1,
    ...newAssignments,
  });
  return res.json({
    message: "New assignment has been created successfully",
  });
});

app.delete("/assignments/:assignmentsId", (req, res) => {
  const id = +req.params.assignmentsId;
  const newAssignments = assignmentsData.filter((item) => item.id !== id);
  assignmentsData = newAssignments;
  return res.json({
    message: `Assignment Id : ${id}  has been deleted successfully`,
    data: assignmentsData,
  });
});

app.put("/assignments/:assignmentsId", (req, res) => {
  const id = +req.params.assignmentsId;

  const assignmentIndex = assignmentsData.findIndex((item) => {
    item.id === id;
  });

  assignmentsData[assignmentIndex] = { id: id, ...req.body };

  return res.json({
    message: `Assignment Id : ${id}  has been updated successfully`,
    data: assignmentsData[assignmentIndex],
  });
});

app.get("/assignments/:assignmentsId/comments", (req, res) => {
  const id = +req.params.assignmentsId;
  const newCommentsIndex = commentsData.filter((item) => {
    return item.assignmentId === id;
  });
  return res.json({
    message: "Complete fetching comments",
    data: newCommentsIndex,
  });
});

app.post("/assignments/:assignmentsId/comments/", (req, res) => {
  const id = +req.params.assignmentsId;
  const newComment = {
    id: commentsData[commentsData.length - 1].id + 1,
    assignmentId: id,
    ...req.body,
  };
  commentsData.push(newComment);
  return res.json({
    message: "New comment has been created successfully",
    data: commentsData[commentsData.length - 1],
  });
});
