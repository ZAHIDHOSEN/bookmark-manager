import Bookmark from "../models/Bookmark.js"


const getBookmarks = async(req, res)=>{
    try {
      const filter = {}
      const {category, search} = req.query

      if(category && category !== "All"){
        filter.category = category
      }

      if(search && search.trim()){
        filter.title = {$regex: search.trim(), $options: "i"}
      }

      const bookmarks = await Bookmark.find(filter).sort({createdAt: -1})
      res.status(200).json(bookmarks)

    } catch (error) {
       res.status(500).json({message:"failed to fetch bookmarks", error:error.message})
    }

}









export const BookmarkController = {
    getBookmarks
}