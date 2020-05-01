var addevent = document.getElementsByClassName('add__icon')[0];
var addinput = document.getElementsByClassName('add__input')[0];
var wait = document.getElementsByClassName('wait')[0];
var done = document.getElementsByClassName('done')[0];
var controlModify=true;

addevent.onclick=function(){
  var addcontent = addinput.value.trim();
  if(addcontent == ""){
    alert("尚未輸入項目");
  }else{
    addWaititem(addcontent);
    addinput.value="";
  }
};


function addWaititem(content){
  var waitItem = document.createElement("div");
  var waitItemText = document.createElement("div");
  var waitItemIcons = document.createElement("div");
  var waitItemIconsModify = document.createElement("div");
  var waitItemIconsTrash = document.createElement("div");
  var waitItemIconsDone = document.createElement("div");
//添加class
  waitItem.className="wait__item";
  waitItemText.className="wait__item__text";
  waitItemIcons.className="wait__item__icons";
  waitItemIconsModify.className="wait__item__icons__modify";
  waitItemIconsTrash.className="wait__item__icons__trash";
  waitItemIconsDone.className="wait__item__icons__done";
//添加待辦事項內容
  waitItemText.innerHTML=content;
//添加icon
  waitItemIconsModify.innerHTML="<i class="+'"fa fa-pencil"'+"></i>";
  waitItemIconsTrash.innerHTML="<i class="+'"fa fa-trash-o"'+"></i>";
  waitItemIconsDone.innerHTML="<i class="+'"fa fa-check-circle"'+"></i>";
//添加元素，形成父子關係
  waitItemIcons.appendChild(waitItemIconsModify);
  waitItemIcons.appendChild(waitItemIconsTrash);
  waitItemIcons.appendChild(waitItemIconsDone);
  waitItem.appendChild(waitItemText);
  waitItem.appendChild(waitItemIcons);
//添加到頁面上
  wait.appendChild(waitItem);
//增加修改方法
  waitItemIconsModify.onclick=function(ev){
    if (controlModify==true){
      controlModify=false;
      var waitItemBefore=waitItemText.innerHTML;
      waitItemText.innerHTML="<input class="+'"wait__item__text__input"'+'type="text">';
      var waitItemTextInput = document.getElementsByClassName('wait__item__text__input')[0];
      waitItemTextInput.value= waitItemBefore;
      waitItemTextInput.focus();
      ev=window.event || ev;
      ev.stopPropagation ? ev.stopPropagation() : ev.cancelBubble=true;
      document.onclick=function(){
        waitItemText.innerHTML=waitItemTextInput.value;
        controlModify=true;
      }
    }
  }
  //增加刪除方法
  waitItemIconsTrash.onclick=function(){
    waitItem.parentNode.removeChild(waitItem);
  }
  //增加完成方法
  waitItemIconsDone.onclick=function(){
    if(controlModify==true){
      addDoneItem(waitItemText.innerHTML);
      waitItem.parentNode.removeChild(waitItem);
    }
  }
}

function addDoneItem(doneContent){
  var doneItem = document.createElement("div");
  var doneItemText = document.createElement("div");
  var doneItemIcons = document.createElement("div");
  var doneItemIconsTrash = document.createElement("div");
  var doneItemIconsDone = document.createElement("div");
  //添加class
  doneItem.className="done__item";
  doneItemText.className="done__item__text";
  doneItemIcons.className="done__item__icons";
  doneItemIconsTrash.className="done__item__icons__trash";
  doneItemIconsDone.className="done__item__icons__done";
  //添加完成事項內容
  doneItemText.innerHTML=doneContent;
  //添加icon
  doneItemIconsTrash.innerHTML="<i class="+'"fa fa-trash-o"'+"></i>";
  doneItemIconsDone.innerHTML="<i class="+'"fa fa-check-circle"'+"></i>";
  //添加元素，形成父子關係
  doneItemIcons.appendChild(doneItemIconsTrash);
  doneItemIcons.appendChild(doneItemIconsDone);
  doneItem.appendChild(doneItemText);
  doneItem.appendChild(doneItemIcons);
  //添加到頁面上
  done.appendChild(doneItem);
  //增加刪除方法
  doneItemIconsTrash.onclick=function(){
    doneItem.parentNode.removeChild(doneItem);
  }
  // 增加未完成方法
  doneItemIconsDone.onclick=function(){
    addWaititem(doneItemText.innerHTML);
    doneItem.parentNode.removeChild(doneItem);
  }
}
