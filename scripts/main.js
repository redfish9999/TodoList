var vm = new Vue({
  el: '#todolist',
  data: {
   newTask: '', // 新增Task
   waitTasks: [], //待辦事項
   tempTask: '', // 編輯暫存
   doneTasks: [] // 完成事項
  },
  methods: {
    // 添加到頁面
    add_icon: function() {
      if(this.newTask == ""){
        alert("尚未輸入項目");
      }else{
        vm.addWaititem(this.newTask);
        this.newTask = '';
      }
    },
    addWaititem: function(content) {
      var time =  Math.floor(Date.now());
      this.waitTasks.push({ id: time, text: this.newTask, controllModify: true });
      console.log("Push time:" + time);
    },
    // 顯示改為input模式
    waitModifyIcon: function(id) {
      for(let n = 0; n < this.waitTasks.length ; n++ ){
        if( this.waitTasks[n].id === id ) {
          console.log( "In edit: " + id ); // check
          this.tempTask = this.waitTasks[n].text; // 同步input資料
          this.waitTasks[n].controllModify = false;
        }else{
          this.waitTasks[n].controllModify = true;
        }
      }
    },
    // 離開編輯模式
    closeEdit: function(id, isComplete) {
      for(let n = 0; n < this.waitTasks.length ; n++ ){
        if( this.waitTasks[n].id === id ) {
          if( isComplete ) {  // 確認修改資料
            console.log( "Succeeded edit: " + id ); // check
            this.waitTasks[n].text = this.tempTask;
          }
          console.log( "Return edit: " + id ); // check
          this.tempTask = '';
          this.waitTasks[n].controllModify = true;
        }
      }
    },
    // 刪除
    waitTrashIcon: function(id) {
      for(let n = 0; n < this.waitTasks.length ; n++ ){
        if( this.waitTasks[n].id === id ) {
          console.log( "Delete wait: " + id ); // check
          this.waitTasks.splice(n,1);
        }
      }
    },
    // 完成task
    waitDoneIcon: function(id) {
      for( let n = 0 ; n < this.waitTasks.length ; n++ ){
        if( this.waitTasks[n].controllModify && this.waitTasks[n].id === id) {
          this.addDoneTask(this.waitTasks[n]);
          this.waitTrashIcon(id);
          break;
        }
      }
    },
    // 新增至donetask
    addDoneTask: function( task) {
      console.log(task);
      this.doneTasks.push(task);
    },
    // 移除已完成task
    doneTrashIcon: function(id) {
      for(let n = 0; n < this.doneTasks.length ; n++ ){
        if( this.doneTasks[n].id === id ) {
          console.log( "Delete done: " + id ); // check
          this.doneTasks.splice(n,1);
        }
      }
    },
    // 修改為待辦task
    doneUndoneIcon: function(id) {
      for(let n = 0; n < this.doneTasks.length ; n++ ){
        if( this.doneTasks[n].id === id ) {
          console.log( "Done to Undone: " + id ); // check
          this.waitTasks.push(this.doneTasks[n]);
          this.doneTasks.splice(n,1);
        }
      }
    }
  }
})
