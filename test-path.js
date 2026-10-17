import path from "node:path";
import { fileURLToPath } from "node:url";
(()=>{
    console.log(import.meta.url)
    console.log(fileURLToPath(import.meta.url))
    console.log(process.cwd())
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    console.log( __dirname )
})()