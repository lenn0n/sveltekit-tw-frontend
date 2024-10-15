const useCookie = () => {
  const getCookie = (cname: string) => {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return '';
  }

  type CookieTypes = {
    name: string,
    value: string,
    days?: number,
    domain?: string
  }
  const setCookie = ({name, value, days, domain}: CookieTypes) => {
    let date: Date;
    let expires: string = '';
    if (days) {
      date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    } else {
      expires = "";      
    }

    if (domain != undefined && domain != null && domain != '') {
      document.cookie = name + "=" + value + expires + "; domain=" + domain + "; path=/";
    } else {
      document.cookie = name + "=" + value + expires + "; path=/";
    }
  }

  const removeCookie = ({name, domain = ''}: { name: string, domain: string}) => {
    const cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT' + (domain != '' ? '; domain=' + domain : '') + "; path=/";
    document.cookie = cookie;
  }

  const removeAllToken = () => {
    const listOfCookies = [
      "user_token",
      "user_profile",
      "temp_user_token",
      "temp_user_profile"
    ];

    const hostName = String(window.location.hostname).replace("dev", "").replace("staging", "")

    // * MAP COOKIES 
    listOfCookies.map((data) => {
      removeCookie({ name: data, domain: hostName });
    });

  }

  return {
    getCookie,
    setCookie,
    removeCookie,
    removeAllToken
  }
}

export default useCookie