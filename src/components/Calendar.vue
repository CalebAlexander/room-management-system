<template>
  <div class="">
    
    <vue-cal 
    xsmall
    style="height: 450px"
    active-view="day"
    :disable-views="['years', 'year', 'month']"
    :time-from="7 * 60" :time-to="16 * 60" 
    time-format="h:mm{am}"/>
  </div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import moment from 'moment'


export default {
  name: 'Calendar',
  props: {

  },
  components: {
    VueCal
  },
  data () {
    return {
      events: [

      ],
      clientID: '224391035784-ec1noq292glf3nuanaifdi60jit4qfil.apps.googleusercontent.com',
      clientSecret: 'YUfDKlbjGXooFU65U7LIvxG5',
      apiKey: 'AIzaSyCimvxsH5vkyboDb_phRycOvlgYv4loPzU',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      scopes: 'https://www.googleapis.com/auth/calendar',
      authorized: false,
      items: undefined,
    }
  },
  methods: {
    updateCalendar: function()
    {
      if (!this.authorized) {
        // this.handleAuth();
      }
      else {
        this.getEvents();
        console.log(this.items)
      }
    },
    handleClientLoad() {
        this.api.load('client:auth2', this.initClient);
    },
    initClient: function() {
      let vm = this;
      vm.api.client.init({
          apiKey:  vm.apiKey,
          clientId: vm.clientID,
          discoveryDocs: vm.discoveryDocs,
          scope: vm.scopes
      }).then(() => {
        vm.api.auth2.getAuthInstance().isSignedIn.listen(vm.authorized);
      });
    },

    handleAuth: function() {
      console.log('authenticating...')
      Promise.resolve(this.api.auth2.getAuthInstance().signIn())
          .then(() => {
              this.authorized = true;
          });
    },
    handleSignOut: function() {
      Promise.resolve(this.api.auth2.getAuthInstance().signOut())
          .then(() => {
              this.authorized = false;
          });
    },
    getEvents: function() {
      let vm = this;
      vm.api.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (moment(this.filters.start).format('YYYY-MM-DDTHH:mm:ss.SZ')),
          'timeMax': (moment(this.filters.end).format('YYYY-MM-DDTHH:mm:ss.SZ')),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
      }).then(response => {
          this.items =  response.result.items;
      });
    },
    
  },
  mounted() {
    // this.api = gapi;
    // console.log('mounted')
    // console.log(this.$gapi)
    // this.$root.$gapi.getGapiClient().then((gapi) => {
    //   this.api = gapi;
    //   console.log(gapi)
    // })
    // this.handleClientLoad();
    

    // if (!this.authorized) {
    //   this.handleAuth();
    // }
    
  },
  beforeDestroy() {
    if (this.authorized) {
      this.handleSignOut();
    }
  }
}
</script>

<style scoped>

</style>
