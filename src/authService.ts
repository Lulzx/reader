import createAuth0Client from "@auth0/auth0-spa-js";
import {user, isAuthenticated, popupOpen} from "./store";

const config = {
  domain: "shoten.us.auth0.com",
  client_id: "MG2ggKq3jrR0xZyzqLb2n9ScFQXD1kDX",
  audience: "https://shoten.us.auth0.com/api/v2/",
  callback_url: window.location.href,
  logout_url: window.location.href,
}; 

async function createClient() {
    let auth0Client = await createAuth0Client({
        domain: config.domain,
        client_id: config.client_id
      });

      return auth0Client
}

async function loginWithPopup(client: { loginWithPopup: (arg0: any) => any; getUser: () => {} | PromiseLike<{}>; }, options: any) {
    popupOpen.set(true);
    try {
      await client.loginWithPopup(options);
      user.set(await client.getUser());
      isAuthenticated.set(true);
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
    } finally {
        popupOpen.set(false);
    }
  }

  function logout(client: { logout: () => any; }) {
    return client.logout();
  }

const auth = {
    createClient,
    loginWithPopup,
    logout
}

export default auth;