$(document).ready(function() {
  console.log('+++ filename: app.js functionName: jquery.ready expected: no error actual: ', $);

  // $().on('click', function() {
  //
  // });

  $('.store-btn').on('click', function(event) {
    event.preventDefault();
    let titleValue = $('.input-field-title').val();
    let contentValue = $('.input-field-body').val();
    localStorage.setItem('titleValue', titleValue);
    localStorage.setItem('contentValue', contentValue);    
  });

  $('.get-btn').on('click', function(event) {
    event.preventDefault();
    let titleValue = localStorage.getItem('titleValue');
    let contentValue = localStorage.getItem('contentValue');
    $('.debug').html(`<p>${titleValue} ${contentValue}</p>`);
  });

  $('.delete-btn').on('click', function(event) {
    event.preventDefault();
    let titleValue = $('.input-field-title').val();
    localStorage.removeItem(titleValue);
  });
});
