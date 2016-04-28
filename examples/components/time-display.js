mikrom.component("time-display", function(el, attr) {
  var time = attr.time;
  
  var stuff = moment(time).fromNow();
})