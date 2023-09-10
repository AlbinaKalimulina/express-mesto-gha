const router = require('express').Router();
const {
  getUsers, getUserById, createUser, editUserProfile, editUserAvatar,
} = require('../controllers/users');

// возвращает всех пользователей
router.get('/', getUsers);
// возвращает пользователя по _id
router.get('/:userId', getUserById);
// создаёт пользователя
router.post('/', createUser);
// обновляет профиль
router.patch('/me', editUserProfile);
// обновляет аватар
router.patch('/me/avatar', editUserAvatar);

module.exports = router;
