let account,assets,isConnected,stickAsset,GetAssets

    toastr.options.progressBar = false;
    toastr.options.showMethod = 'slideDown';
    toastr.options.hideMethod = 'slideUp';
    toastr.options.closeMethod = 'slideUp';
    toastr.options.preventDuplicates= true;
    toastr.options.preventOpenDuplicates= true;
const contract = '0x974a22d70f2cC9023FA334Ab1b11055491D47b10'

function generateMainMenuLabels(headerText){

    let labels = [

        new Label(
            headerText, 
            new Vector2(100,0),
            Vector2.zero,
            "white",
            "left",
            "Bookman",
            "100px"
        ),
        new Label(
            "", 
            new Vector2(1250,700),
            Vector2.zero,
            "white",
            "left",
            "Bookman",
            "20px"
        )
    ];


    return labels;
}


function generateMainMenuButtons(inGame){



    let buttons = [];

    let dev = 0;

    if(inGame){
        dev = 200;
        buttons.push(
            new Button
                (
                    // CONTINUE BUTTON
                    sprites.continueButton, 
                    new Vector2(200,200),
                    function(){
                        Game.mainMenu.active = false;
                        GAME_STOPPED = false;
                        setTimeout(Game.continueGame,200);
                        sounds.fadeOut(Game.mainMenu.sound);
                    },
                    sprites.continueButtonHover
                )
        )
    }

    let muteSprite = sprites.muteButton;
    let muteSpriteHover = sprites.muteButtonHover;

    if(Game.mainMenu.sound && Game.mainMenu.sound.volume === 0){
        muteSprite = sprites.muteButtonPressed;
        muteSpriteHover = sprites.muteButtonPressedHover;
    }


    let muteButton = new Button
    (
        // MUTE BUTTON
        muteSprite, 
        new Vector2(1430,10),
        function(){
            if(Game.mainMenu.sound.volume == 0){
                SOUND_ON = true;
                Game.mainMenu.sound.volume = 0.8;
                this.sprite = sprites.muteButton;
                this.hoverSprite = sprites.muteButtonHover;
            }
            else{
                SOUND_ON = false;
                Game.mainMenu.sound.volume = 0.0;
                this.sprite = sprites.muteButtonPressed;
                this.hoverSprite = sprites.muteButtonPressedHover;
            }
        },
        muteSpriteHover
    );

    let backButton = new Button
    (
        //BACK
        sprites.backButton, 
        new Vector2(100,150),
        function(){
            Game.mainMenu.labels = generateMainMenuLabels("Classic 8-Ball");
            Game.mainMenu.buttons = generateMainMenuButtons(inGame);
        },
        sprites.backButtonHover
    );

        let menuButtonss = [
        new Button
        (
            // PLAYER vs PLAYER
            sprites.twoPlayersButton, 
            new Vector2(200,dev+200),
            function(){
                AI_ON = false;
                Game.mainMenu.active = false;
                GAME_STOPPED = false;
                setTimeout(Game.startNewGame,200);
                sounds.fadeOut(Game.mainMenu.sound);
            },
            sprites.twoPlayersButtonHover
        ),
        new Button
        (
            // PLAYER vs COMPUTER
            sprites.onePlayersButton, 
            new Vector2(200,dev+400),
            function(){
                Game.mainMenu.labels = generateMainMenuLabels("Choose Difficulty");

                Mouse.reset();
                Game.mainMenu.buttons = [
                    new Button
                    (
                        //EASY
                        sprites.easyButton, 
                        new Vector2(200,150),
                        function(){
                            AI_PLAYER_NUM = 1;
                            AI_ON = true;
                            TRAIN_ITER = 30;
                            Game.mainMenu.active = false;
                            GAME_STOPPED = false;
                            setTimeout(Game.startNewGame,200);
                            sounds.fadeOut(Game.mainMenu.sound);
                        },
                        sprites.easyButtonHover
                    ),
                    new Button
                    (
                        //MEDIUM
                        sprites.mediumButton, 
                        new Vector2(200,300),
                        function(){
                            AI_PLAYER_NUM = 1;
                            AI_ON = true;
                            TRAIN_ITER = 50;
                            Game.mainMenu.active = false;
                            GAME_STOPPED = false;
                            setTimeout(Game.startNewGame,200);
                            sounds.fadeOut(Game.mainMenu.sound);
                        },
                        sprites.mediumButtonHover
                    ),
                    new Button
                    (
                        //HARD
                        sprites.hardButton, 
                        new Vector2(200,450),
                        function(){
                            AI_PLAYER_NUM = 1;
                            AI_ON = true;
                            TRAIN_ITER = 100;
                            Game.mainMenu.active = false;
                            GAME_STOPPED = false;
                            setTimeout(Game.startNewGame,200);
                            sounds.fadeOut(Game.mainMenu.sound);
                        },
                        sprites.hardButtonHover
                    ),
                    new Button
                    (
                        //INSANE
                        sprites.insaneButton, 
                        new Vector2(200,600),
                        function(){
                            AI_PLAYER_NUM = 0;
                            AI_ON = true;
                            TRAIN_ITER = 700;
                            Game.mainMenu.active = false;
                            GAME_STOPPED = false;
                            setTimeout(Game.startNewGame,200);
                            sounds.fadeOut(Game.mainMenu.sound);
                        },
                        sprites.insaneButtonHover
                    ),
                    muteButton,
                    backButton

                ];
            },
            sprites.onePlayersButtonHover
        ),
        muteButton
    ]




    async function getAssets(account) {
        // console.log(account)
        
        let path = `https://api.gamestoweb3.com/nft/get-user-1155-assets-by-collection/${account}/${contract}`
        await axios.get(path).then(
        async (response) => {
            var result = response.data;
            // console.log(result);
            let TokenIds = []
            let assets = await result?.filter((a)=> {
                console.log(a?.token_id)
                TokenIds.push(a?.token_id)
                return a?.token_id
            })
            localStorage.setItem('tokens', TokenIds)
        },
        (error) => {
            console.log(error);
        }
    );
    }


    let Sticks = [
            new Button
            (
                // bg4
                sprites.stick1, 
                new Vector2(200,150),
                function(){
                    
                    localStorage.setItem(`${account}-stick`, 'spr_stick1.png')
                    location.reload();
                },
                // sprites.easyButtonHover
            ),
            new Button
            (
                //bg5
                sprites.stick2, 
                new Vector2(200,220),
                function(){
                    if(!GetAssets.includes("5")) return toastr.info(`You don't have own the asset, <a href="https://gamestoweb3.com/collections/${contract}" target="_blank" style="color:yellow;">Buy on Gamestoweb3</a>`, 'Info', { timeOut: 10 * 1000, enableHtml: true, tapToDismiss: false })
                    localStorage.setItem(`${account}-stick`, 'spr_stick2.png')
                    location.reload();
                },
                // sprites.mediumButtonHover
            ),
            new Button
            (
                //bg5
                sprites.stick3, 
                new Vector2(200,290),
                function(){
                    if(!GetAssets.includes("6")) return toastr.info(`You don't have own the asset, <a href="https://gamestoweb3.com/collections/${contract}" target="_blank" style="color:yellow;">Buy on Gamestoweb3</a>`, 'Info', { timeOut: 10 * 1000, enableHtml: true, tapToDismiss: false })
                    localStorage.setItem(`${account}-stick`, 'spr_stick3.png')
                    location.reload();
                },
                // sprites.mediumButtonHover
            ),
            new Button
            (
                //bg5
                sprites.stick4, 
                new Vector2(200,360),
                function(){
                    if(!GetAssets.includes("7")) return toastr.info(`You don't have own the asset, <a href="https://gamestoweb3.com/collections/${contract}" target="_blank" style="color:yellow;">Buy on Gamestoweb3</a>`, 'Info', { timeOut: 10 * 1000, enableHtml: true, tapToDismiss: false })
                    localStorage.setItem(`${account}-stick`, 'spr_stick4.png')
                    location.reload();
                },
                // sprites.mediumButtonHover
            ),
            new Button
            (
                //bg5
                sprites.stick5, 
                new Vector2(200,430),
                function(){
                    if(!GetAssets.includes("8")) return toastr.info(`You don't have own the asset, <a href="https://gamestoweb3.com/collections/${contract}" target="_blank" style="color:yellow;">Buy on Gamestoweb3</a>`, 'Info', { timeOut: 10 * 1000, enableHtml: true, tapToDismiss: false })
                    localStorage.setItem(`${account}-stick`, 'spr_stick4.png')
                    location.reload();
                },
                // sprites.mediumButtonHover
            ),
            new Button
            (
                //bg5
                sprites.stick6, 
                new Vector2(200,500),
                function(){
                    if(!GetAssets.includes("9")) return toastr.info(`You don't have own the asset, <a href="https://gamestoweb3.com/collections/${contract}" target="_blank" style="color:yellow;">Buy on Gamestoweb3</a>`, 'Info', { timeOut: 10 * 1000, enableHtml: true, tapToDismiss: false })
                    localStorage.setItem(`${account}-stick`, 'spr_stick4.png')
                    location.reload();
                },
                // sprites.mediumButtonHover
            ),
            new Button
            (
                //bg5
                sprites.stick7, 
                new Vector2(200,570),
                function(){
                    if(!GetAssets.includes("10")) return toastr.info(`You don't have own the asset, <a href="https://gamestoweb3.com/collections/${contract}" target="_blank" style="color:yellow;">Buy on Gamestoweb3</a>`, 'Info', { timeOut: 10 * 1000, enableHtml: true, tapToDismiss: false })
                    localStorage.setItem(`${account}-stick`, 'spr_stick4.png')
                    location.reload();
                },
                // sprites.mediumButtonHover
            ),
            new Button
            (
                //bg5
                sprites.stick8, 
                new Vector2(200,630),
                function(){
                    if(!GetAssets.includes("11")) return toastr.info(`You don't have own the asset, <a href="https://gamestoweb3.com/collections/${contract}" target="_blank" style="color:yellow;">Buy on Gamestoweb3</a>`, 'Info', { timeOut: 10 * 1000, enableHtml: true, tapToDismiss: false })
                    localStorage.setItem(`${account}-stick`, 'spr_stick4.png')
                    location.reload();
                },
                // sprites.mediumButtonHover
            ),
            new Button
            (
                //bg5
                sprites.stick9, 
                new Vector2(200,700),
                function(){
                    if(!GetAssets.includes("12")) return toastr.info(`You don't have own the asset, <a href="https://gamestoweb3.com/collections/${contract}" target="_blank" style="color:yellow;">Buy on Gamestoweb3</a>`, 'Info', { timeOut: 10 * 1000, enableHtml: true, tapToDismiss: false })
                    localStorage.setItem(`${account}-stick`, 'spr_stick4.png')
                    location.reload();
                },
                // sprites.mediumButtonHover
            ),

        ];

    let connectButton = [
        new Button
        (
            sprites.connectButton,
            new Vector2(200,300),
            async function(){
                await ethereum.request({ method: "eth_requestAccounts" });
                window.web3 = new Web3(window.ethereum)
                var accounts = await web3.eth.getAccounts(); // get all connected accounts
                account = accounts[0];
                await localStorage.setItem('account',account)
                await sessionStorage.setItem('isConnected',true)
                await getAssets(account)
                GetAssets = await localStorage.getItem('tokens').split(',')
                // let TokenIds = []
                // const tokens = await GetAsset?.filter((a)=> {
                // console.log(a?.token_id)
                // return TokenIds.push(a?.token_id)
                // })
                console.log(GetAssets)
                // location.reload();
                console.log(account)

                Game.mainMenu.labels = generateMainMenuLabels("Select Background");

                Mouse.reset();
                Game.mainMenu.buttons = [
                    new Button
                    (
                        // bg4
                        sprites.backgroundBtn1, 
                        new Vector2(200,150),
                        function(){
                            localStorage.setItem(`${account}-bg`, 'spr_background1.png')
                            Game.mainMenu.labels = generateMainMenuLabels("Select Stick");

                            Mouse.reset();
                            Game.mainMenu.buttons = Sticks
                        },
                        // sprites.easyButtonHover
                    ),
                    new Button
                    (
                        //bg5
                        sprites.backgroundBtn2, 
                        new Vector2(200,350),
                        function(){
                            if(!GetAssets.includes("0")) return toastr.info(`You don't have own the asset, <a href="https://gamestoweb3.com/collections/${contract}" target="_blank" style="color:yellow;">Buy on Gamestoweb3</a>`, 'Info', { timeOut: 10 * 1000, enableHtml: true, tapToDismiss: false })
                            localStorage.setItem(`${account}-bg`, 'spr_background2.png')
                            Game.mainMenu.labels = generateMainMenuLabels("Select Stick");

                            Mouse.reset();
                            Game.mainMenu.buttons = Sticks
                            
                        },
                        // sprites.mediumButtonHover
                    ),
                    new Button
                    (
                        //bg5
                        sprites.backgroundBtn3, 
                        new Vector2(200,550),
                        function(){
                            if(!GetAssets.includes("1")) return toastr.info(`You don't have own the asset, <a href="https://gamestoweb3.com/collections/${contract}" target="_blank" style="color:yellow;">Buy on Gamestoweb3</a>`, 'Info', { timeOut: 10 * 1000, enableHtml: true, tapToDismiss: false })
                            localStorage.setItem(`${account}-bg`, 'spr_background3.png')
                            Game.mainMenu.labels = generateMainMenuLabels("Select Stick");

                            Mouse.reset();
                            Game.mainMenu.buttons = Sticks
                            
                        },
                        // sprites.mediumButtonHover
                    ),
                    new Button
                    (
                        //bg5
                        sprites.backgroundBtn4, 
                        new Vector2(500,150),
                        function(){
                            if(!GetAssets.includes("2")) return toastr.info(`You don't have own the asset, <a href="https://gamestoweb3.com/collections/${contract}" target="_blank" style="color:yellow;">Buy on Gamestoweb3</a>`, 'Info', { timeOut: 10 * 1000, enableHtml: true, tapToDismiss: false })
                            localStorage.setItem(`${account}-bg`, 'spr_background4.png')
                            Game.mainMenu.labels = generateMainMenuLabels("Select Stick");

                            Mouse.reset();
                            Game.mainMenu.buttons = Sticks
                            
                        },
                        // sprites.mediumButtonHover
                    ),
                    new Button
                    (
                        //bg5
                        sprites.backgroundBtn5, 
                        new Vector2(500,350),
                        function(){
                            if(!GetAssets.includes("3")) return toastr.info(`You don't have own the asset, <a href="https://gamestoweb3.com/collections/${contract}" target="_blank" style="color:yellow;">Buy on Gamestoweb3</a>`, 'Info', { timeOut: 10 * 1000, enableHtml: true, tapToDismiss: false })
                            localStorage.setItem(`${account}-bg`, 'spr_background5.png')
                            Game.mainMenu.labels = generateMainMenuLabels("Select Stick");

                            Mouse.reset();
                            Game.mainMenu.buttons = Sticks
                            
                        },
                        // sprites.mediumButtonHover
                    ),
                    new Button
                    (
                        //bg5
                        sprites.backgroundBtn6, 
                        new Vector2(500,550),
                        function(){
                            if(!GetAssets.includes("4")) return toastr.info(`You don't have own the asset, <a href="https://gamestoweb3.com/collections/${contract}" target="_blank" style="color:yellow;">Buy on Gamestoweb3</a>`, 'Info', { timeOut: 10 * 1000, enableHtml: true, tapToDismiss: false })
                            localStorage.setItem(`${account}-bg`, 'spr_background6.png')
                            Game.mainMenu.labels = generateMainMenuLabels("Select Stick");

                            Mouse.reset();
                            Game.mainMenu.buttons = Sticks
                            
                        },
                        // sprites.mediumButtonHover
                    ),

                ];
                
            }
        )
    ]


    let assets = [
        new Button
        (
            sprites.connectButton,
            new Vector2(200,300),
            async function(){
                await ethereum.request({ method: "eth_requestAccounts" });
                window.web3 = new Web3(window.ethereum)
                var accounts = await web3.eth.getAccounts(); // get all connected accounts
                account = accounts[0];
                await sessionStorage.setItem('account',account)
                let assets = await getAssets(account)
                // location.reload();
                console.log(account)
                
            }
        )
    ]

    // buttons = buttons.concat(!account?connectButton:menuButtonss);
    buttons = buttons.concat(!isConnected?connectButton:menuButtonss);

    return buttons;
}

async function init() {
    isConnected = await sessionStorage.getItem('isConnected')
account = await localStorage.getItem('account')
bgasset = await localStorage.getItem(`${account}-bg`)
stickAsset = await localStorage.getItem(`${account}-stick`)
console.log(account, bgasset,stickAsset)
}
init();