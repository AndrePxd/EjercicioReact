// PASO 1: IMPORTACIONES
import React, { Component } from "react"; // Importa React y la clase Component para crear un componente de clase.
import "./estilos/App.css"; // Importa los estilos del proyecto
import empleadosData from "./datos/empleados.json"; // Importa los datos de empleados desde un archivo JSON.
import CmpEmpleados from "./componentes/CmpEmpleados"; // Importa el componente que mostrará la lista de empleados.


// PASO 2: CREAR LA CLASE PRINCIPAL
class App extends Component {
  // PASO 3: DEFINIR EL CONSTRUCTOR Y EL STATE
  constructor(props) {
    super(props);
    this.state = {
      empleados: empleadosData, // Lista de empleados desde el JSON
      filtro: "todos", // Estado inicial del filtro
    };
  }

  // PASO 4: CREAR LA FUNCIÓN CAMBIAR ESTADO EMPLEADO
  cambiarEstadoEmpleado = (id) => {
    this.setState((prevState) => ({
      empleados: prevState.empleados.map((empleado) =>
        empleado.id === id ? { ...empleado, activo: !empleado.activo } : empleado
      ),
    }));
  };

  // PASO 5: CREAR LA FUNCIÓN CAMBIAR FILTRO
  cambiarFiltro = (event) => {
    this.setState({ filtro: event.target.value });
  };

  // PASO 6 y 7: FILTRAR EMPLEADOS Y RENDERIZAR INTERFAZ
  render() {
    const empleadosFiltrados = this.state.empleados.filter((empleado) => {
      if (this.state.filtro === "activos") return empleado.activo;
      if (this.state.filtro === "inactivos") return !empleado.activo;
      return true; // "todos" muestra todos
    });

    return (
      <div className="container">
        <h1>Gestor de Empleados</h1>

        {/* PASO 8: FILTRO DE EMPLEADOS */}
        <label>Filtrar por estado: </label>
        <select onChange={this.cambiarFiltro} value={this.state.filtro}>
          <option value="todos">Todos</option>
          <option value="activos">Activos</option>
          <option value="inactivos">Inactivos</option>
        </select>

        {/* PASO 9: MOSTRAR EMPLEADOS FILTRADOS */}
        <CmpEmpleados
          empleados={empleadosFiltrados}
          cambiarEstado={this.cambiarEstadoEmpleado}
        />
      </div>
    );
  }
}

// PASO 10: EXPORTAR EL COMPONENTE
export default App;
