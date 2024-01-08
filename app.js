// Start coding here
import { assignments } from "./data/assignments.js";
import { comments } from "./data/comments.js";
import express from "express";

let get1 = assignments;

//let postId = assignments;

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//1
app.get("/assignments", (req, res) => {
  const limit = req.query.limit;

  if (limit > 100) {
    return res.status(401).json({
      message: "Invalid",
    });
  }
  const get1 = [...assignments.slice(0, limit)];

  return res.json({
    message: "Complete Fetching assignments",
    data: get1,
  });
});

//2
app.get("/assignments/:assignmentsId", (req, res) => {
  let dataId = Number(req.params.assignmentsId);
  let getId = get1.filter((item) => item.id === dataId);

  return res.json({
    message: "Complete Fetching assignments",
    data: getId[0],
  });
});

//3
app.post("/assignments", (req, res) => {
  get1.push({
    id: get1[get1.length - 1].id + 1,
    ...req.body,
  });

  return res.json({
    message: "New assignment has been created successfully",
  });
}),
  //4
  app.delete("/assignments/:assignmentsId", (req, res) => {
    let dataId = Number(req.params.assignmentsId);
    const newData = get1.filter((item) => item.id !== dataId);

    get1 = newData;

    return res.json({
      message: `Assignment Id : ${dataId}  has been deleted successfully`,
    });
  }),
  //5
  app.put("/assignments/:assignmentsId", (req, res) => {
    let dataId = Number(req.params.assignmentsId);

    const blogPostIndex = get1.findIndex((item) => {
      return item.id === dataId;
    });

    get1[blogPostIndex] = { id: dataId, ...req.body };

    return res.json({
      message: `Assignment Id : ${dataId}  has been updated successfully`,
    });
  }),
  app.listen(port, () => {
    console.log(`Server is running at ${port}`);
  });
