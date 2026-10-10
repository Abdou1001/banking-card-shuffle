export interface ServiceDetails {
  category?: string;
  instructions?: string;
  features?: string[];
  limitations?: string;
  fees?: string;
}

export interface Service {
  id: string;
  number: string; // e.g. "01"
  name: string;
  description: string;
  duration: number; // in seconds
  iconType: 'png' | 'svg';
  iconSource?: any;
  svgXml?: string;
  details?: ServiceDetails;
  rankSymbol?: string;
}

// Backward compatibility aliases
export type ServiceItem = Service;
export type SubService = Service;
export interface MainService extends Service {
  subServices?: Service[];
}
