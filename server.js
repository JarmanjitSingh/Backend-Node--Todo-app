import {app} from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();

console.log(process.env.PORT)

app.listen(process.env.PORT, () => {
    console.log(`server has been working on port:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
  });