const getTest = (req, res) => {
  res.json({ message: 'API работает from controller!!' });
};

module.exports = {
  getTest
};