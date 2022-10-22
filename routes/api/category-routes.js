const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const data = await Category.findAll({
      include: [{ model: Product }],
    })
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!data) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = await Category.create(req.body);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const data = await Category.update(
      req.body,
      {where: {id: req.params.id}}
    );

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await Category.destroy({
      where: { id: req.params.id },
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
