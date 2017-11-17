$(document).ready(function(){
  chrome.storage.sync.get('limit',function(budget){
    if(budget.limit){
      $("#setLimitValue").val(budget.limit);
    }
    else{
      $("#setLimitValue").val(0);
    }
  });
  $("#setLimit").click(function(){
    val limitValue = $("#setLimitValue").val();
    if(limitValue){
      chrome.storage.sync.set({ 'limit' : limitValue },function(){
        close();
      });
    }
  });
  $("#resetTotal").click(function(){
    chrome.storate.sync.set({ 'total' : 0 },function(){
      var notificationsOptions = {
        type : "basic",
        iconUrl : "icon48.png",
        title : "Total Reset",
        message : "Current Total = 0"
      };
      chrome.notifications.create('resetNotification',notificationsOptions);
    });
  });
});
