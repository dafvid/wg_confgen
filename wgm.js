const g = function(id){
    console.log(id)
    return document.getElementById(id).value
}

const run = () => {
    const pair = nacl.box.keyPair();
    const pub = nacl.util.encodeBase64(pair.publicKey);
    const priv = nacl.util.encodeBase64(pair.secretKey);
    localConfig.value = '';
    serverConfig.value = '';
    const nl = '\n';
    let lc = '[Interface]'+nl;
    lc += `Address = ${localIp.value}`+nl;
    lc += `PrivateKey = ${priv}`+nl;
    lc += `ListenPort = 51820`+nl+nl;
    lc += `[Peer]`+nl;
    lc += `PublicKey = ${serverKey.value}`+nl;
    lc += `AllowedIPs = ${serverRoute.value}`+nl;
    lc += `Endpoint = ${serverIp.value}`+nl;
    localConfig.value = lc;

    let sc = '[Peer]'+nl
    sc += `PublicKey = ${pub}`+nl
    sc += `AllowedIPs = ${localRoute.value}`+nl
    serverConfig.value = sc

    let qr = new QRious({
        element: qrcode,
        value: lc,
        size: 200
    })

}

dabutton.onclick = run
localIp.addEventListener('input', (e) => {
    localRoute.value = localIp.value + '/32'
});
