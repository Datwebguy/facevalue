// Which deployment the app reads. Updated by the deploy script.
export const DEPLOYMENT = {
  "network": "local",
  "contract": "cfd933b833a894be7c64825012ce5fe8b1cc9296bde5431ce0f6884718bcb987",
  "tkrwContract": "c0946b76a145df8eaf4df89007a42060221580f6ab1fa6ae77258b07ae4a9158",
  "faceValue": "110000",
  "showId": "f61a210fd18800e1a59b143b293068cae72a4030160e254316435240f15ea945",
  "explorer": "https://explorer.preprod.midnight.network/contracts/"
} as { network: "local" | "preprod"; contract: string; tkrwContract: string; faceValue: string; showId: string; explorer: string };
