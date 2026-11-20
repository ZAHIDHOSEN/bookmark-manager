import { BookmarkController } from "../controllers/bookmark.controller.js"
import  { Router } from "express"


const router = Router()


router.get("/",BookmarkController.getBookmarks)


export const BookmarkRoute = router