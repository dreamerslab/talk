String.prototype.bytes = function() {
  var arr = this.match( /[^\x00-\xff]/ig );
  return  arr === null ? this.length : this.length + arr.length;
};
