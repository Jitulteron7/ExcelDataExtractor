const { dataExtractor, newFormate } = require("./utils");
const {saveAsExel } = require("./saveAsExcel");
const route = require("express").Router();
const moment = require("moment");
route.get("/extract", async (req, res, next) => {
  try {
    const data = await dataExtractor();
    // data.length -= (data.length-51);

    const newCsv=await newFormate(data);
    
    // await saveAsExel(newCsv)
      return res.status(200).send({ message: "extraction done", data: newCsv });
    
    // res.status(400).send({ error: "error bro" });
  } catch (e) {
    console.log(e, "error");
    res.status(500).send({ message: "error", error: e });
  }
});

module.exports = route;
