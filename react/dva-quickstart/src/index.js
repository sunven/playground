import "./index.css";
import app from "./app";

// 1. Initialize
// const app = dva({
//   history: createBrowserHistory(),
// });

// 2. Plugins
// app.use({});

// 3. Model
app.model(require("./models/example").default);
//app.model(user);

// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");
