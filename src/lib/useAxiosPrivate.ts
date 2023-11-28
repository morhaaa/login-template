import React, { useEffect } from "react";
import { axiosPrivate } from "./axios";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
          return config;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      (error) => {
        const prevRequest = error?.config;
        if (error?.response.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = refresh;
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
{
  /*
Gli interceptor in Axios sono funzioni che possono essere eseguite in determinati punti del ciclo di vita di una richiesta
o di una risposta HTTP. Essi consentono di intercettare e modificare le richieste o le risposte prima che vengano effettuate o restituite, rispettivamente.
Gli interceptor sono particolarmente utili per l'aggiunta di configurazioni globali, la gestione degli errori, 
la trasformazione dei dati e altre operazioni comuni in una applicazione che utilizza Axios per effettuare chiamate HTTP.



Nel contesto di Axios, il termine "eject" si riferisce alla rimozione di un interceptor. 
Gli "interceptor" in Axios sono funzioni che possono essere eseguite durante la fase di trasmissione di una richiesta o di ricezione di una risposta. 
Possono essere utilizzati per modificare la configurazione della richiesta prima che venga inviata o per gestire la risposta o gli errori ricevuti.

Questa operazione di "eject" è importante per evitare potenziali perdite di memoria o comportamenti imprevisti quando il componente React viene smontato
 o quando le sue dipendenze (auth e refresh) cambiano. 
 Rimuovendo gli interceptor, ci si assicura che non ci siano riferimenti indesiderati a funzioni o oggetti dopo che il componente è stato dismesso, 
 contribuendo a una gestione pulita delle risorse.

*/
}
