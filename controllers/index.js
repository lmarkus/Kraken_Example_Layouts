'use strict';


var IndexModel = require('../models/index');


module.exports = function (app) {

    var model = new IndexModel();

    app.get('/', function (req, res) {

        //Retrieve the "year" parameter from the request. If nothing is present, default to 1994
        var year = req.param('year') || '1994';

        //Set the layout to be used.
        model.layout='layouts/'+year;
        model.year = year;

        //Render the index template using the appropriate layout.
        res.render('index', model);

    });

};