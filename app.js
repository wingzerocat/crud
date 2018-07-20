$(document).ready(function() {
  console.log('+++ filename: app.js functionName: jquery.ready expected: no error actual: ', $);

  // $().on('click', function() {
  //
  // });

  $('.store-btn').on('click', function(event) {
    event.preventDefault();
    localStorage.setItem('hrext', "three is the best");
  });

  $('.get-btn').on('click', function(event) {
    event.preventDefault();
    console.log(localStorage.getItem('hrext'));
  });

  $('.delete-btn').on('click', function(event) {
    event.preventDefault();
    console.log(localStorage.removeItem('hrext'));
  });
});
