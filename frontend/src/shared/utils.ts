export function setCookie(name: string, value: string, expiresInSeconds?: number) {
  let expires: string | undefined;

  if (expiresInSeconds) {
    const d = new Date();
    d.setTime(d.getTime() + expiresInSeconds * 1000);
    expires = d.toUTCString();
  }

  document.cookie = `${name}=${value};` + (expires ? `expires=${expires};` : "") + "path=/";
}

export function getCookie(name: string) {
  // name = name + "=";

  // const decodedCookie = decodeURIComponent(document.cookie);
  // const cookies = decodedCookie.split(";");

  // cookies.forEach((cookie) => {
  //   cookie = cookie.trim();

  //   if (cookie.indexOf(name) == 0) {
  //     return cookie.substring(name.length, cookie.length);
  //   }
  // });

  // return "";

  name = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function getAuthHeaders() {
  return {
    Authorization: `JWT ${getCookie("access")}`,
  };
}
