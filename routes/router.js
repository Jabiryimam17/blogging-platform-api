const express = require("express");

const router = express.Router();

db = require("../databases/database");


router.get("/", (req, res) => {
    res.send(JSON.stringify({
        "status": "working"
    }));
})
router.post("/posts", async (req, res) => {
    let payload = req.body;
    console.log(payload);
    await db.query("insert into blogs (title, content, category,tags) values (?,?,?,?)", [
        payload.title,
        payload.content,
        payload.category,
        JSON.stringify(payload.tags)
    ])
    res.status(201).send(JSON.stringify(payload));
})

router.put("/posts/:id", async (req, res) => {
    let payload = req.body;
    console.log(payload);
    let command = "";
    try {
        command = `
            update blogs set title='${ payload.title }', content='${ payload.content }', category='${payload.category}', tags='${JSON.stringify(payload.tags)}'
            where id=${req.params.id};`
    } catch (err) {
        return res.status(404).send({error: err});
    }
    console.log(command);
    await db.query(command);
    res.status(200).send(JSON.stringify(payload));
})


router.delete("/posts/:id", async (req, res) => {
    let command = "";
    try {
        command = `
        delete from blogs where id=${req.params.id}
        `
    } catch (err) {
        return res.status(404).send({error: err});
    }
    await db.query(command);
    res.status(204).send("");
})
router.get("/posts/:id", async (req, res) => {
    let command = "";
    try {
        command = `
        select * from blogs where id=${req.params.id};`
    } catch (err) {
        return res.status(404).send({error: err});
    }
    let blog = await db.query(command);
    res.status(200).send(JSON.stringify(blog[0]));
})

router.get("/posts", async (req, res) => {
    let payload = req.body;
    let command = `
    select * from blogs
    `
    const blogs = await db.query(command);
    res.status(200).send(JSON.stringify(blogs[0]));

})











module.exports = router;



