import axios from "axios";
import userModal from "../Modals/userModal.js";
import FormData from "form-data";

export async function generateImage(req, res) {
    try {
        const { userId, prompt } = req.body;

        const user = await userModal.findById(userId);

        if (!user || !prompt) {
            return res.json({
                success: false,
                message: "missing data"
            });
        }

        if (user.creditBalance <= 0) {
            return res.json({
                success: false,
                message: "No credit balance",
                creditBalance: user.creditBalance
            });
        }

        // API call: prompt to image
        const formdata = new FormData();
        formdata.append("prompt", prompt);

        const { data } = await axios.post(
            "https://clipdrop-api.co/text-to-image/v1",
            formdata,
            {
                headers: {
                    ...formdata.getHeaders(),
                    'x-api-key': process.env.CLIPDROP_API
                },
                responseType: "arraybuffer"
            }
        );

        const Base64Image = Buffer.from(data, "binary").toString("base64");
        const resultImage = `data:image/png;base64,${Base64Image}`;

        await userModal.findByIdAndUpdate(userId, {
            creditBalance: user.creditBalance - 1
        });

        return res.json({
            success: true,
            message: "image generated",
            resultImage,
            creditBalance: user.creditBalance - 1
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        });
    }
}
