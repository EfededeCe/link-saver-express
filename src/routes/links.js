const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/add", (req,res) => {
    res.render("links/add")
});

router.post("/add", async (req,res) => {
    const { titulo, url, descripcion } = req.body;
    const newLink = {
        titulo,
        url,
        descripcion
    };
    await pool.query("INSERT INTO links set ?", [newLink]);
    console.log("Este es el nuevo link", newLink);
    req.flash("success", "Link guardado exitosamente");
    res.redirect("/links");
});

router.get("/", async (req,res) => {
    const linksQuery = await pool.query("SELECT * FROM links");
    const links = linksQuery[0];
    console.log(links[0]);
    res.render("links/list", { links });
});


router.get("/delete/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM links WHERE id = ?", [id]);
    req.flash("success", "Link eliminado exitosamente");
    res.redirect("/links");
});


router.get("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const linksQuery = await pool.query("SELECT * FROM links WHERE id = ?", [id]);
    const links = linksQuery[0];
    console.log(links);
    res.render("links/edit", { links: links[0] });
});

router.post("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const { titulo, url, descripcion } = req.body;
    const newLink = {
        titulo,
        url,
        descripcion
    };
    await pool.query("UPDATE links set ? WHERE id = ?", [newLink, id]);
    req.flash("success", "Link modificado exitosamente");
    res.redirect("/links");
});



module.exports = router;
