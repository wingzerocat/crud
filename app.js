$(document).ready(function() {
  let $results = $('.results');


  const displayResults = function(key, index, part) {
    let name = JSON.parse(key);
    let info = JSON.parse(localStorage.getItem(key));
    let $match = $('<div><div class="temp"></div></div>');
    $match.appendTo($results);

    if (name.firstName === '' && part !== 'last') {
      $('.temp:last').append("<div class='name last-only'>" + name.lastName + "</div>");
    } else if (part === undefined) {
      $('.temp:last').append("<div class='name'>" + name.firstName + ' ' + name.lastName + "</div>");
    } else if (part === 'first') {
      $('.temp:last').append("<div class='name'><span class='bold'>" + name.firstName.slice(0, index) + "</span>" + name.firstName.slice(index, name.firstName.length) + ' ' + name.lastName + "</div>");
    } else if (part === 'last') {
      $('.temp:last').append("<div class='name'>" + name.firstName + "<span class='bold'> " + name.lastName.slice(0, index) + "</span>" + name.lastName.slice(index, name.lastName.length) + "</div>");
    }

    $('.temp:last').append("<div class='info'>" + key +"</div>");
    $('.info').hide();
  };

// Hiding buttons
  const homeBtns = function() {
    $results.html('');
    $('.cancel-btn').hide();
    $('.back-btn').hide();
    $('.done-btn').hide();
    $('.edit-btn').hide();
    $('.store-btn').hide();
    $('.crud-form').hide();
    $('.contact-pic').hide();
    $('.new-contact').show();
    $('.left-empty-btn').show();
    $('.search-bar').show();
    $('.delete-btn').hide();
    $('h1').show();
    $('h3').hide();
    $('.contact-pic').hide();
  };

  const otherBtns = function() {
    $('.new-contact').hide();
    $('.left-empty-btn').hide();
    $('.search-bar').hide();
  };

// When a contact is clicked on. Maybe move into $document.on('click', '.temp') or displayResults()
  const selectedContact = function(key) {
    let name = JSON.parse(key);
    let info = JSON.parse(localStorage.getItem(key));

    if (info.phone.length !== 0) {
      let phone = (info.phone).replace(/ /g, '').replace(/\(/g, '').replace(/\)/, '').replace(/-/g, '');

      let formattedPhone = '(';
      formattedPhone += phone.slice(0,3) + ') ' + phone.slice(3, 6) + '-' + phone.slice(6, 10);
      info.phone = formattedPhone;
    }

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

    otherBtns();
    $('.back-btn').hide();
    $('.edit-btn').hide();
    $('.store-btn').hide();
    $('.done-btn').show();
    $('.cancel-btn').show();
    $('.delete-btn').show();

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
    clearForm();
    for (let i = 0; i < localStorage.length; i++) {
      displayResults(localStorage.key(i), 0);
    }
    $results.show();
  };

// Clears form values
  const clearForm = function() {
    $('.first-name').val('');
    $('.last-name').val('');
    $('.phone-number').val('');
    $('.email').val('');
    $('.company').val('');
    $('.search-term').val('');
  };

// Checks if one of first/last is used and if phone is 'valid'
  const validateNameNumber = function() {
    if ($('.first-name').val().length === 0 && $('.last-name').val().length === 0) {
      alert('Please enter a first or last name');
      return false;
    }

    let phone = $('.phone-number').val();
    phone = phone.toString().replace(/ /g, '').replace(/\(/g, '').replace(/\)/, '').replace(/-/g, '');

    if (phone.length !== 10 && phone.length !== 0) {
      alert('Invalid phone number');
      return false;
    }

    return true;
  };

  const storeContact = function() {
    let valid = validateNameNumber();

    if (valid) {
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

  $('.done-btn').on('click', function() {
    let valid = validateNameNumber();

    if (valid) {
      let name = $("form").find('.contact-key').val();
      localStorage.removeItem(name);
      storeContact();
    }

    showAll();
  });

//Click to bring up the new contacts form
  $('.new-contact').on('click', function() {
    $results.html('');
    clearForm();
    otherBtns();
    $('.store-btn').show();
    $('.cancel-btn').show();
    $('.crud-form').show();
    $('h1').hide();
    $('h3').show();
  });

// Stores new and updated contacts. Calls storeContact();
  $('.store-btn').on('click', function(event) {
    event.preventDefault();
    storeContact();
  });

// Return to home screen
  $('.cancel-btn').on('click', function() {
    showAll();
  });

  $('.back-btn').on('click', function() {
    showAll();
  });

// When a contact is clicked, causes selectedContact() to run
  $(document).on('click', '.temp', function() {
    $results.html('');
    let key = $(this).closest('.temp').find('.info').text();
    selectedContact(key, true);
    otherBtns();

    $('.cancel-btn').hide();
    $('.back-btn').show();
    $('.edit-btn').show();
    $('h1').hide();
    $('.contact-pic').show();
  });

  $('.edit-btn').on('click', function() {
    let key = $("div:last").closest('.selected').find('.key').text();
    editContact(key);
  });

  $('.search-bar').on('click', function() {
    $('.cancel-btn').show();
    $('.left-empty-btn').hide();
  });

  $('.delete-btn').on('click', function() {
    let result = window.confirm('Delete contact?');

    if (result) {
      let name = $("form").find('.contact-key').val();
      localStorage.removeItem(name);
    }

    showAll();
  });

// Searches localStorage for any matches. Consider bolding any matching strings
  $('.search-term').on('keyup', function() {
    let searchTerm = $(this).val().toLowerCase();
    $results.html('');

    for (let i = 0; i < localStorage.length; i++) {
      let contactName = JSON.parse(localStorage.key(i));
      let first = contactName.firstName.toLowerCase();
      let last = contactName.lastName.toLowerCase();

      if (first.startsWith(searchTerm)) {
        displayResults(localStorage.key(i), searchTerm.length, 'first');
      } else if (last.startsWith(searchTerm)) {
        displayResults(localStorage.key(i), searchTerm.length, 'last');
      }
    }
  });

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
