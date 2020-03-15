'use strict';

var socket = io('/controllers');

Vue.use(VueRouter);

let showimage = (imgurl, source) => {
    //console.log("showimage " + imgurl);
    //alert(imgurl);
    socket.emit('change image', {value: imgurl, controller: source});
};

let imagedir = '/images/Ratchada18/';
let timeout = 600;

let component1 = {
    template:  `<v-expansion-panel popout dark expand>
        <v-expansion-panel-content>
            <div slot="header" class="title"><v-icon dark left>fas fa-video</v-icon> Videos</div>
            <div class="wrapper">
                <div class="box" v-for="im in images" v-if="im.group=='video' || im.group=='map'">
                    <v-avatar size="100px" v-on:click="setimage(im.key, 'c1', im.projectcode)" v-ripple>                
                        <img :src="im.thumbnail" :alt="im.name" />
                    </v-avatar><br />
                    <div class="imagetitle">{{ im.name }}</div>
                </div>
            </div>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
            <div slot="header" class="title"><v-icon dark left>fas fa-building</v-icon> Exteriors</div>
            <div class="wrapper">
                <div class="box" v-for="im in images" v-if="im.group=='exterior'">
                    <v-avatar size="100px" v-on:click="setimage(im.key, 'c1', im.projectcode)" v-ripple>                
                        <img :src="im.thumbnail" :alt="im.name" />
                    </v-avatar><br />
                    <div class="imagetitle">{{ im.name }}</div>
                </div>
            </div>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
            <div slot="header" class="title"><v-icon dark left>fas fa-cube</v-icon> Interiors</div>
            <div class="wrapper">
                <div class="box" v-for="im in images" v-if="im.group=='interior'">
                    <v-avatar size="100px" v-on:click="setimage(im.key, 'c1', im.projectcode)" v-ripple>                
                        <img :src="im.thumbnail" :alt="im.name" />
                    </v-avatar><br />
                    <div class="imagetitle">{{ im.name }}</div>
                </div>
            </div>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
            <div slot="header" class="title"><v-icon dark left>fas fa-th-large</v-icon> Room Types</div>
            <div class="wrapper">
                <div class="box" v-for="im in images" v-if="im.group=='roomtype'">
                    <v-avatar size="100px" v-on:click="setimage(im.key, 'c1', im.projectcode)" v-ripple>                
                        <img :src="im.thumbnail" :alt="im.name" />
                    </v-avatar><br />
                    <div class="imagetitle">{{ im.name }}</div>
                </div>
            </div>
        </v-expansion-panel-content>
    </v-expansion-panel>`,
  methods: {
      showimage: showimage,
      start() {
        this.isRunning = true;
        this.time = timeout;
        console.log("timer :" + this.timer);
        if (!this.timer) {
            console.log("No timer.");
            
            this.timer = setInterval(() => {
                console.log("setting timer: " + this.timer);
            if (this.time > 0) {
                this.time--;
            }
            else {
                this.reset();
            }
          }, 1000);
        }
        else {
            console.log("Already got the timer");
            this.stop();
            this.timer = setInterval(() => {
                console.log("setting timer: " + this.timer);

                if (this.time > 0) {
                    console.log("Counting: " + this.time);
                    this.time--;
                }
                else {
                    console.log("No more!!!!");
                    this.reset();                
                }
            }, 1000);
        }
      },
      stop() {
          console.log("Stopping..");
          this.isRunning = false;
          clearInterval(this.timer);
          this.timer = null;
      },
      reset() {
          console.log("Resetting...");
          this.stop();
          this.time = timeout;
          console.log("Emitting default: " + timeout);
          socket.emit('set image', {value: contents.RHK[0].key, controller: 'c1', project: 'RHK'});
      },
      setimage: function(imagekey, source, project) {
        socket.emit('set image', {
            value: imagekey, 
            controller: source, 
            project: project
        });

        if (group !== 'video') {
            this.start();
        }
      }      
  },
  data: function() {
      return {
          images: contents.Ratchada18
      }
  }
};

let sample = {
    template : `<div class="wrapper">        
        <div class="box" v-for="im in images">
            <v-avatar size="100px" v-on:click="setimage(im.key, 'c1', im.group)" v-ripple>                
                <img :src="im.thumbnail" :alt="im.name" />
            </v-avatar><br />
            <div class="imagetitle">{{ im.name }}</div>
        </div>
    </div>`
}

let component2 = {
    template: `<div class="title">
        <v-btn color="info" dark larg v-on:click="showimage('/images/Ratchada18/Excel_Final_KV.jpg', 'c1')">Show image</v-btn>
        <v-btn color="error" dark larg v-on:click="showimage('/images/Ratchada18/HERO_SHOT_FINAL.png', 'c1')">Outlook View</v-btn>
        <v-btn color="warning" dark larg v-on:click="showimage('/images/Ratchada18/POOL_SUNKEN_FINAL.png', 'c1')">Pool Sunken</v-btn>
        </div>`,
    methods: {
        showimage: showimage
    }
};
let component3 = {
    template: `<div class="title">Calendar</div>`
};

let component4 = {
    template:  `<v-expansion-panel popout dark expand>
        <v-expansion-panel-content>
            <div slot="header" class="title"><v-icon dark left>fas fa-video</v-icon> Videos</div>
            <div class="wrapper">
                <div class="box" v-for="im in images" v-if="im.group=='video' || im.group=='map'">
                    <v-avatar size="100px" v-on:click="setimage(im.key, 'c1', im.projectcode)" v-ripple>                
                        <img :src="im.thumbnail" :alt="im.name" />
                    </v-avatar><br />
                    <div class="imagetitle">{{ im.name }}</div>
                </div>
            </div>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
            <div slot="header" class="title"><v-icon dark left>fas fa-building</v-icon> Exteriors</div>
            <div class="wrapper">
                <div class="box" v-for="im in images" v-if="im.group=='exterior'">
                    <v-avatar size="100px" v-on:click="setimage(im.key, 'c1', im.projectcode)" v-ripple>                
                        <img :src="im.thumbnail" :alt="im.name" />
                    </v-avatar><br />
                    <div class="imagetitle">{{ im.name }}</div>
                </div>
            </div>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
            <div slot="header" class="title"><v-icon dark left>fas fa-cube</v-icon> Interiors</div>
            <div class="wrapper">
                <div class="box" v-for="im in images" v-if="im.group=='interior'">
                    <v-avatar size="100px" v-on:click="setimage(im.key, 'c1', im.projectcode)" v-ripple>                
                        <img :src="im.thumbnail" :alt="im.name" />
                    </v-avatar><br />
                    <div class="imagetitle">{{ im.name }}</div>
                </div>
            </div>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
            <div slot="header" class="title"><v-icon dark left>fas fa-cube</v-icon> Floor Plans</div>
            <div class="wrapper">
                <div class="box" v-for="im in images" v-if="im.group=='floorplan'">
                    <v-avatar size="100px" v-on:click="setimage(im.key, 'c1', im.projectcode)" v-ripple>                
                        <img :src="im.thumbnail" :alt="im.name" />
                    </v-avatar><br />
                    <div class="imagetitle">{{ im.name }}</div>
                </div>
            </div>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
            <div slot="header" class="title"><v-icon dark left>fas fa-th-large</v-icon> Room Types</div>
            <div class="wrapper">
                <div class="box" v-for="im in images" v-if="im.group=='roomtype'">
                    <v-avatar size="100px" v-on:click="setimage(im.key, 'c1', im.projectcode)" v-ripple>                
                        <img :src="im.thumbnail" :alt="im.name" />
                    </v-avatar><br />
                    <div class="imagetitle">{{ im.name }}</div>
                </div>
            </div>
        </v-expansion-panel-content>
    </v-expansion-panel>`,
  methods: {
      showimage: showimage,
      start() {
        this.isRunning = true;
        this.time = timeout;
        console.log("timer :" + this.timer);
        if (!this.timer) {
            console.log("No timer.");
            
            this.timer = setInterval(() => {
                console.log("setting timer: " + this.timer);
            if (this.time > 0) {
                this.time--;
            }
            else {
                this.reset();
            }
          }, 1000);
        }
        else {
            console.log("Already got the timer");
            this.stop();
            this.timer = setInterval(() => {
                console.log("setting timer: " + this.timer);

                if (this.time > 0) {
                    console.log("Counting: " + this.time);
                    this.time--;
                }
                else {
                    console.log("No more!!!!");
                    this.reset();                
                }
            }, 1000);
        }
      },
      stop() {
          console.log("Stopping..");
          this.isRunning = false;
          clearInterval(this.timer);
          this.timer = null;
      },
      reset() {
          console.log("Resetting...");
          this.stop();
          this.time = timeout;
          console.log("Emitting default: " + timeout);
          socket.emit('set image', {value: contents.RHK[0].key, controller: 'c1', project: 'RHK'});
      },
      setimage: function(imagekey, source, project) {
        socket.emit('set image', {
            value: imagekey, 
            controller: source, 
            project: project
        });

        if (group !== 'video') {
            this.start();
        }
      }      
  },
  data: function() {
      return {
          images: contents.RHK
      }
  }
};

let router = new VueRouter({
    routes: [{
        path: "/page1",
        name: "The Excel Ratchada 18",
        component: component1
    },
    {
        path: "/page2",
        name: "The Excel Hideaway Ratchada-Huaykwang",
        component: component4
    },
    { 
        path: "*", 
        redirect: "/page2" 
    }]
});

new Vue({
    el: "#app",
    router,
    data: {
        pages: {},
        referrers: {},
        activeUsers: 0,
        icons: ["dashboard", "home", "event"],
        name: 'c1',
        images: contents.Ratchada18,
        isRunning: false,
        time: timeout,
        timer: null
    },
    methods: {
        
    },
    created: function() {
        socket.on('updated-stats', function(data) {
		    this.pages = data.pages;
		    this.referrers = data.referrers;
		    this.activeUsers = data.activeUsers;
        }.bind(this));

        socket.on('change-image', (data) => {
            console.log("Image changes!!!!");
        });
    },
    computed: {
        projectname: function() {
            console.log(this.$route.name)
            return this.$route.name;
        }
    }
});