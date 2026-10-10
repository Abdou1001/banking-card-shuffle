import React from 'react';
import {
  ArrowLeftRight,
  Receipt,
  ArrowDownToLine,
  ArrowUpFromLine,
  UserCheck,
  Send,
  Globe,
  Repeat,
  Zap,
  Droplets,
  Smartphone,
  Banknote,
  FileCheck,
  Sparkles,
  Wallet,
  CreditCard,
  AlertCircle,
  Eye,
  FileText,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Play,
  Pause,
  XCircle,
  HelpCircle,
  Layers,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react-native';
import { COLORS } from '@/constants/colors';

const ICON_MAP: Record<string, any> = {
  ArrowLeftRight,
  Receipt,
  ArrowDownToLine,
  ArrowUpFromLine,
  UserCheck,
  Send,
  Globe,
  Repeat,
  Zap,
  Droplets,
  Smartphone,
  Banknote,
  FileCheck,
  Sparkles,
  Wallet,
  CreditCard,
  AlertCircle,
  Eye,
  FileText,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Play,
  Pause,
  XCircle,
  HelpCircle,
  Layers,
  ChevronRight,
  ChevronLeft,
};

interface ServiceIconProps {
  name?: string;
  size?: number;
  color?: string;
}

export function ServiceIcon({
  name,
  size = 28,
  color = COLORS.primaryBlue,
}: ServiceIconProps) {
  if (!name) {
    return <Layers size={size} color={color} />;
  }

  const Component = ICON_MAP[name] || Layers;
  return <Component size={size} color={color} />;
}
