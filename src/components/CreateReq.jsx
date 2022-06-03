import React, { useState } from 'react'
import { useFirestore } from '../hooks/useFirestore';

const CreateReq = (props) => {

  const { addRequest, updateData } = useFirestore();
  const [category, setCategory] = useState("Mantenimiento inmuebles");
  const [typeService, setTypeService] = useState("Baños");
  const [description, setDescription] = useState("");
  const [location, setLocationInside] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);

  const changeCategory = (e) => {
    // const { value } = e.target;
    // setCategory(value)
    // console.log("look: ", value)

    const { options, selectedIndex } = e.target;
    const change = options[selectedIndex].innerHTML;
    setCategory(change)
    // console.log(change);
  }

  const changeTypeService = (e) => {
    if (category === "Mantenimiento inmuebles") {
      const { options, selectedIndex } = e.target;
      const change = options[selectedIndex].innerHTML;
      setTypeService(change)
      // console.log(change);
    } else {
      if (category === "Mantenimiento muebles") {
        const { options, selectedIndex } = e.target;
        const change = options[selectedIndex].innerHTML;
        setTypeService(change)
        // console.log(change);
      } else {
        const { options, selectedIndex } = e.target;
        const change = options[selectedIndex].innerHTML;
        setTypeService(change)
        // console.log(change);
      }
    }
  }

  const saveRequest = async (e) => {
    e.preventDefault()
    console.log("Saving data")
    if (!description.trim()) {
      setError('Ingrese la descripción')
      console.log(error)
      return
    }
    if (!location.trim()) {
      setError('Ingrese la ubicación')
      console.log(error)
      return
    }
    // console.log(props.saving)
    // console.log(props.item.id)
    // console.log("datos nuevos a guardar: ", category, typeService,description, location, date)
    if (props.saving) {
      await updateData(props.item.id, category, typeService, description, location, date)
      if (props.edi) {
        console.log("::", props.edi(false))
      }
      return
    }


    await registerReq()
  }

  const registerReq = async (e) => {
    // console.log("adding data")
    try {
      await addRequest(category, typeService, description, location, date);
    } catch (error) {
      console.log(error)
    }
    setError(null)
    setCategory("Mantenimiento inmuebles")
    setDate("")
    setDescription("")
    setLocationInside("")
    setTypeService("Baños")
  }

  const reset = (e) => {
    if (props.edi) {
      console.log("::", props.edi(false))
    }
    // console.log("reseteando solo")
    setError(null)
    setCategory("Mantenimiento inmuebles")
    setDate("")
    setDescription("")
    setLocationInside("")
    setTypeService("Baños")
  }

  const clickEdit = (item) => {

  }


  return (
    <div className="row justify-content-center">
      <div className="col-12 col-sm-10 col-md-6 col-xl-4">

        <form onSubmit={saveRequest}>
          {
            error && (<div className="alert alert-danger">
              {error}
            </div>)
          }
          <label>Main category</label>
          <select className="form-select" aria-label="Default select example" id="main" onChange={changeCategory}>
            <option value="0" selected>Mantenimiento inmuebles</option>
            <option value="1">Mantenimiento muebles</option>
            <option value="2" >Servicios</option>
          </select>
          {
            category === "Mantenimiento inmuebles" ? (
              <div>
                <label>Type service</label>
                <select className="form-select" aria-label="Default select example" onChange={changeTypeService}>
                  <option selected value="0">Baños</option>
                  <option value="1">Cielo raso</option>
                  <option value="2">Eléctrico</option>
                  <option value="3">Pared</option>
                  <option value="4">Puerta</option>
                </select>
              </div>
            ) : (
              category === "Mantenimiento muebles" ? (
                <div>
                  <label>Type service</label>
                  <select className="form-select" aria-label="Default select example" onChange={changeTypeService}>
                    <option selected value="0">Aire acondicionado</option>
                    <option value="1">Archivador</option>
                    <option value="2">Puesto de trabajo</option>
                    <option value="3">Silla</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label>Type service</label>
                  <select className="form-select" aria-label="Default select example" onChange={changeTypeService}>
                    <option selected value="0">Aseo</option>
                    <option value="1">Transporte</option>
                    <option value="2">Vigilancia</option>
                  </select>
                </div>
              )
            )
          }
          <label>Description request</label>
          <input type="text" placeholder="Ingrese una descripción de la solicitud" value={description} className="form-control mb-3"
            onChange={e => setDescription(e.target.value)}></input>
          <label>Location inside</label>
          <input type="text" placeholder="Ubicación donde será prestado el servicio" value={location} className="form-control mb-3"
            onChange={e => setLocationInside(e.target.value)}></input>
          <label>Date</label>
          <input type="date" value={date} className="form-control mb-3" onChange={e => setDate(e.target.value)}></input>
          {
            props.saving ? (
              // <button className="btn btn-dark" type="button"
              // onClick={()=>clickEdit(props.item)}>Edit</button>
              <button className="btn btn-dark" type="submit"
                onClick={() => clickEdit(props.item)}>Edit</button>
            ) : (

              <button className="btn btn-dark" type="submit">Save</button>
            )
          }
          <button className="btn btn-dark mx-2" type="button" onClick={reset}>Cancel</button>
        </form>
      </div>
    </div>
  )
}

export default CreateReq