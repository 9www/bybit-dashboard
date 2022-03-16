import CryptoJS from "crypto-js";

export function getSignature(parameters, secret) {
    var orderedParams = "";
    Object.keys(parameters)
        .sort()
        .forEach(function (key) {
            orderedParams += key + "=" + parameters[key] + "&";
        });
    orderedParams = orderedParams.substring(0, orderedParams.length - 1);
    let hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secret);
    hmac.update(orderedParams);
    return hmac.finalize().toString(CryptoJS.enc.Hex);
}
