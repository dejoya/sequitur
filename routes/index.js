
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { env: process.env.type });
};

exports.project = function(req, res){
  res.render('project', { env: process.env.type });
};