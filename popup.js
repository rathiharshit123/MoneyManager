$(function(){
    chrome.storage.sync.get(['total','limit','remaining'],function(budget){
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
        $('#remain').text(budget.remaining);
    }); 
    $('#spendAmount').click(function(){
        chrome.storage.sync.get(['total','limit'],function(budget){
            var newTotal = 0;
            var amountremainig= budget.limit-budget.total;
            if (budget.total){
                newTotal += parseInt(budget.total);
            }

            var amount = $('#amount').val();
            if (amount){
                newTotal += parseInt(amount);
                amountremainig-=parseInt(amount);
            }

            chrome.storage.sync.set({'remaining' : amountremainig });

            chrome.storage.sync.set({'total': newTotal},function(){
                if(amount && newTotal >= budget.limit){
                    var notifOptions= {
                        type: 'basic',
                        iconUrl: 'icon64.png',
                        title: 'Passed your budget!', 
                        message: "Alert! You have spent more than your budget."
                    };
                    chrome.notifications.create('limitNotif',notifOptions);
                }
            });
            
            $('#total').text(newTotal);
            $('#amount').val('');
            $('#remain').text(amountremainig);
        });
    });
});