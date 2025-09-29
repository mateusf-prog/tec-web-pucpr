import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try{
      const cred = await signInWithEmailAndPassword(auth, email, password)
      const uid = cred.user.uid
      // read user doc from Firestore
      try{
        const { doc: _doc, getDoc } = await import('firebase/firestore')
      }catch(e){}
      // using modular imports already available
      const { doc, getDoc } = await import('firebase/firestore')
      const userSnap = await getDoc(doc(db, 'EmailSenha', uid))
      if(userSnap.exists()){
        const data = userSnap.data()
        try{ localStorage.setItem('userData', JSON.stringify(data)) }catch(e){}
      }
      navigate('/principal')
    }catch(err){
      console.error('Login error', err)
      
      if(err.code === 'auth/operation-not-allowed'){
        setError(`❌ Provedor Email/Senha não está habilitado no Firebase.

📋 Para corrigir:
1. Acesse: https://console.firebase.google.com/project/tecdevweb-15945/authentication/providers
2. Clique em "Email/Password"
3. Ative o primeiro toggle "Email/Password"
4. Clique "Save"
5. Volte aqui e tente fazer login novamente

Código do erro: ${err.code}`)
      } else if(err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential'){
        setError('❌ Usuário não cadastrado ou credenciais inválidas. Verifique email e senha.')
      } else {
        setError(`${err.code || 'error'}: ${err.message || err.toString()}. ` +
          'Verifique no Firebase Console se o provedor Email/Senha está habilitado e se os domínios autorizados estão configurados.')
      }
    }
  }

  return (
    <div style={{padding:20}}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{display:'grid', gap:8, maxWidth:400}}>
        <input placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">Acessar Principal</button>
      </form>
      {error && <div style={{color:'red', backgroundColor:'#ffe6e6', padding:10, borderRadius:4, whiteSpace:'pre-line', fontFamily:'monospace', fontSize:12, marginTop:10}}>{error}</div>}
    </div>
  )
}
