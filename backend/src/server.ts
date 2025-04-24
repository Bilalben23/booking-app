import app from "app.ts";
import connectDB from "config/db.ts";
import { ENV_VARS } from "config/env.ts";

const PORT = ENV_VARS.PORT;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
})