import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Service } from '@/types/service';
import { services } from '@/data/services';

interface ServiceContextValue {
  services: Service[];
  selectedService: Service | null;
  setSelectedService: (service: Service | null) => void;
  // Backwards compatibility with existing timer/success screens:
  selectedMainService: any | null;
  selectedSubService: any | null;
  setSelectedMainService: (service: any | null) => void;
  setSelectedSubService: (subService: any | null) => void;
  elapsedTime: number | null;
  setElapsedTime: (time: number | null) => void;
  resetAll: () => void;
}

const ServiceContext = createContext<ServiceContextValue | undefined>(undefined);

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);

  const resetAll = () => {
    setSelectedService(null);
    setElapsedTime(null);
  };

  const value: ServiceContextValue = {
    services,
    selectedService,
    setSelectedService,
    // Backwards compatibility: Map selectedService to main & sub service
    selectedMainService: selectedService
      ? { ...selectedService, subServices: [selectedService] }
      : null,
    selectedSubService: selectedService,
    setSelectedMainService: (srv) => setSelectedService(srv as Service),
    setSelectedSubService: (sub) => setSelectedService(sub as Service),
    elapsedTime,
    setElapsedTime,
    resetAll,
  };

  return (
    <ServiceContext.Provider value={value}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useServiceContext(): ServiceContextValue {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServiceContext must be used within a ServiceProvider');
  }
  return context;
}
