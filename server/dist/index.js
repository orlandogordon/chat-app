"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openai = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const openai_1 = require("openai");
const openai_2 = __importDefault(require("./routes/openai"));
const auth_1 = __importDefault(require("./routes/auth"));
/* CONFIGURATIONS */
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json({ limit: "30mb" }));
app.use((0, cors_1.default)());
/* OPEN AI CONFIGURATION */
const configuration = new openai_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
exports.openai = new openai_1.OpenAIApi(configuration);
/* ROUTE */
app.use('/openai', openai_2.default);
app.use("/auth", auth_1.default);
/* SERVER SETUP */
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
