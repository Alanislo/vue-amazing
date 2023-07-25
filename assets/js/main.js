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
            this.eventos = datos.events
            this.filtered = datos.events
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


   // filtrar(){// pase el nombre de los eventos a minuscula, me fijo si empieza con lo que sea que este en el input pasado a minuscula
        //     // y necesito que en el array de categoriesChecked que este incluida la categoria del evento
        //     this.filtered = this.eventos.filter( evento => {
        //         return evento.name.toLowerCase().startsWith(this.valueSearch.toLowerCase()) // que coincida con el nombre, que la categoria este incluida en categoriasCheck
        //         && (this.categoriesCheck.includes(evento.category) || this.categoriesCheck.length == 0) // o si no hay ninguna categoria seleccionada muestra todas 
        //     }  )
        //     console.log(filtered);
        // },