import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Principal(){
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    // prefer localStorage data to display immediately after login/register
    try{
      const raw = localStorage.getItem('userData')
      if(raw){
        setUserData(JSON.parse(raw))
        return
      }
    }catch(e){}

    const unsub = onAuthStateChanged(auth, async user => {
      if(!user){
        navigate('/login')
        return
      }
      const uid = user.uid
      const docRef = doc(db, 'EmailSenha', uid)
      const snap = await getDoc(docRef)
      if(snap.exists()) setUserData(snap.data())
      else setUserData(null)
    })
    return () => unsub()
  }, [])

  if(!userData) return <div style={{padding:20}}><p>Carregando dados do usuário...</p></div>

  return (
    <div style={{padding:20}}>
      <h2>Página Principal</h2>
      <p>Nome: {userData.nome}</p>
      <p>Sobrenome: {userData.sobrenome}</p>
      <p>Data de nascimento: {userData.nascimento}</p>
    </div>
  )
}
