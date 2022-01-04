$(function () {
    chrome.storage.sync.get('limit', function (budget) {
        $('#limit').val(budget.limit);
    });

    $('#saveLimit').click(function () {
        var limit = $('#limit').val();
        if (limit) {
            
            
            chrome.storage.sync.set({ 'limit': limit }, function () {
                close();
            });
            chrome.storage.sync.get(['total','limit'], function (budget) {
            
                chrome.storage.sync.set({ 'remaining': budget.limit-budget.total});
            });
        }
    });

    $('#resetTotal').click(function () {
        chrome.storage.sync.get('limit', function (budget) {
            
            chrome.storage.sync.set({ 'remaining': budget.limit})
        });
        chrome.storage.sync.set({ 'total': 0 }, function () {
            var notifOptions= {
                type: 'basic',
                iconUrl: 'icon64.png',
                title: 'Reset Done', 
                message: "Alert! Your money spent has been rest to 0."
            };
            chrome.notifications.create('limitNotif',notifOptions);
        });
    });
});