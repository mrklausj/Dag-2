const express = require("express");
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "production";
const axios = require("axios");
const logger = require("./middleware/logger");


const app = express();

app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true}));

app.use(express.static("public"));



app.use(logger); //

app.get("/", (req, res) => {
    res.render("home");
    //res.send("Hej igen hjem");
})

app.get("/about", (req, res) => {
    res.render("about");
    //res.send("Hej igen about");
});

app.get("/subscriber/add", async (req, res) => {
    res.render("add-subscriber");
});

app.get("/subscriber/delete/:id", async (req, res) => {
    const id = req.params.id
    const result = await axios.delete("http://localhost:3000/test/" + id);
    //console.log(id);
    res.redirect("/subscriber");
});

app.post("/subscriber/edit/:id", async (req, res) => {
   const id = req.body.id;
   const result = await axios.put("http://localhost:3000/test/" + id, req.body);
   res.redirect("/subscriber");

})

app.get("/subscriber/edit/:id", async (req, res) => {
    const id = req.params.id;
    const result =await axios.get("http://localhost:3000/test/" + id);
    res.render("edit-subscriber", {data: result.data});
})

app.post("/subscriber/add", async (req, res) => {
    const body = req.body;
    const result = await axios.post("http://localhost:3000/test", body);
    res.redirect("/subscriber");
    console.log(result);
});

app.get("/subscriber", async (req, res) => {
    const response = await axios.get("http://localhost:3000/test");
    const data = response.data;
    console.log(data);
    res.render("subscriber", {data});
    //res.send("Hej igen sub");
})

app.listen(PORT, () => {
    let msg = "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"
    msg += new Date().toLocaleTimeString("da-dk");
    msg += ` Server started in ${NODE_ENV} mode. Go to http://localhost:${PORT}`;
    msg += "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
    console.log(msg);
});