var vm = new Vue({
  el: '#todolist',
  data: {
   newTask: '', // 新增Task
   waitTasks: [], //待辦事項
   tempTask: '', // 編輯暫存
   doneTasks: [] // 完成事項
  },
  created: function(){
    console.log("Succeded to load Local Storage!");
    if( localStorage.getItem("waitTasks") != null ){
      console.log("LS is not empty");
      this.waitTasks = JSON.parse(localStorage.getItem("waitTasks"));
    }
    if( localStorage.getItem("doneTasks") != null ){
      console.log("LS is not empty");
      this.doneTasks = JSON.parse(localStorage.getItem("doneTasks"));
    }
  }, // created
  watch: {
    waitTasks: {
      handler: function (val) {
        console.log("waitTasks Changed!");
        let storageTranslate = JSON.stringify( val );  // 將waitTasks轉為string
        localStorage.setItem( "waitTasks", storageTranslate ); // 將變數存到localStorage裡
      },
      deep: true
    },
    doneTasks: {
      handler: function (val) {
        console.log("doneTasks Changed!");
        let storageTranslate = JSON.stringify( val );  // 將waitTasks轉為string
        localStorage.setItem( "doneTasks", storageTranslate ); // 將變數存到localStorage裡
      },
      deep: true
    }
  }, // watch
  methods: {
    add_icon: function() {
      if( this.newTask == '' ){
        alert("尚未輸入項目");
      }else{
        vm.addWaititem( this.newTask );
        this.newTask = '';
      } // else
    }, //add_icon() 添加到頁面
    addWaititem: function( content ) {
      let timeCode =  Math.floor(Date.now());
      let timeNow = timeTranslate( timeCode );

      this.waitTasks.push({ id: timeCode, text: this.newTask, controllModify: true, date:timeNow });
      console.log( "Add ID: " + timeCode );
    }, //addWaititem()
    waitModifyIcon: function( id ) {
      for(let n = 0; n < this.waitTasks.length ; n++ ){
        if( this.waitTasks[n].id === id ) {
          console.log( "In Edit: " + id ); // check
          this.tempTask = this.waitTasks[n].text; // 同步input資料
          this.waitTasks[n].controllModify = false;
        }else{
          this.waitTasks[n].controllModify = true;
        } //else
      } // for
    }, //waitModifyIcon() 顯示改為input模式
    closeEdit: function( id, isComplete ) {
      let seat = taskSeeking( id, this.waitTasks );

      if( isComplete ) {
        console.log( "Succeeded modify: " + id ); // check
        this.waitTasks[seat].text = this.tempTask;
      } // if

      console.log( "Close Edit." ); // check
      this.tempTask = '';
      this.waitTasks[seat].controllModify = true;
    }, // closeEdit() 離開編輯模式
    waitTrashIcon: function( id ) {
      let seat = taskSeeking( id, this.waitTasks );

      console.log( "Delete wait: " + id );  // check
      this.waitTasks.splice( seat,1 );
    }, // waitTrashIcon() 刪除
    waitDoneIcon: function( id ) {
      let seat = taskSeeking( id, this.waitTasks );
      let seatDone;
      let timeNow = timeTranslate( Date.now() );

      if( this.waitTasks[seat].controllModify ) {
        this.doneTasks.push( this.waitTasks[seat] );
        seatDone = taskSeeking( id, this.doneTasks );
        this.doneTasks[seatDone].date = timeNow;
        console.log('Done time: ' + this.doneTasks[seatDone].date);

        this.waitTrashIcon( id );
      } // if
    }, // waitDoneIcon() 完成task
    doneTrashIcon: function( id ) {
      let seat = taskSeeking( id, this.doneTasks );

      console.log( "Delete done: " + id ); // check
      this.doneTasks.splice( seat, 1 );
    },  // doneTrashIcon() 移除已完成task
    doneUndoneIcon: function( id ) {
      let seat = taskSeeking( id, this.doneTasks );
      let seatwait;
      let timeNow = timeTranslate( Date.now() );

      console.log( "Done to Undone: " + id ); // check
      this.waitTasks.push( this.doneTasks[seat] );
      seatwait = taskSeeking( id, this.waitTasks );
      this.waitTasks[seatwait].date = timeNow;

      this.doneTasks.splice( seat, 1 );
    },  // doneUndoneIcon() 修改為待辦task
    showStorage: function() {
      var newWaitTask = localStorage.getItem("waitTasks");
      newWaitTask = JSON.parse(newWaitTask); //轉為JSON
      console.log("In Storage: ", newWaitTask); // 列印出原先物件
    },
    clearStorage: function() {
      this.waitTasks = [];
      this.doneTasks = [];
      localStorage.clear();
    },
  } // methods
})

function taskSeeking( id, tasks ) {
  for(let n = 0; n < tasks.length ; n++ ){
    if( tasks[n].id === id ) {
      console.log( "Seek the task: " + id ); // check
      return n;
    }
  }

  console.log("Failed to seak " + id);
  return -1;
} // taskSeeking() 尋找task array中等同id的task

function timeTranslate( timeCode ) {
  let time = new Date(timeCode);
  let year = time.getFullYear().toString();
  let momth = time.getMonth().toString();
  let date = time.getDate().toString();
  let hour = time.getHours().toString();
  let min = time.getMinutes().toString();

  return year + '/' + momth + '/' + date + ' ' + hour + ':' + min;
} // timeTranslate() 回傳 年/月/日 時間
