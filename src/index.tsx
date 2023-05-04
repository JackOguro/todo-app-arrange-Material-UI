import { createRoot } from "react-dom/client";
import App from "./components/App";

// as HTMLElementという型情報のコードを追加する
const rootElement = (document.getElementById("root") as HTMLElement);
const root = createRoot(rootElement);

root.render(<App />);
