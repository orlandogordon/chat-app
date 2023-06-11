"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("../index");
dotenv_1.default.config();
const router = express_1.default.Router();
console.log("test");
router.post("/text", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text, activeChatId } = req.body;
        //console.log('req.body', req.body);
        const response = yield index_1.openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            temperature: 0.5,
            max_tokens: 2048,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        //console.log("response data: ", response.data);
        yield axios_1.default.post(`https://api.chatengine.io/chats/${activeChatId}/messages/`, { text: response.data.choices[0].text }, {
            headers: {
                "Project-ID": process.env.PROJECT_ID,
                "User-Name": process.env.BOT_USER_NAME,
                "User-Secret": process.env.BOT_USER_SECRET,
            }
        });
        res.status(200).json({ text: response.data.choices[0].text });
    }
    catch (error) {
        console.error("error", error);
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
