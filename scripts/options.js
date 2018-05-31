'use strict';

(function () {
    'use strict';

    var saveBtn = document.querySelector('.options-save');
    var resumeBtn = document.querySelector('.options-resume');
    var tips = document.querySelector('.options-tips');
    var originInput = document.getElementById('allow-origin');
    var headersInput = document.getElementById('allow-headers');
    var methodsInput = document.getElementById('allow-methods');
    var credentialsInput = document.getElementById('allow-credentials');
    var requestOriginInput = document.getElementById('request-origin');

    originInput.value = localStorage.getItem('allowOrigin') || '';
    headersInput.value = localStorage.getItem('allowHeaders') || '';
    methodsInput.value = localStorage.getItem('allowMethods') || '';
    credentialsInput.value = localStorage.getItem('allowCredentials') || '';
    requestOriginInput.value = localStorage.getItem('requestOrigin') || '';

    saveBtn.addEventListener('click', function (e) {
        e.preventDefault();

        saveBtn.disabled = true;

        tips.innerHTML = '';
        localStorage.setItem('allowOrigin', originInput.value);
        localStorage.setItem('allowHeaders', headersInput.value);
        localStorage.setItem('allowMethods', methodsInput.value);
        localStorage.setItem('allowCredentials', credentialsInput.value);
        localStorage.setItem('requestOrigin', requestOriginInput.value);

        setTimeout(function () {
            saveBtn.disabled = false;
            tips.innerHTML = 'Saved';
        }, 100);
    });

    resumeBtn.addEventListener('click', function (e) {
        e.preventDefault();

        resumeBtn.disabled = true;
        tips.innerHTML = '';
        originInput.value = originInput.placeholder;
        headersInput.value = headersInput.placeholder;
        methodsInput.value = methodsInput.placeholder;
        credentialsInput.value = credentialsInput.placeholder;
        requestOriginInput.value = '';
        localStorage.setItem('allowOrigin', originInput.value);
        localStorage.setItem('allowHeaders', headersInput.value);
        localStorage.setItem('allowMethods', methodsInput.value);
        localStorage.setItem('allowCredentials', credentialsInput.value);
        localStorage.setItem('requestOrigin', '');

        setTimeout(function () {
            resumeBtn.disabled = false;
        }, 100);
    });
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHRzL29wdGlvbnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBzYXZlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9wdGlvbnMtc2F2ZScpO1xuICAgIHZhciByZXN1bWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3B0aW9ucy1yZXN1bWUnKTtcbiAgICB2YXIgdGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcHRpb25zLXRpcHMnKTtcbiAgICB2YXIgb3JpZ2luSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWxsb3ctb3JpZ2luJyk7XG4gICAgdmFyIGhlYWRlcnNJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbGxvdy1oZWFkZXJzJyk7XG4gICAgdmFyIG1ldGhvZHNJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbGxvdy1tZXRob2RzJyk7XG4gICAgdmFyIGNyZWRlbnRpYWxzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWxsb3ctY3JlZGVudGlhbHMnKTtcbiAgICB2YXIgcmVxdWVzdE9yaWdpbklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlcXVlc3Qtb3JpZ2luJyk7XG5cbiAgICBvcmlnaW5JbnB1dC52YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxvd09yaWdpbicpIHx8ICcnO1xuICAgIGhlYWRlcnNJbnB1dC52YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxvd0hlYWRlcnMnKSB8fCAnJztcbiAgICBtZXRob2RzSW5wdXQudmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsb3dNZXRob2RzJykgfHwgJyc7XG4gICAgY3JlZGVudGlhbHNJbnB1dC52YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxvd0NyZWRlbnRpYWxzJykgfHwgJyc7XG4gICAgcmVxdWVzdE9yaWdpbklucHV0LnZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3JlcXVlc3RPcmlnaW4nKSB8fCAnJztcblxuICAgIHNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgc2F2ZUJ0bi5kaXNhYmxlZCA9IHRydWU7XG5cbiAgICAgICAgdGlwcy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FsbG93T3JpZ2luJywgb3JpZ2luSW5wdXQudmFsdWUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsb3dIZWFkZXJzJywgaGVhZGVyc0lucHV0LnZhbHVlKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FsbG93TWV0aG9kcycsIG1ldGhvZHNJbnB1dC52YWx1ZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbGxvd0NyZWRlbnRpYWxzJywgY3JlZGVudGlhbHNJbnB1dC52YWx1ZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXF1ZXN0T3JpZ2luJywgcmVxdWVzdE9yaWdpbklucHV0LnZhbHVlKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNhdmVCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRpcHMuaW5uZXJIVE1MID0gJ1NhdmVkJztcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9KTtcblxuICAgIHJlc3VtZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICByZXN1bWVCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aXBzLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBvcmlnaW5JbnB1dC52YWx1ZSA9IG9yaWdpbklucHV0LnBsYWNlaG9sZGVyO1xuICAgICAgICBoZWFkZXJzSW5wdXQudmFsdWUgPSBoZWFkZXJzSW5wdXQucGxhY2Vob2xkZXI7XG4gICAgICAgIG1ldGhvZHNJbnB1dC52YWx1ZSA9IG1ldGhvZHNJbnB1dC5wbGFjZWhvbGRlcjtcbiAgICAgICAgY3JlZGVudGlhbHNJbnB1dC52YWx1ZSA9IGNyZWRlbnRpYWxzSW5wdXQucGxhY2Vob2xkZXI7XG4gICAgICAgIHJlcXVlc3RPcmlnaW5JbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsb3dPcmlnaW4nLCBvcmlnaW5JbnB1dC52YWx1ZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbGxvd0hlYWRlcnMnLCBoZWFkZXJzSW5wdXQudmFsdWUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsb3dNZXRob2RzJywgbWV0aG9kc0lucHV0LnZhbHVlKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FsbG93Q3JlZGVudGlhbHMnLCBjcmVkZW50aWFsc0lucHV0LnZhbHVlKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlcXVlc3RPcmlnaW4nLCAnJyk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXN1bWVCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9KTtcbn0pKCk7Il0sImZpbGUiOiJzY3JpcHRzL29wdGlvbnMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
