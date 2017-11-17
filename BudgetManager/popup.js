$(document).ready(function(){
  chrome.storage.sync.get(['total','limit'],function(budget){
    if(budget.total){
      $("#totalValue").text(budget.total);
    }
    else{
      $("#totalValue").text(0);
    }
    if(budget.limit){
      $("#limitValue").text(budget.limit);
    }
    else{
      $("#limitValue").text(0);
    }
  });
  $("#updateTotal").click(function(){
    var total = 0;
    chrome.storage.sync.get(['total','limit'],function(budget){
      if(budget.total){
        total = parseInt(budget.total);
      }
      val currentSpending = $("#currentSpending").val();
      if(currentSpending){
      total = total + parseInt(currentSpending);
      }
      var limit = 0;
      if(budget.limit){
        limit = parseInt(budget.limit);
      }
      $("#totalValue").text(total);
      $("#currentSpending").val(0);
      chrome.storage.sync.set({ 'total' : total },function(){
        if(currentSpending && total >= limit){
          var notificationsOptions = {
            type : "basic",
            iconUrl : "icon48.png",
            title : "Limit Reached",
            message : "You have crossed the set limit"
          };
          chrome.notifications.create('limitNotification',notificationsOptions);
        }
      });
    });
  });
});
