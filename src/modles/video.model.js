import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";




const videoSchema = new Schema({
videoFile:{
    type:String,
    requried: true,
},
thumbnail:{
    type:String,
    requried: true,
},
title:{
    type:String,
    requried: true,
},
duration:{
   type: Number, //cloudinary give this
   requried: true
},
description:{
    type: String,
    requried: true
},
views:{
    type: Number,
    default:0
},
isPublished:{
 type:Boolean,
 default: true
},
owner:{
    type: Schema.Types.ObjectId,
    ref: 'User'
}

},{timestamps:true})
//aggregation pipelines use to track user history
videoSchema.plugin(mongooseAggregatePaginate)

export const  Video = mongoose.model('Video', videoSchema)