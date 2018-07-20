$(document).ready(function() {
  console.log('+++ filename: app.js functionName: jquery.ready expected: no error actual: ', $);

  // $().on('click', function() {
  //
  // });

  $('.store-btn').on('click', function(event) {
    event.preventDefault();
    localStorage.setItem($('.input-field-title').val(), $('.input-field-body').val());
  });

  $('.get-btn').on('click', function(event) {
    event.preventDefault();
    localStorage.getItem($('.input-field-title').val());
  });

  $('.delete-btn').on('click', function(event) {
    event.preventDefault();
    localStorage.removeItem($('.input-field-title').val());
  });
});
