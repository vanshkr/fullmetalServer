import mongoose,{Schema} from "mongoose";
import UserModal from "../models/userSchema.js";

const watchlistSchema = mongoose.Schema({
  id:{type:Schema.Types.ObjectId,ref:"User", required:true},
  watching:{type:[String],
default:[]},
plantowatch:{type:[String],
    default:[]},
    onhold: {type:[String],default:[]},
        completed: {type:[String],default:[]},
        dropped: {type:[String],default:[]},
});

export default mongoose.model("Watchlist", watchlistSchema);