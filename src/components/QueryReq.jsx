import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useFirestore } from '../hooks/useFirestore'
import CreateReq from './CreateReq'

const QueryReq = () => {
  const { data, error, loading, deleteData, updateData } = useFirestore()
  const [editing, setEditing] = useState(false);
  const [ite, setIte] = useState([])
  const navigate = useNavigate()
  if (loading) return <p>Loading data...</p>
  if (error) return <p>{error}</p>

  const handleClickDelete = async (id) => {
    await deleteData(id)
  }

  const handleClickEdit = async (item) => {
    // console.log("id:", item.id)
    setEditing(true)
    setIte(item)
  }

  return (
    <div>
      <br />
      {
        editing ? (<CreateReq saving={editing} item={ite} edi={setEditing}/>) : false

      }
      <br />
      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th>Main category</th>
            <th>Type service</th>
            <th>Location inside</th>
            <th>Description</th>
            <th>Date</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(item => (
              <tr key={item.id}>
                <td>{item.category}</td>
                <td>{item.typeService}</td>
                <td>{item.location}</td>
                <td>{item.description}</td>
                <td>{item.date}</td>
                <td>{editing ? (false) : (<button className="btn btn-dark"
                  onClick={() => handleClickEdit(item)}>Edit</button>)}
                  <button className="btn btn-dark mx-2"
                    onClick={() => handleClickDelete(item.id)}>Delete</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default QueryReq