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
    let $result = $('<div><div class="temp"><div class="name"></div><div class="info"></div></div></div>');
    $result.find('.name').text(name.firstName + ' ' + name.lastName);
    //$result.find('.info').text(info.age);
    $result.appendTo($results);
  }

  const clearForm = function() {
    $('.first-name').val('');
    $('.last-name').val('');
    $('.age').val('');
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
  });


//RETRIEVE
  $('.get-btn').on('click', function(event) {
    event.preventDefault();
    $results.html('');

    let keySearch = {};
    let valueSearch = {};
    let kFlag = false;
    let sFlag = false;
    let hits = 0;
    //flags are to gate which if else statement it will go into

    if ($('.first-name').val()) {
      keySearch.firstName = $('.first-name').val();
    }
    if ($('.last-name').val()) {
      keySearch.lastName = $('.last-name').val();
    }
    if ($('.age').val()) {
      valueSearch.age = $('.age').val();
    }

    let kTerm = JSON.stringify(keySearch);
    let sTerm = JSON.stringify(valueSearch);

    if (kTerm.length > 2) {
      kFlag = true;
    }
    if (sTerm.length > 2) {
      sFlag = true;
    }

    for (let i = 0; i < localStorage.length; i++) {
      if (kFlag && sFlag) {
        if (localStorage.key(i).includes(kTerm.slice(1, kTerm.length - 1)) && localStorage.getItem(localStorage.key(i)).includes(sTerm.slice(1, sTerm.length - 1))) {
          displayResults(localStorage.key(i), hits);
          hits += 1;
        }
      } else if (kFlag) {
        if (localStorage.key(i).includes(kTerm.slice(1, kTerm.length - 1))) {
          displayResults(localStorage.key(i), hits);
          hits += 1;
        }
      } else if (sFLag) {
        if (localStorage.getItem(localStorage.key(i)).includes(sTerm.slice(1, sTerm.length - 1))) {
          displayResults(localStorage.key(i), hits);
          hits += 1;
        }
      }
    }

    let $hits = $('<div><div class="body"></div></div>');
    $hits.find('.body').text(hits);
    $hits.prependTo($results);

    clearForm();
  });

//DELETE
  $('.delete-btn').on('click', function(event) {
    event.preventDefault();
    let key = {};
    key.firstName = $('.first-name').val();
    key.lastName = $('.last-name').val();


    localStorage.removeItem(JSON.stringify(key));

    clearForm();
  });

  $('.add-contact').on('click', function() {
    // $results.html('');
    //
    // let $temp = $('<div><div>Hi</div></div>');
    // $temp.appendTo($results).hide().slideDown();
    $results.slideUp();
  });

  const showAll = function() {
    for (let i = 0; i < localStorage.length; i++) {
      displayResults(localStorage.key(i));
    }
  }

  showAll();
});
