const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// FIND ALL TAGS
router.get('/', (req, res) => {
  Tag.findAll({
    attributes: [
      'id',
      'tag_name'
    ],
    include: [{
      model: Product,
      through: ProductTag,
      as: 'tagged_product"'
    }]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// FIND ONE TAG BY ITS ID
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'tagged_product'
      }
    ]
  })
  .then(dbTagData => {
    if(!dbTagData) {
      res.status(404).json({message: "No tag was found with that ID"});
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// CREATE A NEW TAG
router.post('/', (req, res) => {
  Tag.createNew({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// UPDATE TAG BY ITS ID
router.put('/:id', (req, res) => {
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {id: req.params.id}
  })
  .then(dbTagData => {
    if(!dbTagData) {
      res.status(404).json({message: "No tag was found with that ID"});
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// DELETE TAG BY ITS ID VALUE
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({message: "No tag was found with that ID"});
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err => {
      res.status(500).json(err);
    })
  })
});

module.exports = router;
