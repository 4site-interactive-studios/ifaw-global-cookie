const crossDomainCookie = "https://cds.ifaw.org/cross-domain.js";
const crossDomainCookieName = "IfawSignedUp";
export class GlobalCookie {
  constructor() {
    // Load CrossDomainScript ONCE
    if (!window.hasOwnProperty("crossDomainLoaded")) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = crossDomainCookie;
      document.head.appendChild(script);
    }
    window.crossDomainLoaded = true;
    this.init();
  }
  async init() {
    await this.waitForCrossDomain();
    let domain = new URL(crossDomainCookie);
    this.cds = new CrossDomainStorage(domain.origin, "/");
    // Create a cross-domain 1 year cookie
    const expires = 365 * 24 * 60 * 60 * 1000;
    this.cds.storeValue(crossDomainCookieName, 1, expires);
    console.log("Global Cookie", expires);
  }
  wait(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
  async waitForCrossDomain() {
    while (typeof CrossDomainStorage != "function") {
      await this.wait(200);
    }
    return true;
  }
}
