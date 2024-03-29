//This is the main entry point of the backend application.It sets up an Express server and listens on port 5000.
import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

//connections and the listeners
const port = process.env.PORT || 5000;
connectToDatabase()
.then(() => {
  // If the connection is successful, the Express server is started and listens for incoming requests on port 5000.
  app.listen(port, () =>  console.log("Server is running on port and is connected to the database"));
  })
  // If there is an error during the connection or server startup,the error is logged to the console.
    .catch((error) => {
    console.log(error);});



