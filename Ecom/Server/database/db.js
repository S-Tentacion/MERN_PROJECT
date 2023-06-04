import mongoose from "mongoose"
export const Connection = async (username, password) => {
    const URL = `mongodb://shubham:root@ac-yj2kqw8-shard-00-00.phpfaj3.mongodb.net:27017,ac-yj2kqw8-shard-00-01.phpfaj3.mongodb.net:27017,ac-yj2kqw8-shard-00-02.phpfaj3.mongodb.net:27017/?ssl=true&replicaSet=atlas-8m7xx1-shard-0&authSource=admin&retryWrites=true&w=majority`
    try {
        await mongoose.connect(URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log("Database Connected")
    } catch (err) {
        console.log("Facing issue while connecting with db", err.message)
    }
}

export default Connection;