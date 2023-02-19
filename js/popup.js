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
    16: "./img/16m.png",
    24: "./img/24m.png",
    32: "./img/32m.png",
    48: "./img/48m.png",
    64: "./img/64m.png",
    128: "./img/128m.png",
    }
}

let enabledPath = {
    path: {
    16: "./img/16.png",
    24: "./img/24.png",
    32: "./img/32.png",
    48: "./img/48.png",
    64: "./img/64.png",
    128: "./img/128.png",
    }
}

function enableProxy(){
    chrome.proxy.settings.set(
        {value: enabledConfig, scope: 'regular'},
        function() {}
    );   
};
    
function disableProxy(){
    chrome.proxy.settings.set(
        {value: disabledConfig, scope: 'regular'},
        function() {}
    );  
};

function getProxyState(){
    let isEnabled;
    
    chrome.proxy.settings.get(
        {'incognito': false},
        function(config) {
            isEnabled = config.value.mode == enabledConfig.mode;
        }
        );
        
    setTimeout(() => { proxyState = isEnabled; setButtonState(isEnabled) }, 10);
}
    
function setButtonState(state){
    if(state)
    {
        proxyBtn.className = "div-b";
         proxyBtn.querySelector("span").className = "btnon";
    }
    else
    {
        proxyBtn.className = "div-a";
        proxyBtn.querySelector("span").className = "btnoff";
    }
}
    
function toggleProxy()
{
    if(proxyState)
    {
        disableProxy();
        audioOff.play();
        chrome.action.setIcon(disabledPath);
    }
    else
    {
        enableProxy();
        audioOn.play();
        chrome.action.setIcon(enabledPath);
    }
        
    proxyState = !proxyState;
}
    
let proxyState;
let proxyBtn = document.getElementById("proxy-btn");
let audioOn = document.getElementById("audio-on");
let audioOff = document.getElementById("audio-off");
audioOn.volume = 0.1;
audioOff.volume = 0.1;
getProxyState();

proxyBtn.addEventListener("click",() => {
    toggleProxy();
    setButtonState(proxyState);
});