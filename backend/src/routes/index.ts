import { Router } from "express";

const router = Router();

router.use("/auth", (req, res) => {
    res.send("Hello from auth");
})



export default router;