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
  name = name + "=";

  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(";");

  for (let index = 0; index < cookies.length; index++) {
    let cookie = cookies[index];

    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }

    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  return "";
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function getAuthHeaders() {
  return {
    Authorization: `JWT ${getCookie("access")}`,
  };
}
