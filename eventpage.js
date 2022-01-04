var contextMenuItem ={
    "id" : "spendMoney",
    "title" : "Spend This Money",
    "contexts" : ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId== "spendMoney" && clickData.selectionText){
        if (Number.isInteger(parseInt(clickData.selectionText))){
            chrome.storage.sync.get(['total','limit'], function(budget){
                var newTotal = 0;
                var amountremainig= budget.limit-budget.total;
                if (budget.total){
                    newTotal += parseInt(budget.total);
                }
                amountremainig-= parseInt(clickData.selectionText);
                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({'remaining': amountremainig})
                chrome.storage.sync.set({'total': newTotal}, function(){               
                if (newTotal >= budget.limit){
                    var notifOptions= {
                        type: 'basic',
                        iconUrl: 'icon64.png',
                        title: 'Passed your budget!', 
                        message: "Alert! You have spent more than your budget."
                    };
                    
                    chrome.notifications.create('limitNotif', notifOptions);

                    }
                });
            });    
        }
    }
});
chrome.storage.onChanged.addListener(function(changes, storageName){
    chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()});
});