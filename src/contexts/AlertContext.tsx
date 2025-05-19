import { createContext, type ReactNode, useContext, useState } from 'react';

type AlertType = 'success' | 'error' | 'info';

interface Alert {
  type: AlertType;
  message: string;
}

interface AlertContextProps {
  alert: Alert | null;
  showAlert: (type: AlertType, message: string) => void;
  clearAlert: () => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<Alert | null>(null);

  const showAlert = (type: AlertType, message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };
  const clearAlert = () => setAlert(null);

  return (
    <AlertContext.Provider value={{ alert, showAlert, clearAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within AlertProvider');
  return context;
}
