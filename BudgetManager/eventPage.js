var contextMenuItem = {
  "id" : "moneySpent",
  "title" : "SpentMoney",
  "context" : ["selection"]
};
chrome.contextMenus.create(contextMenuItem);
chrome.contextMenu.onClicked.addListener(function(clickData){
  if(clickData.menuItemId == "moneySpent" && clickData.selectionText){
    if(isInt(clickData.selectionText)){
      chrome.storage.sync.get(['total','limit'],function(budget){
        var total = 0;
        if(budget.total){
          total = total + parseInt(budget.total);
        }
        total = total + parseInt(clickData.selectionText);
        chrome.storage.sync.set({ 'total' : total },function(){
          if(total >= budget.limit){
            var notificationsOptions = {
              type : "basic",
              iconUrl : "icon48.png",
              title : "Limit Reached",
              message : "You have crossed the set Limit"
            };
            chrome.notifications.create('limitCrossed',notificatinsOptions);
          }
        });
      });
    }
  }
});
function isInt(value){
  return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value,10));
}
chrome.storage.onChanged.addListener(function(changes,storageName){
  chrome.browserAction.setBadgeText({ "text" : changes.total.new.tostring() });
});
