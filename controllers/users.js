const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    // .then((user) => res.status(201).send(user))
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  if (userId.length === 24) {
    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'Пользователь не найден' });
        }
        return res.send({ data: user });
      })
      .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
  } else {
    res.status(400).send({ message: 'Некорректный _id' });
  }
};

module.exports.editUserProfile = (req, res) => {
  const { name, about } = req.body;
  if (req.user._id) {
    User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true })
      .then((user) => res.send({ data: user }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(400).send({ message: 'Некорректные данные' });
        } else {
          res.status(404).send({ message: 'Пользователь не найден' });
        }
      });
  } else {
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports.editUserAvatar = (req, res) => {
  const { avatar } = req.body;
  if (req.user._id) {
    User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true })
      .then((user) => res.send({ data: user }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(400).send({ message: 'Некорректные данные' });
        } else {
          res.status(404).send({ message: 'Пользователь не найден' });
        }
      });
  } else {
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};
