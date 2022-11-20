import Xendit from "xendit-node";

export const getVa = async (req, res) => {
    const x = new Xendit({ secretKey: 'xnd_development_09vmJJaxo0pWm4sppLCigDTgN7FkHNhI5VUIBGhFWyNCyeHKOGqtexGpW0DUx2' });
    const { VirtualAcc } = x;
    const vaSpecificOptions = {};
    const va = new VirtualAcc(vaSpecificOptions);
    const resp = await va.getVABanks();
    res.status(200).json(resp)
}

export const getQr = async (res) => {
    const x = new Xendit({ secretKey: 'xnd_development_09vmJJaxo0pWm4sppLCigDTgN7FkHNhI5VUIBGhFWyNCyeHKOGqtexGpW0DUx2' });
    const { QrCode } = x;
    const qrcodeSpecificOptions = {};
    const q = new QrCode(qrcodeSpecificOptions);
    try {
        const response = await q.createCode({
            externalID: 'qr-12125167',
            amount: 10000,
            type: "DYNAMIC",
            callbackURL: 'http://localhost:5000/qrcall'
        })
        console.log(response);
    } catch (error) {
        console.log(error);
    }

}

export const qrCallback = async (req, res) => {
    const [id, status] = req.body
}

export const mandiriVa = async (req, res) => {
    const x = new Xendit({ secretKey: 'xnd_development_09vmJJaxo0pWm4sppLCigDTgN7FkHNhI5VUIBGhFWyNCyeHKOGqtexGpW0DUx2' });

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
    const x = new Xendit({ secretKey: 'xnd_development_09vmJJaxo0pWm4sppLCigDTgN7FkHNhI5VUIBGhFWyNCyeHKOGqtexGpW0DUx2' });

    const { VirtualAcc } = x;
    const vaSpecificOptions = {};
    const va = new VirtualAcc(vaSpecificOptions);

    const resp = await va.getFixedVA({ id:'637a45f9a84200526ffcd27c' });
    console.log(resp);
}
export const mandiriCall = async (req, res) => {
    console.log("haii");
}

