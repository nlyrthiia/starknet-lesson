export const getExplorer = () => {
  const ua = window.navigator.userAgent;
  const isExplorer = (exp: string) => {
    return ua.indexOf(exp) > -1;
  };
  if (isExplorer("MSIE")) return "IE";
  if (isExplorer("Firefox")) return "Firefox";
  if (isExplorer("Edg")) return "Edge";
  if (isExplorer("Chrome")) return "Chrome";
  if (isExplorer("Opera")) return "Opera";
  if (isExplorer("Safari")) return "Safari";

  return "Unknown"; // Add a default return statement
};

export const WALLETURL = {
  ARGENX_FIREFOX: "https://addons.mozilla.org/en-US/firefox/addon/argent-x/",
  ARGENX_EDGE:
    "https://microsoftedge.microsoft.com/addons/detail/argent-x/ajcicjlkibolbeaaagejfhnofogocgcj",
  ARGENX_CHROME:
    "https://chromewebstore.google.com/detail/argent-x/dlcobpjiigpikoobohmabehhmhfoodbb",

  BRAAVOS_FIREFOX:
    "https://addons.mozilla.org/en-US/firefox/addon/braavos-wallet/",
  BRAAVOS_EDGE:
    "https://microsoftedge.microsoft.com/addons/detail/hkkpjehhcnhgefhbdcgfkeegglpjchdc",
  BRAAVOS_CHROME:
    "https://chromewebstore.google.com/detail/braavos-smart-wallet/jnlgamecbpmbajjfhmmmlhejkemejdma",
};

export const installWallet = (connectorId: string, e: any) => {
  const explorerName = getExplorer();

  if (connectorId === "argentX") {
    if (explorerName === "Firefox") {
      e.preventDefault();
      window.open(WALLETURL.ARGENX_FIREFOX, "_blank");
    } else if (explorerName === "Edge") {
      e.preventDefault();
      window.open(WALLETURL.ARGENX_EDGE, "_blank");
    } else {
      e.preventDefault();
      window.open(WALLETURL.ARGENX_CHROME, "_blank");
    }
  } else if (connectorId === "braavos") {
    if (explorerName === "Firefox") {
      e.preventDefault();
      window.open(WALLETURL.BRAAVOS_FIREFOX, "_blank");
    } else if (explorerName === "Edge") {
      e.preventDefault();
      window.open(WALLETURL.BRAAVOS_EDGE, "_blank");
    } else {
      e.preventDefault();
      window.open(WALLETURL.BRAAVOS_CHROME, "_blank");
    }
  }
};

export const mdDisplayName = ["Introduction", "Hello World"];

export const codePlaceholderContent = [
  "fn main() {\r\n    // You can try to write any code you want to run here\r\n}",
  "// Define the PrintTrait\r\n\r\n// Implement PrintTrait for the char type\r\n\r\nfn main() {\r\n    // Use the print method from PrintTrait to print 'Hello, world!'\r\n}",
];

export const codeAnwserContent = ["", "[DEBUG]	Hello, world!"];

export const checkIsContract = (codeString: string) => {
  let lines: any = codeString.split("\n");
  lines = lines.map((line: any) => line.split("//")[0]);

  let noCommentsCode = lines.join("\n").split("/*");
  for (let i = 1; i < noCommentsCode.length; i++) {
    noCommentsCode[i] = noCommentsCode[i].substring(
      noCommentsCode[i].indexOf("*/") + 2,
    );
  }
  const noCommentsCodeStr = noCommentsCode.join("");

  return noCommentsCodeStr.includes("#[contract]");
};
