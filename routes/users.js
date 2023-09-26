const router = require('express').Router();
const {
  getUsersMe, getUsers, getUserById, editUserProfile, editUserAvatar,
} = require('../controllers/users');

// возвращает информацию о текущем пользователе
router.get('/me', getUsersMe);
// возвращает всех пользователей
router.get('/', getUsers);

// возвращает пользователя по _id
router.get('/:userId', getUserById);
// обновляет профиль
router.patch('/me', editUserProfile);
// обновляет аватар
router.patch('/me/avatar', editUserAvatar);

module.exports = router;
