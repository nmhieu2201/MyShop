export const settings = {
    setStorageJson: (name, data) => {
      data = JSON.stringify(data);
      localStorage.setItem(name, data);
    },
    setStorage: (name, data) => {
      localStorage.setItem(name, data);
    },
    getStorageJson: (name) => {
      if (localStorage.getItem(name)) {
        const data = JSON.parse(localStorage.getItem(name));
        return data;
      }
      return [];
    },
    getStorage: (name) => {
      if (localStorage.getItem(name)) {
        const data = localStorage.getItem(name);
        return data;
      }
      return [] ; //undefined
    },
    setCookieJson: (name, value, days) => {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      value = JSON.stringify(value);
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    getCookieJson: (name) => {
      var nameEQ = name + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
          return JSON.parse(c.substring(nameEQ.length, c.length));
      }
      return null;
    },
    setCookie: (name, value, days) => {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    getCookie: (name) => {
      var nameEQ = name + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    },
    eraseCookie: (name) => {
      document.cookie =
        name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    },
  };