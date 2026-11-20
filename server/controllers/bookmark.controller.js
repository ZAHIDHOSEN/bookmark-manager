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


const createBookmark = async(req,res)=>{
  try {
     const data = req.body
     const bookmark = await Bookmark.create(data)
     res.status(201).json(bookmark)

  } catch (error) {
    if(error.name === "ValidationError"){
      return res.status(400).json({message:error.message});

    }
    res.status(500).json({message:"Failed to create bookmark",error:error.message})
    
  }
}


const toggleFavorite = async(req,res)=>{
  try {
    const id = req.params.id
    const bookmark = await Bookmark.findById(id)

    if(!bookmark){
      return res.status(404).json({message:"Bookmark not found"});

    }
    bookmark.isFavorite = !bookmark.isFavorite;
    await bookmark.save()
    res.status(200).json(bookmark)
     
  } catch (error) {
    res.status(400).json({message:"Failed to toggle favorite",error:error.message})

  }
}
 

const deleteBookmark = async(req,res)=>{
 try {
   const id = req.params.id
   const bookmark =   await Bookmark.findByIdAndDelete(id)

   if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    res.status(200).json({message:"Bookmark deleted successfully"})

 } catch (error) {
   res.status(400).json({message:"Failed to delete bookmark",error:error.message})
  
 }
}







export const BookmarkController = {
    getBookmarks,
    createBookmark,
    toggleFavorite,
    deleteBookmark
}