import { BookmarkController } from "../controllers/bookmark.controller.js"
import  { Router } from "express"


const router = Router()


router.get("/",BookmarkController.getBookmarks)
router.post("/",BookmarkController.createBookmark)
router.patch("/:id/favorite",BookmarkController.toggleFavorite)


export const BookmarkRoute = router