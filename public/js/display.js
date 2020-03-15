'use strict';

var socket = io('/displayers');

// var vm = new Vue({
//     el: "#app",
//     data: {
//         pages: {},
//         referrers: {},
//         activeUsers: 0,
//         icons: ["dashboard", "home", "event"],
//         imagepath: contents.ER18.logo,
//         name : 'd1'
//     },
//     mounted: function() {
//         socket.on('change image', (data) => {
//             //alert(JSON.stringify("mounted " + data));
//             console.log("Mounted: " + JSON.stringify(data));
//             this.imagepath = data.value;
//         });
//     }
// });

var allimages = contents.Ratchada18;
allimages.push(...contents.RHK);

var v2 = new Vue({
    el: '#slide',
    data: {
      //images: ['http://i.imgur.com/vYdoAKu.jpg', 'http://i.imgur.com/PUD9HQL.jpg', 'http://i.imgur.com/Lfv18Sb.jpg', 'http://i.imgur.com/tmVJtna.jpg', 'http://i.imgur.com/ZfFAkWZ.jpg'],
      images: allimages,
      currentNumber: 0,
      timer: null,
      imageurl: contents.ER18.logo.url,
      imageprefix: contents.sourcefolder
    },
  
    mounted: function() {
      this.stopRotation();
    },
  
    methods: {
      startRotation: function() {
        this.timer = setInterval(this.next, 3000);
      },
  
      stopRotation: function() {
        clearTimeout(this.timer);
        this.timer = null;
      },
  
      next: function() {
        this.currentNumber += 1
      },
      prev: function() {
        this.currentNumber -= 1
      },
      idx: function(c) {
        this.currentNumber = c;
      },
      setimage: function(url) {
          this.imageurl = url;
      },
      getIndex: function(k){
          console.log(this.images.length);
          console.log(JSON.stringify(k));
          this.currentNumber = this.images.findIndex(x => x.projectcode == k.project && x.key==k.value);
          console.log("getindex: " + this.currentNumber);
      }
    },  
    computed: {
      currentImage: function() {
        //return this.images[Math.abs(this.currentNumber) % this.images.length];
        //return this.imageurl;
        //alert(this.currentNumber + ", " + this.images.length + ", " + JSON.stringify(this.images[this.currentNumber]));
        let item = this.images[Math.abs(this.currentNumber) % this.images.length];
        let url = "";
        if (item.group === 'video') {
          url = this.imageprefix + item.url;
        }

        url = item.group === 'video' ? this.imageprefix + item.url : item.url;

        return url;
      },
      currentTitle: function() {
        return this.images[Math.abs(this.currentNumber) % this.images.length].name;
      },
      currentGroup: function() {
          //var group = this.images[Math.abs(this.currentNumber) % this.images.length].group

          return this.images[Math.abs(this.currentNumber) % this.images.length].group;
      }
    },

    mounted: function() {
        socket.on('set image', (data) => {
            //alert(JSON.stringify("mounted " + data));
            console.log("Mounted: " + JSON.stringify(data));
            //this.getIndex(data.value);
            this.getIndex(data);
        });
    }
  });