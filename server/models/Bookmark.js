import mongoose  from "mongoose";

export const BOOKMARK_CATEGORIES = ["Work", "Learning", "Tools", "Entertainment"];

const bookmarkSchema = new mongoose.Schema(
    {
        title: {type: String, required: [true,"Title is required"], trim: true},
        url: {type: String, required: [true, "URL is required"] , trim: true,
             validate: {
                validator:(value) => /^https?:\/\/.+/.test(value),
                message: "URL must started with http:// or https://",
             }
         },
        category: {type: String, enum:BOOKMARK_CATEGORIES, default:"Work", trim: true},
        isFavorite: {type: Boolean, default:false}
    },
    {timestamps:true}
)


const Bookmark = mongoose.model("Bookmark", bookmarkSchema)

export default Bookmark;