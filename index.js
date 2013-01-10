function catcher(ecb){
  return function tcb(scb){
    return function ccb(err) {
      if (err) {
        ecb(err);
      } else {
        scb.apply(this,Array.prototype.slice.call(arguments,1));
      }
    };
  };
}

exports.catcher = catcher;
exports.thrower = catcher(function(err){throw err});
exports.throwNewError = catcher(function(err){throw new Error(err)});
exports.res500 = function(res){return catcher(function(err){
  res.statusCode = 500;
  res.end(err);
});};