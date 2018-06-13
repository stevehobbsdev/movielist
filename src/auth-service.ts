import { WebAuth, Auth0DecodedHash } from "auth0-js";
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { EventEmitter } from "events";
import env from "./environment";

@autoinject
export class AuthService {
  private accessToken: string;
  private id_token: string;
  private expires_at: string;
  
  authNotifier = new EventEmitter();

  auth0 = new WebAuth({
    domain: env.auth0.domain,
    clientID: env.auth0.clientId,
    redirectUri: "http://localhost:8080/callback",
    audience: `https://${env.auth0.domain}/userinfo`,
    responseType: "token id_token",
    scope: "openid"
  });

  constructor(private router: Router) {}

  handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);

        const savedLocation = JSON.parse(localStorage.getItem('location'))
        const navigateTarget = savedLocation.url || 'home'

        this.router.navigate(navigateTarget);

        this.authNotifier.emit('authChange', { authenticated: true });
      } else if (err) {
        console.log(err);
      }
    });
  }

  setSession(authResult: Auth0DecodedHash): void {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    this.accessToken = authResult.accessToken;
    this.id_token = authResult.idToken;
    this.expires_at = expiresAt;
  }

  login(): void {
    localStorage.setItem('location', JSON.stringify({ url: this.router.currentInstruction.fragment }));
    this.auth0.authorize();
  }

  logout(): void {
    delete this.accessToken;
    delete this.id_token;
    delete this.expires_at;
  
    this.authNotifier.emit('authChange', { authenticated: false });
  }

  isAuthenticated(): boolean {
    if (!this.accessToken)
      return false;

    const expiresAt = JSON.parse(this.expires_at);
    return new Date().getTime() < expiresAt;
  }
}
