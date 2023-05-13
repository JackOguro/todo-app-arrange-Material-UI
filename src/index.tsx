import { createRoot } from "react-dom/client";
import App from "./components/App";

// リセットCSSをインポートする
import "./css/reset.css";

//　共通CSSをインポートする
import "./css/common.css";

// as HTMLElementという型情報のコードを追加する
const rootElement = (document.getElementById("root") as HTMLElement);
const root = createRoot(rootElement);

root.render(<App />);
