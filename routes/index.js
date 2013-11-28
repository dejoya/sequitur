
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { env: process.env.type });
};