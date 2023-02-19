let enabledConfig = {
    mode: "fixed_servers",
    rules: {
        proxyForHttps: {
            scheme: "socks5",
            host: "YOUR_HOST_IP"
        },
        bypassList: []
    }
};

let disabledConfig = {
    mode: "direct"
};


let disabledPath = {
    path: {
    16: "../img/16m.png",
    24: "../img/24m.png",
    32: "../img/32m.png",
    48: "../img/48m.png",
    64: "../img/64m.png",
    128: "../img/128m.png",
    }
}

let enabledPath = {
    path: {
    16: "../img/16.png",
    24: "../img/24.png",
    32: "../img/32.png",
    48: "../img/48.png",
    64: "../img/64.png",
    128: "../img/128.png",
    }
}

chrome.proxy.settings.get(
    {'incognito': false},
    function(config) {
        isEnabled = config.value.mode == enabledConfig.mode;
        if(isEnabled)
            chrome.action.setIcon(enabledPath);
        else
            chrome.action.setIcon(disabledPath);
    }
    );