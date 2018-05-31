'use strict';

(function () {
  'use strict';

  var onButton = document.getElementById('on-btn');
  // var whitelistModeButton = document.getElementById('whitelist-mode-btn');
  var optionsBtn = document.getElementById('show-options-btn');
  var textMessage = document.getElementById('text-message');

  var isOn = localStorage.getItem('on');
  // var isWhitelistMode = localStorage.getItem('whitelistMode');

  function updateUI(_isOn) {
    if (_isOn) {
      onButton.innerHTML = 'Turn Off';
      textMessage.innerHTML = 'Currently running...';
      onButton.classList.remove('mdl-button--accent');
      // onButton.classList.add('mdl-button--colored');
    } else {
      onButton.innerHTML = 'Turn On';
      textMessage.innerHTML = 'Not running...';
      // onButton.classList.remove('mdl-button--colored');
      onButton.classList.add('mdl-button--accent');
    }
  }

  updateUI(isOn);

  onButton.addEventListener('click', function (e) {
    // console.log('on button is clicked');
    if (localStorage.getItem('on')) {
      localStorage.setItem('on', '');
      chrome.runtime.sendMessage({ msg: 'setOff' });
      updateUI(false);
    } else {
      localStorage.setItem('on', '1');
      chrome.runtime.sendMessage({ msg: 'setOn' });
      updateUI(true);
    }
  });

  optionsBtn.addEventListener('click', function (e) {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHRzL3BvcHVwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBvbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvbi1idG4nKTtcbiAgLy8gdmFyIHdoaXRlbGlzdE1vZGVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2hpdGVsaXN0LW1vZGUtYnRuJyk7XG4gIHZhciBvcHRpb25zQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3ctb3B0aW9ucy1idG4nKTtcbiAgdmFyIHRleHRNZXNzYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHQtbWVzc2FnZScpO1xuXG4gIHZhciBpc09uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ29uJyk7XG4gIC8vIHZhciBpc1doaXRlbGlzdE1vZGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnd2hpdGVsaXN0TW9kZScpO1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZVVJKF9pc09uKSB7XG4gICAgaWYgKF9pc09uKSB7XG4gICAgICBvbkJ1dHRvbi5pbm5lckhUTUwgPSAnVHVybiBPZmYnO1xuICAgICAgdGV4dE1lc3NhZ2UuaW5uZXJIVE1MID0gJ0N1cnJlbnRseSBydW5uaW5nLi4uJztcbiAgICAgIG9uQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ21kbC1idXR0b24tLWFjY2VudCcpO1xuICAgICAgLy8gb25CdXR0b24uY2xhc3NMaXN0LmFkZCgnbWRsLWJ1dHRvbi0tY29sb3JlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvbkJ1dHRvbi5pbm5lckhUTUwgPSAnVHVybiBPbic7XG4gICAgICB0ZXh0TWVzc2FnZS5pbm5lckhUTUwgPSAnTm90IHJ1bm5pbmcuLi4nO1xuICAgICAgLy8gb25CdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnbWRsLWJ1dHRvbi0tY29sb3JlZCcpO1xuICAgICAgb25CdXR0b24uY2xhc3NMaXN0LmFkZCgnbWRsLWJ1dHRvbi0tYWNjZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlVUkoaXNPbik7XG5cbiAgb25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdvbiBidXR0b24gaXMgY2xpY2tlZCcpO1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnb24nKSkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29uJywgJycpO1xuICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBtc2c6ICdzZXRPZmYnIH0pO1xuICAgICAgdXBkYXRlVUkoZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnb24nLCAnMScpO1xuICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBtc2c6ICdzZXRPbicgfSk7XG4gICAgICB1cGRhdGVVSSh0cnVlKTtcbiAgICB9XG4gIH0pO1xuXG4gIG9wdGlvbnNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjaHJvbWUucnVudGltZS5vcGVuT3B0aW9uc1BhZ2UoKTtcbiAgfSk7XG59KSgpOyJdLCJmaWxlIjoic2NyaXB0cy9wb3B1cC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
