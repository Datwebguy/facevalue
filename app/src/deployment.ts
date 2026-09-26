// Which deployment the app reads. Updated by the deploy script.
export const DEPLOYMENT = {
  "network": "local",
  "contract": "6553493ceabeaffffc84ae40916d44aaa2444aba68aef94c9ca90a166c7a2e75",
  "tkrwContract": "7bb08d8dc4583872979bd10ab4048e5392dd5c84cd4de777e97c73902ce2acf2",
  "faceValue": "110000",
  "showId": "b2cb41354a1c5ea60fbd9e894e40d62deae87746a06997b7cba6b335913472be",
  "explorer": "https://explorer.preprod.midnight.network/contracts/"
} as { network: "local" | "preprod"; contract: string; tkrwContract: string; faceValue: string; showId: string; explorer: string };
