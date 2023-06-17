
// Get all the collapsible elements
var collapsibleElements = document.querySelectorAll('.collapse');

// Add event listeners to the buttons
var buttons = document.querySelectorAll('[data-toggle="collapse"]');
buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    // Close all the collapsible elements except the current one
    collapsibleElements.forEach(function (element) {
      var currentButton = document.querySelector(button.getAttribute('href'));
      if (element !== currentButton) {
        $(element).collapse('hide');
        var unselectedButton = document.querySelector('a[href="' + '#' + element.getAttribute('id') + '"]');
        unselectedButton.classList.remove('active'); // Remove the 'active' class from unselected buttons
      } else {
        button.classList.toggle('active'); // Toggle the 'active' class on the selected button
      }
    });
  });
});

