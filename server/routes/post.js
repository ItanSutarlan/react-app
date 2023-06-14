const express = require('express');
const PostController = require('../controllers/post');
const authorization = require('../middlewares/authorization');
const router = express.Router();

router.post('/', PostController.postPost);
router.get('/', PostController.getPosts);
router.get('/:id', PostController.getPostById);
router.use('/:id', authorization);
router.put('/:id', PostController.putPostById);
router.delete('/:id', PostController.deletePostById);

module.exports = router;
