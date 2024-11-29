import { app } from "./app.js";

const port= process.env.PORT || 3000;

app.listen(port, (err) => {
    if(err){
        console.log(`There was a problem in listening to the server on port: ${port}`);
        console.log("Error: ", err);
        return;
    }

    console.log(`The server is listening on port: ${port}`)
})