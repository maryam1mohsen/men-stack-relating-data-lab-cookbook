const express = require('express');
const router = express.Router();
const User = require('../models/user');

// list all food items in the user's pantry
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    res.render('foods/index.ejs', { pantry: user.pantry });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


router.get('/new', (req, res) => {
  res.render('foods/new.ejs');
});

// adding a new food item to the user's pantry
router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.pantry.push({ name: req.body.name });
    await user.save();
    res.redirect('/users/' + user._id + '/foods');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Show  specific food item
router.get('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const item = user.pantry.id(req.params.itemId);
    res.render('foods/show.ejs', { item });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Render form to edit a food item
router.get('/:itemId/edit', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const item = user.pantry.id(req.params.itemId);
    res.render('foods/edit.ejs', { item });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Update a specific food item in the pantry
router.put('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const item = user.pantry.id(req.params.itemId);
    item.name = req.body.name;
    await user.save();
    res.redirect('/users/' + user._id + '/foods');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Delete a specific food item from the pantry
router.delete('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.pantry.id(req.params.itemId).remove();
    await user.save();
    res.redirect('/users/' + user._id + '/foods');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;
