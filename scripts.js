const cognitoDomain = "YOUR_DOMAIN";
const clientId = "YOUR_CLIENT_ID";
const redirectUri = "http://YOUR_EC2_PUBLIC_IP";

function login() {
  window.location.href =
    `https://${cognitoDomain}/login?client_id=${clientId}&response_type=token&scope=email+openid&redirect_uri=${redirectUri}`;
}

function logout() {
  window.location.href =
    `https://${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${redirectUri}`;
}

function parseToken() {
  const hash = window.location.hash.substr(1);
  const result = hash.split('&').reduce((res, item) => {
    const parts = item.split('=');
    res[parts[0]] = parts[1];
    return res;
  }, {});

  if (result.id_token) {
    document.getElementById("output").innerText =
      "Logged In\n\nToken:\n" + result.id_token;
  }
}

parseToken();