$(document).ready(function() {
  let $results = $('.results');

// Displays the search results
  const displayResults = function(key, details) {
    let name = JSON.parse(key);
    let info = JSON.parse(localStorage.getItem(key));
    let $match = $('<div><div class="temp"><div class="name"></div><div class="info"></div></div></div>');
    $match.find('.name').text(name.firstName + ' ' + name.lastName);

    if (details) {
      $match.find('.info').text(key);
    } else {
      $match.find('.info').text(key).hide();
    }

    $match.appendTo($results);
  };

// Shows all contacts
  const showAll = function() {
    $results.html('');
    $('.add-contact').show();
    $('.cancel-btn').hide();
    $('.back').hide();
    $('.done').hide();
    $('.edit').hide();
    $('.store-btn').hide();
    $('.crud-form').hide();
    for (let i = 0; i < localStorage.length; i++) {
      displayResults(localStorage.key(i), false);
    }
    $results.show().slideDown();
  };


// Clears form values
  const clearForm = function() {
    $('.first-name').val('');
    $('.last-name').val('');
    $('.phone-number').val('');
    $('.email').val('');
  }

// Stores new contacts
  $('.store-btn').on('click', function(event) {
    event.preventDefault();

    let key = {};
    key.firstName = $('.first-name').val();
    key.lastName = $('.last-name').val();

    let value = {};
    value.phone = $('.phone-number').val();
    value.email = $('.email').val();

    localStorage.setItem(JSON.stringify(key), JSON.stringify(value));

    clearForm();
    showAll();
  });

//Click to bring up the new contacts form
  $('.add-contact').on('click', function() {
    $results.slideUp();
    $('.add-contact').hide();
    $('.store-btn').show();
    $('.done').hide();
    $('.back').hide();
    $('.edit').hide();
    $('.cancel-btn').show();
    $('.crud-form').show();
  });

// Cancel addition of contact. return to contact list
  $('.cancel-btn').on('click', function() {
    $('.add-contact').show();
    $('.back').hide();
    $('.done').hide();
    $('.edit').hide();
    $('.store-btn').hide();
    $('.cancel-btn').hide();
    $('.crud-form').hide();
    $results.html('');
    showAll();
  });

  $('.back').on('click', function() {
    $('.add-contact').show();
    $('.back').hide();
    $('.done').hide();
    $('.edit').hide();
    $('.store-btn').hide();
    $('.cancel-btn').hide();
    $('.crud-form').hide();
    $results.html('');
    showAll();
  });

// When a contact is clicked on. Maybe move into $document.on('click', '.temp') or displayResults()
  const selectedContact = function(key) {
    let name = JSON.parse(key);
    let info = JSON.parse(localStorage.getItem(key));
    let $match = $('<div><div class="temp"><div class="firstname"></div><div class="lastname"></div><div class="phone"></div><div class="email"></div><div class="key"></div></div></div>');
    $match.find('.firstname').text(name.firstName);
    $match.find('.lastname').text(name.lastName);
    $match.find('.phone').text(info.phone);
    $match.find('.email').text(info.email);
    $match.find('.key').text(key);
    $match.appendTo($results);
  };

// Working on removing the outdated contact and replacing with new contact
  $('.edit').on('click', function() {

    //localStorage.removeItem(localStorage.getItem(key));
    showAll();
  });

  const editContact = function(key) {
    $results.html('');
    let name = JSON.parse(key);
    let info = JSON.parse(localStorage.getItem(key));

    // let $match = $('<form><input class="first-name" type="text"><input class="last-name" type="text">' +
    //   '<input class="phone-number" type="text"><input class="email" type="text"></form>');
    // // $match.find('.first-name').val(name.firstName);
    // // $match.find('.last-name').val(name.lastName);
    // // $match.find('.phone-number').val(info.phone);
    // // $match.find('.email').val(info.email);
    // // $match.appendTo($results);

    $('.add-contact').hide();
    $('.back').hide();
    $('.done').show();
    $('.edit').hide();
    $('.store-btn').hide();
    $('.cancel-btn').show();
    $('.crud-form').show();
    $('.crud-form').find('.first-name').val(name.firstName);
    $('.crud-form').find('.last-name').val(name.lastName);
    $('.crud-form').find('.phone-number').val(info.phone);
    $('.crud-form').find('.email').val(info.email);

  };

// When a contact is clicked, causes selectedContact() to run
  $(document).on('click', '.temp', function() {
    $results.html('');
    let key = $(this).closest('.temp').find('.info').text();
    selectedContact(key, true);
    $('.add-contact').hide();
    $('.back').show();
    $('.edit').show();
  });

  $(document).on('click', '.edit', function() {
    let key = $("div:last").closest('.temp').find('.key').text();
    editContact(key);
  });
//Initial population of $results
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
