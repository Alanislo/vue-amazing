const {createApp} = Vue 
const options = {
    data(){
        return{
            eventos:[],
            event:[],
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")// hago una peticion y esto me devuelve una promesa
        .then(response => response.json())
        .then(datos => {
            this.eventos = datos.events
            const queryString = location.search;
            const params = new URLSearchParams(queryString);
            const id = params.get('id');
            this.event = this.eventos.find(event => event._id == id)
        }
        )
        .catch(error => console.log(error))
    }
}
const app = createApp(options)
app.mount('#app')
