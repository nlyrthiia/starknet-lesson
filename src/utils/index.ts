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

export const mdDisplayName = [
  "Cairo Introduction",
  "Hello World Basics",
  "Variable Concepts",
  "Function Fundamentals",
  "Structs as Parameters",
  "If Expressions",
  "String Techniques",
  "`felt252` Data Type",
  "Integer Type Guide",
  "Boolean Logic",
  "Primitive Data Types",
  "Loop Mechanics",
  "Constants in Cairo",
];

export const codePlaceholderContent = [
  "fn main() {\r\n    // You can try to write any code you want to run here\r\n}",
  "// Define the PrintTrait\r\n\r\n// Implement PrintTrait for the char type\r\n\r\nfn main() {\r\n    // Use the print method from PrintTrait to print 'Hello, world!'\r\n}",
  "use debug::PrintTrait;\r\n\r\nfn main() {\r\n    // Your code here\r\n}\r\n\r\n#[test]\r\nfn test_main() {\r\n    main();\r\n}",
  "fn main() {\r\n    let x = 3;\r\n    inc(x);\r\n}\r\n\r\nfn inc(x: u32) -> u32 {\r\n    // Enter your code\r\n}",
  "struct Args {\r\n    x: u8,\r\n    y: u8,\r\n}\r\n\r\nfn add(args: Args) -> u8 {\r\n    // Your code here\r\n}\r\n\r\nfn main() {\r\n    // Your code here\r\n}",
  "use debug::PrintTrait;\r\n\r\nfn main() {\r\n    // Your code here\r\n}",
  "use debug::PrintTrait;\r\n\r\nfn main() {\r\n    // Your code here\r\n}",
  "use debug::PrintTrait;\r\n\r\nfn main() {\r\n    // Your code here\r\n}",
  "fn main() {\r\n    // Your code here\r\n}",
  "fn main() {\r\n    // Your code here\r\n}",
  "fn main() {\r\n    // Your code here\r\n}",
  "use debug::PrintTrait;\r\n\r\nfn main() -> u128 {\r\n    // Your code here\r\n}\r\n\r\n#[test]\r\n#[available_gas(200000)]\r\nfn test_main() {\r\n    // Your test code here\r\n}",
  "use debug::PrintTrait;\r\n\r\n// Your constant declarations here\r\n\r\nfn main() {\r\n  // Your code to print a constant value here\r\n}",
  "use option::OptionTrait;\r\nuse debug::PrintTrait;\r\n\r\n// Define an enum here\r\n\r\nfn main() {\r\n    // Your code here\r\n}\r\n\r\n// Your additional functions here",
];

export const codeAnwserContent = [
  "",
  "[DEBUG]	Hello, world!",
  "[DEBUG]	mutable equals immutable",
  "Run completed successfully",
  "Run completed successfully",
  "[DEBUG]	Cairo is great!",
  "[DEBUG]	Cairo is awesome",
  "[DEBUG]",
  "Run completed successfully",
  "Run completed successfully",
  "Run completed successfully",
  "[DEBUG]	hello",
  "[DEBUG]",
];

export const checkIsContract = (codeString: string) => {
  let lines: any = codeString.split("\n");
  lines = lines.map((line: any) => line.split("//")[0]);

  let noCommentsCode = lines.join("\n").split("/*");
  for (let i = 1; i < noCommentsCode.length; i++) {
    noCommentsCode[i] = noCommentsCode[i].substring(
      noCommentsCode[i].indexOf("*/") + 2
    );
  }
  const noCommentsCodeStr = noCommentsCode.join("");

  return noCommentsCodeStr.includes("#[contract]");
};
