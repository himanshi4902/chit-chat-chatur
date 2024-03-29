import {connect,disconnect} from "mongoose";

 //Connects to the database using the provided MONGO_URL environment variable.
 //@return {Promise<void>} - A promise that resolves when the connection is successful, or rejects with an error if the connection fails.
async function connectToDatabase(){
    try{
        await connect(process.env.MONGODB_URL);
    }catch(error){
        console.log(error);
        throw new Error("Failed to connect to database");
    }
}

// Disconnects from the database asynchronously.
async function disconnectFromDatabase(){
    try{
        await disconnect();
    }catch(error){
        console.log(error);
        throw new Error("Failed to connect to database");
    }
}

export { connectToDatabase, disconnectFromDatabase };
