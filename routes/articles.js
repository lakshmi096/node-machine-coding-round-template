var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const articleModel = require("../database/models/article.model")

/* POST on creating a articles. */
router.post('/', 
    body('name').isString().isLength({ min: 1 }),
    body('title').isString().isLength({ min: 1 }),
    body('description').isString().isLength({ min: 0 }),

    async function(req, res) {
        
        //validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({status: "failure", reason: "Invalid input" })
        }
        const articleData = {name, description} = req.body;

        articleData.id = Math.floor(Math.random() * 1000000000);

        //save in db
        const savedArticle = await articleModel.create(articleData);
        const response = {
            _id: savedArticle._id,
            name: savedArticle.name,
            description: savedArticle.description,
        }
        res.status(201).send(response);
    }
);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
