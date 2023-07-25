const { createApp } = Vue
const options = {
    data() {
        return {
            eventos: [],
            nombre: "",
            capacidad: Number,
            porcentaje1: null,
            porcentaje2: null,
            eventoMenor: "",
            eventoMayor: "",
            categoriaPasado: [],
            asistenciaPromedio: Number,
            revenuesPasado: Number,
            auxPast: null,
            auxUp: null,

        }
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/amazing")// hago una peticion y esto me devuelve una promesa
            .then(response => response.json())
            .then(datos => {
                this.eventos = datos.events
                date = datos.currentDate

                const arrayOrdenado = Array.from(this.eventos).sort(function (a, b) {
                    return b.capacity - a.capacity
                })


                this.nombre = arrayOrdenado[0].name
                this.capacidad = arrayOrdenado[0].capacity

                let eventosUpcom = this.eventos.filter(evento => evento.date >= date)
                console.log(eventosUpcom)
                let eventosPasados = this.eventos.filter(evento => evento.date < date)
                console.log(eventosPasados);

                eventosPasados.sort((a, b) => calcularPorcentajeAlto(a.assistance, a.capacity) - calcularPorcentajeAlto(b.assistance, b.capacity))
                this.eventoMenor = eventosPasados[0];
                this.eventoMayor = eventosPasados[eventosPasados.length - 1];
                this.porcentaje1 = calcularPorcentajeAlto(this.eventoMayor.assistance, this.eventoMayor.capacity).toFixed(2)
                this.porcentaje2 = calcularPorcentajeAlto(this.eventoMenor.assistance, this.eventoMenor.capacity)


                let categoriaPass = eventosPasados.map(evento => evento.category)
                let arrayPass = Array.from(new Set(categoriaPass))
                console.log(arrayPass);

                this.auxPast = arrayPass.map((categoria) => {
                    const objectPast = {
                        category: categoria // me trae todas las categorias 
                    }
                    const categoriaPasadaEventos = eventosPasados.filter(cat => cat.category == categoria) // se le pone 0 para que no traiga el objeto completo
                    const revenues = categoriaPasadaEventos.reduce((acc, act) => acc + (act.price * act.assistance), 0) // trae todos los eventos por cada categoria, es decir por cada food me trae 3 eventos, me trae el mas alto 
                    objectPast.revenues = revenues.toFixed(2)
                    const assistancePorcentaje = categoriaPasadaEventos.reduce((acc, act) => acc + (act.assistance / (act.capacity / 100)), 0) / categoriaPasadaEventos.length
                    objectPast.assistancePorcentaje = assistancePorcentaje.toFixed(2)
                    return objectPast
                })


                let categoriaFuturo = eventosUpcom.map(evento => evento.category)
                let arrayUpcom = Array.from(new Set(categoriaFuturo))
                console.log(arrayUpcom);

                this.auxUp = arrayUpcom.map((categoria) => {
                    const objectUpcom = {
                        category: categoria // me trae todas las categorias 
                    }
                    const categoriaEventosFuturos = eventosUpcom.filter(cat => cat.category == categoria) // se le pone 0 para que no traiga el objeto completo
                    const revenues = categoriaEventosFuturos.reduce((acc, act) => acc + (act.price * act.estimate), 0) // trae todos los eventos por cada categoria, es decir por cada food me trae 3 eventos, me trae el mas alto 
                    objectUpcom.revenues = revenues.toFixed(2)
                    const assistancePorcentaje = categoriaEventosFuturos.reduce((acc, act) => acc + (act.estimate / (act.capacity / 100)), 0) / categoriaEventosFuturos.length
                    objectUpcom.assistancePorcentaje = assistancePorcentaje.toFixed(2)
                    return objectUpcom
                })

                function calcularPorcentajeAlto(assistance, capacidad) {
                    let porcentaje = (assistance / capacidad) * 100
                    return porcentaje
                }
            }
            )
            .catch(error => console.log(error))
    },

}
const app = createApp(options)
app.mount('#app')

