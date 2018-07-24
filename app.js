$(document).ready(function() {
  let $results = $('.results');

// Displays the search results. Can consider getting rid of the details param if other function is
// not refractored
  const displayResults = function(key, details) {
    let name = JSON.parse(key);
    let info = JSON.parse(localStorage.getItem(key));
    let $match = $('<div><div class="temp"><div class="name"></div><div class="info"></div></div></div>');

    // Check for first name. Adds some spaces if no first name is present
    if (name.firstName === '') {
      $match.find('.name').addClass('last-only');
      $match.find('.name').text(name.lastName);
    } else {
      $match.find('.name').text(name.firstName + ' ' + name.lastName);
    }

    if (details) {
      $match.find('.info').text(key);
    } else {
      $match.find('.info').text(key).hide();
    }
    $match.appendTo($results);
  };

// "home screen" buttons - empty and +
  const homeBtns = function() {
    $results.html('');
    $('.new-contact').show();
    $('.left-empty-btn').show();
    $('.cancel-btn').hide();
    $('.back-btn').hide();
    $('.done-btn').hide();
    $('.edit-btn').hide();
    $('.store-btn').hide();
    $('.crud-form').hide();
    $('.contact-pic').hide();
    $('.search-bar').show();
    $('.right-empty-btn').hide();
    $('h1').show();
    $('h3').hide();
    $('.contact-pic').hide();
  };

// When a contact is clicked on. Maybe move into $document.on('click', '.temp') or displayResults()
  const selectedContact = function(key) {
    let name = JSON.parse(key);
    let info = JSON.parse(localStorage.getItem(key));
    let $match = $('<div><div class="selected"><div class="full-name"></div><div class="company"></div>' +
      '<div class="spacer"></div><div class="catp"></div><div class="cphone">' +
      '</div><div class="cate"></div><div class="cemail"></div><div class="key"></div></div></div>');

    if (name.firstName[0] === undefined) {
      $('.contact-pic').text(name.lastName[0]);
    } else if (name.lastName[0] === undefined) {
      $('.contact-pic').text(name.firstName[0]);
    } else {
      $('.contact-pic').text(name.firstName[0] + name.lastName[0]);
    }

    $match.find('.full-name').text(name.firstName + ' ' + name.lastName);
    $match.find('.company').text(info.company);
    $match.find('.catp').text('phone: \n');
    $match.find('.cphone').text(info.phone);
    $match.find('.cate').text('email: \n');
    $match.find('.cemail').text(info.email);
    $match.find('.key').text(key).hide();
    $match.appendTo($results);
  };

  const editContact = function(key) {
    $results.html('');
    let name = JSON.parse(key);
    let info = JSON.parse(localStorage.getItem(key));

    $('.new-contact').hide();
    $('.left-empty-btn').hide();
    $('.back-btn').hide();
    $('.done-btn').show();
    $('.edit-btn').hide();
    $('.store-btn').hide();
    $('.cancel-btn').show();
    $('.search-bar').hide();
    $('.right-empty-btn').hide();
    $('.crud-form').show();
    $('.crud-form').find('.first-name').val(name.firstName);
    $('.crud-form').find('.last-name').val(name.lastName);
    $('.crud-form').find('.company').val(info.company);
    $('.crud-form').find('.phone-number').val(info.phone);
    $('.crud-form').find('.email').val(info.email);
    $('.crud-form').find('.contact-key').val(key);
  };

// Shows all contacts
  const showAll = function() {
    homeBtns();
    for (let i = 0; i < localStorage.length; i++) {
      displayResults(localStorage.key(i), false);
    }
    $results.hide().slideDown();
  };

// Clears form values
  const clearForm = function() {
    $('.first-name').val('');
    $('.last-name').val('');
    $('.phone-number').val('');
    $('.email').val('');
    $('.search-term').val('');
  };

  const validateName = function() {
    if ($('.first-name').val().length === 0 && $('.last-name').val().length === 0) {
      alert('Please enter a first or last name');
      return false;
    }

    return true;
  };

  const validatePhone = function() {
    let phone = $('.phone-number').val();
    phone = phone.toString().replace(/ /g, '').replace(/\(/g, '').replace(/\)/, '').replace(/-/g, '');

    if (phone.length !== 10 && phone.length !== 0) {
      alert('Invalid phone number');
      return false;
    }

    return true;
  };

  const storeContact = function() {
    let validName = validateName();
    let validPhone = validatePhone();

    if (validName && validPhone) {
      let key = {};
      key.firstName = $('.first-name').val();
      key.lastName = $('.last-name').val();

      let value = {};
      value.phone = $('.phone-number').val();
      value.email = $('.email').val();
      value.company = $('.company').val();

      localStorage.setItem(JSON.stringify(key), JSON.stringify(value));
    }

    clearForm();
    showAll();
  };

// Stores new and updated contacts. Calls storeContact();
  $('.store-btn').on('click', function(event) {
    event.preventDefault();
    storeContact();
  });

  $('.done-btn').on('click', function() {
    let name = $("form").find('.contact-key').val();
    localStorage.removeItem(name);
    storeContact();
  });

//Click to bring up the new contacts form
  $('.new-contact').on('click', function() {
    $results.html('');
    clearForm();
    $('.new-contact').hide();
    $('.left-empty-btn').hide();
    $('.store-btn').show();
    $('.done-btn').hide();
    $('.back-btn-btn').hide();
    $('.edit-btn').hide();
    $('.cancel-btn').show();
    $('.crud-form').show();
    $('.search-bar').hide();
    $('.right-empty-btn').hide();
    $('h1').hide();
    $('h3').show();
  });

// Return to home screen
  $('.cancel-btn').on('click', function() {
    clearForm();
    showAll();
  });

  $('.back-btn').on('click', function() {
    clearForm();
    showAll();
  });

// When a contact is clicked, causes selectedContact() to run
  $(document).on('click', '.temp', function() {
    $results.html('');
    let key = $(this).closest('.temp').find('.info').text();
    selectedContact(key, true);
    $('.new-contact').hide();
    $('.left-empty-btn').hide();
    $('.search-bar').hide();
    $('.back-btn').show();
    $('.edit-btn').show();
    $('.cancel-btn').hide();
    $('.right-empty-btn').hide();
    $('h1').hide();
    $('.contact-pic').show();
  });

  $(document).on('click', '.edit-btn', function() {
    let key = $("div:last").closest('.selected').find('.key').text();
    editContact(key);
  });

  $('.search-bar').on('click', function() {
    $('.new-contact').hide();
    $('.cancel-btn').show();
    $('.left-empty-btn').hide();
    $('.right-empty-btn').show();
  });

// Attempting a dynamic search with .keyup()
  $('.search-term').on('keyup', function() {
    let searchTerm = $(this).val().toLowerCase();
    $results.html('');

    for (let i = 0; i < localStorage.length; i++) {
      let contactName = JSON.parse(localStorage.key(i));
      let first = contactName.firstName.toLowerCase();
      let last = contactName.lastName.toLowerCase();

      if (first.startsWith(searchTerm) || last.startsWith(searchTerm)) {
        displayResults(localStorage.key(i));
      }
    }
  });

//Initial population of $results
  showAll();
});

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
