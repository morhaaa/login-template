# Project README - ENG

## Project Overview

This project serves as a template for managing user login and registration at the frontend level. It is built using Next.js 14 and utilizes Axios for HTTP requests. The web application is structured as follows:

1. **Home Page**: Handles user registration or login.
2. **Public Page (/public)**: Accessible to anyone.
3. **Private Page (/private)**: Accessible only to a successfully logged-in user.

User state management after successful login is handled using the `useContext` hook.

For navigation security, both middleware and redirects are employed in the private page.

## Project Structure

- **pages**

  - **page.tsx**: Main home page for user registration or login.
  - **public.tsx**: Public page accessible to anyone.
  - **private.tsx**: Private page accessible only to logged-in users.

- **/components**

  - **register.tsx**: Component for user registration.
  - **login.tsx**: Component for user login.

- **/hooks**
  - **useAuth.ts**: Hook for synchronizing user data with the Context API.
  - **useRefreshToken.ts**: Hook for updating the accessToken when necessary.
  - **useAxiosPrivate.ts**: Hook used as an interceptor for HTTP calls, adding the required accessToken.

## How to Use

2. **Install dependencies**: `npm install`
3. **Run the development server**: `npm run dev`

## Usage

1. Visit the main home page (`/`).
2. Register or log in.
3. Access the public page (`/public`) available to anyone.
4. Access the private page (`/private`) only after successfully logging in.

## Hooks Used

1. **useAuth**

   - _Description_: Synchronizes user data with the Context API.
   - _Location_: `/hooks/useAuth.ts`

2. **useRefreshToken**

   - _Description_: Updates the accessToken when necessary.
   - _Location_: `/hooks/useRefreshToken.ts`

3. **useAxiosPrivate**
   - _Description_: Hook used as an interceptor for HTTP calls, adding the required accessToken.
   - _Location_: `/hooks/useAxiosPrivate.ts`

## Security Measures

- **Middleware**: Employed for enhancing security during navigation.
- **Redirects**: Utilized in the private page to control access.

## Dependencies

- **Next.js 14**: A React framework for building server-rendered applications.
- **Axios**: A promise-based HTTP client for the browser and Node.js.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

# README del Progetto

## Panoramica del Progetto

Questo progetto funge da template per gestire la registrazione e il login degli utenti a livello di frontend. È realizzato utilizzando Next.js 14 e sfrutta Axios per le richieste HTTP. L'applicazione web è strutturata nel seguente modo:

1. **Pagina Principale**: Gestisce la registrazione o il login dell'utente.
2. **Pagina Pubblica (/public)**: Accessibile a chiunque.
3. **Pagina Privata (/private)**: Accessibile solo a un utente che ha effettuato l'accesso con successo.

La gestione dello stato dell'utente dopo un accesso riuscito è gestita utilizzando il hook `useContext`.

Per la sicurezza nella navigazione, sono utilizzati sia middleware che reindirizzamenti nella pagina privata.

## Struttura del Progetto

- **/pages**

  - **index.tsx**: Pagina principale per la registrazione o il login dell'utente.
  - **public.tsx**: Pagina pubblica accessibile a chiunque.
  - **private.tsx**: Pagina privata accessibile solo agli utenti autenticati.

- **/components**

  - **register.tsx**: Componente per la registrazione dell'utente.
  - **login.tsx**: Componente per il login dell'utente.

- **/hooks**
  - **useAuth.ts**: Hook per sincronizzare i dati dell'utente con il Context API.
  - **useRefreshToken.ts**: Hook per aggiornare l'accessToken quando necessario.
  - **useAxiosPrivate.ts**: Hook utilizzato come interceptor per le chiamate HTTP, aggiungendo l'accessToken necessario.

## Come Utilizzare

1. **Clonare il repository**: `git clone https://github.com/your/repository.git`
2. **Installare le dipendenze**: `npm install`
3. **Eseguire il server di sviluppo**: `npm run dev`

## Utilizzo

1. Visitare la pagina principale (`/`).
2. Registrarsi o effettuare il login.
3. Accedere alla pagina pubblica (`/public`) disponibile per chiunque.
4. Accedere alla pagina privata (`/private`) solo dopo aver effettuato l'accesso con successo.

## Hook Utilizzati

1. **useAuth**

   - _Descrizione_: Sincronizza i dati dell'utente con il Context API.
   - _Posizione_: `/hooks/useAuth.ts`

2. **useRefreshToken**

   - _Descrizione_: Aggiorna l'accessToken quando necessario.
   - _Posizione_: `/hooks/useRefreshToken.ts`

3. **useAxiosPrivate**
   - _Descrizione_: Hook utilizzato come interceptor per le chiamate HTTP, aggiungendo l'accessToken necessario.
   - _Posizione_: `/hooks/useAxiosPrivate.ts`

## Misure di Sicurezza

- **Middleware**: Utilizzato per migliorare la sicurezza durante la navigazione.
- **Reindirizzamenti**: Utilizzati nella pagina privata per controllare l'accesso.

## Dipendenze

- **Next.js 14**: Un framework React per la costruzione di applicazioni server-rendered.
- **Axios**: Un client HTTP basato su promesse per il browser e Node.js.

## Contributi

Sentiti libero di contribuire a questo progetto inviando problemi o richieste di pull.

## Licenza

Questo progetto è concesso in licenza con la [Licenza MIT](LICENSE).
