import Xendit from "xendit-node";
import dotenv from "dotenv"
dotenv.config()

export const getVa = async (req, res) => {
    const x = new Xendit({ secretKey: process.env.XENDIT_KEY });
    const { VirtualAcc } = x;
    const vaSpecificOptions = {};
    const va = new VirtualAcc(vaSpecificOptions);
    const resp = await va.getVABanks();
    res.status(200).json(resp)
}

export const getQr = async (res) => {
    const x = new Xendit({ secretKey: process.env.XENDIT_KEY });
    const { QrCode } = x;
    const qrcodeSpecificOptions = {};
    const q = new QrCode(qrcodeSpecificOptions);
    try {
        const response = await q.createCode({
            externalID: 'qr-12125183',
            amount: 10000,
            type: "DYNAMIC",
            callbackURL: 'https://ab09-2001-448a-50e0-b28c-d580-f696-5ccb-6730.ap.ngrok.io/qrcall',
        })
        console.log(response);
    } catch (error) {
        console.log(error);
    }

}

export const getCodeQr = async () => {
    const x = new Xendit({ secretKey: process.env.XENDIT_KEY });
    const { QrCode } = x;
    const qrcodeSpecificOptions = {};
    const q = new QrCode(qrcodeSpecificOptions);
    try {
        const response = await q.getCode({
            externalID: 'qr-12125181'
        })
        console.log(response);
    } catch (error) {
        console.log(error);
    }

}

export const qrCallback = async (req, res) => {
    return res.sendStatus(200)
}

export const mandiriVa = async (req, res) => {
    const x = new Xendit({ secretKey: process.env.XENDIT_KEY });

    const { VirtualAcc } = x;
    const vaSpecificOptions = {};
    const va = new VirtualAcc(vaSpecificOptions);
    try {
        const resp = await va.createFixedVA({
            externalID: 'va-324123235',
            bankCode: 'MANDIRI',
            name: 'Rendi Dwi F',
            expectedAmt: 5000,
            isClosed: true
        });
        console.log(resp);
    } catch (error) {
        console.log(error)
    }
}

export const getMandiriVa = async (req, res) => {
    const x = new Xendit({ secretKey: process.env.XENDIT_KEY });

    const { VirtualAcc } = x;
    const vaSpecificOptions = {};
    const va = new VirtualAcc(vaSpecificOptions);

    const resp = await va.getFixedVA({ id: '637a45f9a84200526ffcd27c' });
    console.log(resp);
}
export const mandiriCall = async (req, res) => {
    console.log(req.body);
    return res.sendStatus(200)
}