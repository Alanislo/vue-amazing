const {createApp} = Vue 
const options = {
    data(){
        return{
            eventos:[],
            categories:[],
            valueSearch:"",
            categoriesCheck:[],// value de los inputs que estan checked
            filtered:[],
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")// hago una peticion y esto me devuelve una promesa
        .then(response => response.json())
        .then(datos => {
            this.eventos = datos.events.filter(event => event.date <= datos.currentDate)

            this.filtered = [...this.eventos]
            this.categories = [ ...new Set (this.eventos.map(event  => event.category))]
        }
        )
        .catch(error => console.log(error))
    }, 
   methods:{
        crossFilter(){
            let filterSearch = this.eventos.filter( event => event.name.toLowerCase().includes(this.valueSearch.toLowerCase().trim()))
            if( this.categoriesCheck.length === 0 ){
                this.filtered = filterSearch
            }else{
                let filterCheck = filterSearch.filter( event => this.categoriesCheck.includes( event.category ))
                this.filtered = filterCheck 
        } 
    }
    }
}
const app = createApp(options)
app.mount('#app')
