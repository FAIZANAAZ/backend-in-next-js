import { delete_api, get_api, insert_api, single_data_for_update, update_api } from "@/app/CONTROLLERS/web/functionapi";
import express from "express";

const router = express.Router();

router.post("/insert", insert_api);

router.get("/get", get_api);

router.put("/put/:id", update_api);

router.delete("/delete/:id", delete_api);

router.delete("/show/data/update/:id", single_data_for_update);
// ye api is liye he ke hm isky zariye sy agr koi edit pr click kry to wo dta input fiels me a jay isi



export default router;