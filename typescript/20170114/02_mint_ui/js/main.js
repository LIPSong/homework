(function(){
	class App  {
        constructor(mark){
        		var router = new VueRouter({
        			routes:[
        			{path:'/',component:ucai.home},
        			{path:'/order',component:ucai.order},
        			{path:'/find',component:ucai.find},
        			{path:'/setting',component:ucai.setting},
        			]
        		});
  			let config = {
  				el:mark,
  				router:router,
  				data:{
  					selected:'外卖'
  				},
  				router:router
  			};
  			this.vue = new Vue(config);
        }
	}
	new App('#app')
})()