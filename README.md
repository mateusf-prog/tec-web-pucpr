# React Firebase Auth App

Instruções rápidas:

1. Substitua os valores em `src/firebaseConfig.js` pelo seu projeto Firebase.
2. Instale dependências: `npm install`
3. Rode em dev: `npm run dev`
4. Build: `npm run build`
5. Para hospedar: usar Vercel, Netlify ou Firebase Hosting (documentação a seguir).

Observações: o projeto usa React + Vite e Firestore + Firebase Authentication (email/senha).

Deploy rápido

Vercel
- Crie uma conta em vercel.com e conecte o repositório. Vercel detecta Vite automaticamente.
- Defina as variáveis de ambiente do Firebase (opcional) ou inclua `src/firebaseConfig.js` com valores.

Firebase Hosting
- Instale o Firebase CLI: `npm install -g firebase-tools`
- Faça login: `firebase login`
- Inicialize o projeto: `firebase init hosting` (selecione o diretório `dist` como public)
- Faça o deploy: `npm run build` e `firebase deploy --only hosting`

Observação sobre credenciais
- Não comite chaves sensíveis em repositórios públicos. Prefira definir variáveis de ambiente no serviço de hospedagem ou usar o arquivo `src/firebaseConfig.js` localmente apenas para testes.

Próximos passos / melhorias
- Adicionar proteção de rotas (PrivateRoute) para a página Principal.
- Adicionar reset de senha e logout.

