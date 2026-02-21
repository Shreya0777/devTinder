const mongoose= require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "user", //reference to user collection
        required: true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    status:{
          type:String,
          enum:{
            values:["ignored","interested","Accepted","Rejected"],
            message:'{values} is incorrect status type'

          }
    }
},{
    timestamps:true
})
 connectionRequestSchema.index({fromUserId:1, toUserId:1});

connectionRequestSchema.pre("save", async function(){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("You cannot send connection request to yourself!");
    }
})

const connectionRequestModel = new mongoose.model("connectionrequest",connectionRequestSchema)

module.exports = connectionRequestModel;