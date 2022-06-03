import { collection, getDocs, doc, addDoc, setDoc, deleteDoc, updateDoc } from "firebase/firestore/lite"
import { useEffect, useState } from "react"
import { db, auth } from "../firebase"


export const useFirestore = () => {
    const [data, setData] = useState([])
    const [dataUser, setDataUser] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        // console.log('getData')
        getData()
    }, [])

    const getData = async () => {
        try {
            setLoading(true)
            const querySnapshot = await getDocs(collection(db, "users", auth.currentUser.uid, "querys"))
            const dataDb = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            // console.log(dataDb)
            setData(dataDb)
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }
    const addUser = async (email, password) => {
        try {
            setLoading(true)
            const newDoc = {
                email: email,
                password: password,
                uid: auth.currentUser.uid
            }
            const docRef = doc(db, "users", newDoc.uid)
            await setDoc(docRef, newDoc)
            setDataUser([...dataUser, newDoc])

        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const addRequest = async (category, typeService, description, location, date) => {
        try {
            // console.log("uid ", auth.currentUser.uid)
            setLoading(true)
            const newDoc = await addDoc(collection(db, "users", auth.currentUser.uid, "querys"), {
                category: category,
                typeService: typeService,
                description: description,
                location: location,
                date: date
            });
            setData([...data, newDoc])
            // console.log(newDoc.id)

        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const deleteData = async (id) => {
        try {
            setLoading(true)
            const docRef = doc(db, "users", auth.currentUser.uid, "querys", id)
            await deleteDoc(docRef)
            setData(data.filter((item) => item.id !== id))
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const updateData = async (id, newCategory, newTypeService, newDescription, newLocation, newDate) => {

        try {
            setLoading(true)
            const docRef = doc(db, "users", auth.currentUser.uid, "querys", id)
            await updateDoc(docRef, {
                category: newCategory,
                typeService: newTypeService,
                description: newDescription,
                location: newLocation,
                date: newDate
            })
            setData(data.map((item) => item.id === id ? ({
                ...item, category: newCategory, typeService: newTypeService,
                description: newDescription,
                location: newLocation,
                date: newDate
            }) : item))
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return {
        data, error, loading, getData, addRequest, addUser, dataUser, deleteData, updateData
    }
}