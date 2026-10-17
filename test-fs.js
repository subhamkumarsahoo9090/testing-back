import fs from "fs"

(async()=>{
    await fs.writeFileSync("./test1.txt","hellow world")
})()