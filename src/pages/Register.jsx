import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [form, setForm] = useState({email:'', password:'', nome:'', sobrenome:'', nascimento:''})
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value})

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try{
      const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password)
      const uid = userCred.user.uid
      const userData = {
        uid,
        email: form.email,
        nome: form.nome,
        sobrenome: form.sobrenome,
        nascimento: form.nascimento
      }
      // write to Firestore using EmailSenha collection
      await setDoc(doc(db, 'EmailSenha', uid), userData)
      // store locally to show immediately on Principal
      try{ localStorage.setItem('userData', JSON.stringify(userData)) }catch(e){}
      navigate('/principal')
    }catch(err){
      console.error('Register error', err)
      
      if(err.code === 'auth/operation-not-allowed'){
        setError(`❌ Provedor Email/Senha não está habilitado no Firebase.

📋 Para corrigir:
1. Acesse: https://console.firebase.google.com/project/tecdevweb-15945/authentication/providers
2. Clique em "Email/Password"
3. Ative o primeiro toggle "Email/Password"
4. Clique "Save"
5. Volte aqui e tente cadastrar novamente

Código do erro: ${err.code}`)
      } else {
        // surface error code and message to help diagnose other configuration issues
        setError(`${err.code || 'error'}: ${err.message || err.toString()}. ` +
          'Verifique no Firebase Console se o provedor Email/Senha está habilitado e se os domínios autorizados estão configurados.')
      }
    }
  }

  return (
    <div style={{padding:20}}>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit} style={{display:'grid', gap:8, maxWidth:400}}>
        <input name="email" placeholder="E-mail" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Senha" value={form.password} onChange={handleChange} required />
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
        <input name="sobrenome" placeholder="Sobrenome" value={form.sobrenome} onChange={handleChange} required />
        <input name="nascimento" type="date" placeholder="Data de Nascimento" value={form.nascimento} onChange={handleChange} required />
        <button type="submit">Cadastrar</button>
      </form>
      {error && <div style={{color:'red', backgroundColor:'#ffe6e6', padding:10, borderRadius:4, whiteSpace:'pre-line', fontFamily:'monospace', fontSize:12, marginTop:10}}>{error}</div>}
    </div>
  )
}
