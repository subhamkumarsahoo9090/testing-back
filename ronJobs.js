import cron from "node-cron";

export default(()=>{
    cron.schedule("0 9 * * *", () => {
        console.log("Cron Job executed:", new Date().toLocaleString());
      });
})