const { response } = require('express');
const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    console.log('en el get');
    res.render('links/add');
});

router.post('/add', isLoggedIn, async(req, res) => {
    const { title, url, description } = req.body;

    console.log(req.body);

    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    //wait pool.query('insert into links set ?', [newLink]);

    console.log(title + ' ' +
        url + ' ' +
        description
    );
    if (title !== null && title !== undefined) {
        console.log("el titulo es diferente de nulo");
        await pool.query('insert into links set ?', [newLink]);
        req.flash('success', 'Link guardado correctamente');


    };

    res.redirect('/list');
});

router.get('/list', isLoggedIn, async(req, res) => {
    const links = await pool.query('select * from links where user_id = ?', [req.user.id]);
    console.log("los links son: " + links);
    res.render('links/list', { links });
});
//eliminar
router.get('/delete/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    await pool.query('delete from links where id = ?', [id]);
    req.flash('success', 'Link eliminado correctamente');
    res.redirect('/list');
});
//editar 
router.get('/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const links = await pool.query('select * from links where id = ?', [id]);
    res.render('links/edit', { link: links[0] });
});
//
router.post('/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const { title, description, url } = req.body;
    console.log("el id es:" + id + " el titulo es: " + title);
    const newLink = { title, description, url };
    console.log(newLink);
    await pool.query('update links set  ? where id = ?', [newLink, id]);
    req.flash('success', 'Link actualizado correctamente');
    res.redirect('/list');

});


module.exports = router;