module.exports.about = function(req, res) {
  res.render('generic-text', {
  	title: 'About us',
  	text: 'AirLoft is created to help people share their habbits and insights with the world around them. Loft, refers to a private space you can have a deep involvement with things you like. That thing may be just a rolling music disk, a dazzling computer game, or even a playboy magazine.\n\n Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam quod, necessitatibus officiis totam inventore porro cum commodi velit provident excepturi soluta laboriosam quam ex, minus. Quis facilis pariatur, adipisci minus.'
  });
};