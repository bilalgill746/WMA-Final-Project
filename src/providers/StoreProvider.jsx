"use client";
import { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { makeStore, persistor } from "@/redux/store";
export default function StoreProvider({ children }) {
  const storeRef = useRef();
  const persistorRef = useRef();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    persistorRef.current = persistor(storeRef.current);
  }

  if (!isClient) {
    return <Provider store={storeRef.current}>{children}</Provider>;
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  );
}
