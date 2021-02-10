const express = require('express');
const router = express.Router();
const pool = require('../database');
router.get('/add', (req, res) => {
    console.log('en el get');
    res.render('links/add');
});

router.post('/add', (req, res) => {
    const { title, url, description } = req.body;

    console.log(req.body);

    const newLink = {
        title,
        url,
        description
    };
    //wait pool.query('insert into links set ?', [newLink]);

    console.log(title + ' ' +
        url + ' ' +
        description
    );
    if (title !== null && title !== undefined) {
        console.log("el titulo es diferente de nulo");
        pool.query('insert into links set ?', [newLink], function(err, rows, fields) {
                if (err) throw err;
                console.log("error en el insert"); //Show 1
            }

        )
    };



    res.send('recibido');
})
module.exports = router;