import { app } from "./src/app.js";
import { PORT } from "./src/constant.js";
import { dbConnect } from "./src/db/inex.js";


app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
    dbConnect()
})