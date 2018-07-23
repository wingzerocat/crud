$(document).ready(function() {
  // console.log('+++ filename: app.js functionName: jquery.ready expected: no error actual: ', $);

  // $().on('click', function() {
  //
  // });
//localStorage.length - shows how many objects in localStorage
  let $results = $('.results');

  // Displays the search results
  const displayResults = function(key) {
    let name = JSON.parse(key);
    let info = JSON.parse(localStorage.getItem(key));
    let $match = $('<div><div class="temp"><div class="name"></div><div class="info"></div></div></div>');
    $match.find('.name').text(name.firstName + ' ' + name.lastName);
    $match.find('.info').text(key);
    $match.appendTo($results);
  }

  // Shows all contacts
  const showAll = function() {
    $results.html('');
    $('.add-contact').show();
    $('.store-btn').hide();
    $('.crud-form').hide();
    for (let i = 0; i < localStorage.length; i++) {
      displayResults(localStorage.key(i));
    }
    $results.show().slideDown();
  }

  const clearForm = function() {
    $('.first-name').val('');
    $('.last-name').val('');
  }

//STORE
  $('.store-btn').on('click', function(event) {
    event.preventDefault();

    let key = {};
    key.firstName = $('.first-name').val();
    key.lastName = $('.last-name').val();

    let value = {};
    value.age = $('.age').val();

    localStorage.setItem(JSON.stringify(key), JSON.stringify(value));

    clearForm();
    showAll();
  });


//RETRIEVE
  // $('.get-btn').on('click', function(event) {
  //   event.preventDefault();
  //   $results.html('');
  //
  //   let keySearch = {};
  //   let valueSearch = {};
  //   let kFlag = false;
  //   let sFlag = false;
  //   let hits = 0;
  //   //flags are to gate which if else statement it will go into
  //
  //   if ($('.first-name').val()) {
  //     keySearch.firstName = $('.first-name').val();
  //   }
  //   if ($('.last-name').val()) {
  //     keySearch.lastName = $('.last-name').val();
  //   }
  //   if ($('.age').val()) {
  //     valueSearch.age = $('.age').val();
  //   }
  //
  //   let kTerm = JSON.stringify(keySearch);
  //   let sTerm = JSON.stringify(valueSearch);
  //
  //   if (kTerm.length > 2) {
  //     kFlag = true;
  //   }
  //   if (sTerm.length > 2) {
  //     sFlag = true;
  //   }
  //
  //   for (let i = 0; i < localStorage.length; i++) {
  //     if (kFlag && sFlag) {
  //       if (localStorage.key(i).includes(kTerm.slice(1, kTerm.length - 1)) && localStorage.getItem(localStorage.key(i)).includes(sTerm.slice(1, sTerm.length - 1))) {
  //         displayResults(localStorage.key(i), hits);
  //         hits += 1;
  //       }
  //     } else if (kFlag) {
  //       if (localStorage.key(i).includes(kTerm.slice(1, kTerm.length - 1))) {
  //         displayResults(localStorage.key(i), hits);
  //         hits += 1;
  //       }
  //     } else if (sFLag) {
  //       if (localStorage.getItem(localStorage.key(i)).includes(sTerm.slice(1, sTerm.length - 1))) {
  //         displayResults(localStorage.key(i), hits);
  //         hits += 1;
  //       }
  //     }
  //   }
  //
  //   let $hits = $('<div><div class="body"></div></div>');
  //   $hits.find('.body').text(hits);
  //   $hits.prependTo($results);
  //
  //   clearForm();
  // });

//DELETE
  // $('.delete-btn').on('click', function(event) {
  //   event.preventDefault();
  //   let key = {};
  //   key.firstName = $('.first-name').val();
  //   key.lastName = $('.last-name').val();
  //
  //
  //   localStorage.removeItem(JSON.stringify(key));
  //
  //   clearForm();
  // });

//Click to bring up the new contacts form
  $('.add-contact').on('click', function() {
    $results.slideUp();
    $('.add-contact').hide();
    $('.store-btn').show();
    $('.cancel-btn').show();
    $('.crud-form').show().slideDown();
  });

// Cancel addition of contact. return to contact list
  $('.cancel-btn').on('click', function() {
    $results.slideDown();
    $('.add-contact').show();
    $('.store-btn').hide();
    $('.cancel-btn').hide();
    $('.crud-form').hide();
  });

// Display clicked contact info
  $(document).on('click', '.temp', function() {
    $results.html('');
    let key = $(this).closest('.temp').find('.info').text();
    displayResults(key);
  });

//Initial population of $results
  showAll();
});
