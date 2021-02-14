<template>
  <div class="flex">
    <div class="w-1/3 p-2">
      <h2>Habits</h2>
      <HabitTask 
      v-for="task in user.tasks.habits" 
      :key="task.id" 
      :title="task.title"
      :notes="task.notes"
      :pos="task.pos"
      :posVal="task.posVal"
      :neg="task.neg"
      :negVal="task.negVal"
      :diff="task.diff"
      :id="task.id"
      v-on:taskclicked="putTask">

      </HabitTask>
    </div>
    <div class="w-1/3 p-2">
      <h2>Dailies</h2>
      <DailyTask 
      v-for="task in user.tasks.dailies" 
      :key="task.id" 
      
      :title="task.title"
      :notes="task.notes"
      :checked="task.checked"
      :diff="task.diff"
      :streak="task.streak"
      :id="task.id"
      v-on:taskclicked="putTask">

      </DailyTask>
    </div>
    <div class="w-1/3 p-2">
      <h2>To Do's</h2>
      <ToDoTask 
      v-for="task in user.tasks.todos" 
      :key="task.id" 
      
      :title="task.title"
      :notes="task.notes"
      :checked="task.checked"
      :date="task.date"
      :diff="task.diff"
      :id="task.id"
      v-on:taskclicked="putTask">
      
      </ToDoTask>
    </div>
  </div>
</template>

<script>
// import HabiticaAPIManager from '../HabiticaMagic/HabiticaAPIManager'
import HabitTask from './HabiticaComponents/HabitTask.vue'
import DailyTask from './HabiticaComponents/DailyTask.vue'
import ToDoTask from './HabiticaComponents/ToDoTask.vue'

//  
export default {
  name: 'Habitica',
  props: {

  },
  components: {
    HabitTask,
    DailyTask,
    ToDoTask
  },
  data () {
    return {
      apiManager: null,
      xclient: '0a72f378-6bca-4fdd-ae25-0d94558fd598-VueHabiticaComponent',
      userID: '0a72f378-6bca-4fdd-ae25-0d94558fd598',
      apiToken: 'fa24c785-f9e4-418a-a796-cab43fca3d0b',
      apiURL: '',
      user: {
        tasks: {
          habits: [],
          dailies: [],
          todos: []
        }
      }
    }
  },
  methods: {
    updateHabitica: function()
    {
      return this.$root.$http.get('https://habitica.com/api/v3/tasks/user', {
        headers: {
          'x-client': this.xclient,
          'x-api-user': this.userID,
          'x-api-key': this.apiToken
        }
      }).then((response) => {
        // console.log(response)
        this.user.tasks.habits = [];
        this.user.tasks.dailies = [];
        this.user.tasks.todos = [];

        var i;
        // var j = 0;
        var len = response.body.data.length;
        var task;
        for (i = 0; i < len; i++) {
          switch (response.body.data[i].type) {
            case 'habit':
              task = {
                title: response.body.data[i].text,
                notes: response.body.data[i].notes,
                pos: response.body.data[i].up,
                posVal: response.body.data[i].counterUp,
                neg: response.body.data[i].down,
                negVal: response.body.data[i].counterDown,
                diff: response.body.data[i].priority,
                id: response.body.data[i].id
              }
              this.user.tasks.habits.push(task);
              // this.user.tasks.habits[j].title = response.body.data[i].text;
              // this.user.tasks.habits[j].notes = response.body.data[i].notes;
              // this.user.tasks.habits[j].pos = response.body.data[i].up;
              // this.user.tasks.habits[j].neg = response.body.data[i].down;
              // this.user.tasks.habits[j].posVal = response.body.data[i].counterUp;
              // this.user.tasks.habits[j].negVal = response.body.data[i].counterDown;
              // this.user.tasks.habits[j].id = response.body.data[i].id;
              // this.user.tasks.habits[j].diff = response.body.data[i].priority;
              break;
            case 'daily':
              if (response.body.data[i].isDue) {
                task = {
                  title: response.body.data[i].text,
                  notes: response.body.data[i].notes,
                  checked: response.body.data[i].completed,
                  streak: response.body.data[i].streak,
                  diff: response.body.data[i].priority,
                  id: response.body.data[i].id
                }
                this.user.tasks.dailies.push(task);

                // this.user.tasks.dailies[j].title = response.body.data[i].text;
                // this.user.tasks.dailies[j].notes = response.body.data[i].notes;
                // this.user.tasks.dailies[j].checked = response.body.data[i].completed;
                // this.user.tasks.dailies[j].streak = response.body.data[i].streak;
                // this.user.tasks.dailies[j].id = response.body.data[i].id;
              }
              // else {
              //   j--;
              // }
              break;
            case 'todo':
              if (!response.body.data[i].completed) {
                task = {
                  title: response.body.data[i].text,
                  notes: response.body.data[i].notes,
                  checked: response.body.data[i].completed,
                  diff: response.body.data[i].priority,
                  id: response.body.data[i].id,
                  date: response.body.data[i].date === null ? '' : response.body.data[i].date,
                }
                this.user.tasks.todos.push(task);

                // this.user.tasks.todos[j].title = response.body.data[i].text;
                // this.user.tasks.todos[j].notes = response.body.data[i].notes;
                // this.user.tasks.todos[j].checked = response.body.data[i].completed;
                // this.user.tasks.todos[j].id = response.body.data[i].id;
                // this.user.tasks.todos[j].date = response.body.data[i].date === null ? '' : response.body.data[i].date;
              }
              // else {
              //   j--;
              // }
              break;
            case 'reward':

              break;
            case 'completedTodo':

              break;
            
          }
          // j++;
        }
      }, () => {
        console.log('no luck')
        // fail
      });
    },
    putTask: function(taskId, bodyData) {
      console.log('putTask')
      return this.$root.$http.put('https://habitica.com/api/v3/tasks/' + taskId, bodyData, {
        headers: {
          'x-client': this.xclient,
          'x-api-user': this.userID,
          'x-api-key': this.apiToken
        }
      }).then((response) => {
        console.log(response);
        // this.updateHabitica();
      });
    }
  },
  mounted() {
    // this.apiManager = new HabiticaAPIManager(this.xclient);

    this.updateHabitica();
  }
}
</script>

<style scoped>

</style>
