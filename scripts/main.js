var vm = new Vue({
  el: '#todolist',
  data: {
   newTask: '', // 新增Task
   waitTasks: [], //待辦事項
   tempTask: '', // 編輯暫存
   doneTasks: [] // 完成事項
  },
  methods: {
    add_icon: function() {
      if( this.newTask == "" ){
        alert("尚未輸入項目");
      }else{
        vm.addWaititem( this.newTask );
        this.newTask = '';
      }
    }, //add_icon() 添加到頁面
    addWaititem: function( content ) {
      var time =  Math.floor(Date.now());
      this.waitTasks.push({ id: time, text: this.newTask, controllModify: true });
      console.log( "Push time:" + time );
    }, //addWaititem()
    waitModifyIcon: function( id ) {
      for(let n = 0; n < this.waitTasks.length ; n++ ){
        if( this.waitTasks[n].id === id ) {
          console.log( "In edit: " + id ); // check
          this.tempTask = this.waitTasks[n].text; // 同步input資料
          this.waitTasks[n].controllModify = false;
        }else{
          this.waitTasks[n].controllModify = true;
        }
      }
    }, //waitModifyIcon() 顯示改為input模式
    closeEdit: function( id, isComplete ) {
      let seat = this.taskSeeking( id, this.waitTasks );
      if( isComplete ) {
        console.log( "Succeeded edit: " + id ); // check
        this.waitTasks[seat].text = this.tempTask;
      }
      console.log( "Return edit: " + id ); // check
      this.tempTask = '';
      this.waitTasks[seat].controllModify = true;
    }, // closeEdit() 離開編輯模式
    waitTrashIcon: function( id ) {
      let seat = this.taskSeeking( id, this.waitTasks );
      console.log( "Delete wait: " + id );  // check
      this.waitTasks.splice( seat,1 );
    }, // waitTrashIcon() 刪除
    waitDoneIcon: function( id ) {
      let seat = this.taskSeeking( id, this.waitTasks );
      if( this.waitTasks[seat].controllModify ) {
        this.addDoneTask( this.waitTasks[seat] );
        this.waitTrashIcon( id );
      } // if
    }, // waitDoneIcon() 完成task
    addDoneTask: function( task ) {
      console.log(task);
      this.doneTasks.push( task );
    }, // addDoneTask() 新增至donetask
    doneTrashIcon: function( id ) {
      let seat = this.taskSeeking( id, this.doneTasks );
      console.log( "Delete done: " + id ); // check
      this.doneTasks.splice( seat,1 );
    },  // doneTrashIcon() 移除已完成task
    doneUndoneIcon: function( id ) {
      let seat = this.taskSeeking(id, this.doneTasks);
      console.log( "Done to Undone: " + id ); // check
      this.waitTasks.push( this.doneTasks[seat] );
      this.doneTasks.splice( seat,1 );
    },  // doneUndoneIcon() 修改為待辦task
    taskSeeking: function( id, task ) {
      for(let n = 0; n < task.length ; n++ ){
        if( task[n].id === id ) {
          console.log( "Seek the " + id ); // check
          return n;
        }
      }

      console.log("Failed to seak " + id);
      return -1;
    } // taskSeeking() 尋找task array中等同id的task
  } // methods
})
