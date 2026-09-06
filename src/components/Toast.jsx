import { createContext, useContext, useCallback, useRef, useState } from 'react';

const ToastCtx = createContext(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const toast = useCallback(msg => {
    const id = ++idRef.current;
    setToasts(t => [...t, { id, msg, leaving: false }]);
    setTimeout(() => {
      setToasts(t => t.map(x => (x.id === id ? { ...x, leaving: true } : x)));
      setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 400);
    }, 4200);
  }, []);

  return (
    <ToastCtx.Provider value={toast}>
      {children}
      <div className="toasts" role="status" aria-live="polite">
        {toasts.map(t => (
          <div className="toast" key={t.id} style={t.leaving ? { opacity: 0, transition: 'opacity .4s' } : undefined}>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}