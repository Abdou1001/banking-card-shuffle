import React from 'react';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { ServiceShuffle } from '@/components/services/ServiceShuffle';
import { services } from '@/data/services';
import { useServiceContext } from '@/context/ServiceContext';
import { Service } from '@/types/service';

export default function ServicesScreen() {
  const router = useRouter();
  const { setSelectedService } = useServiceContext();

  const handleStartTimer = (service: Service) => {
    setSelectedService(service);
    router.push({
      pathname: '/timer',
      params: {
        duration: String(service.duration),
        serviceId: service.id,
      },
    });
  };

  const handleBack = () => {
    router.replace('/');
  };

  return (
    <ScreenContainer>
      <AppHeader
        showBack
        onBack={handleBack}
        showLogo
      />

      <ServiceShuffle
        services={services}
        title="خدمات بن دوّل باي"
        subtitle="مرر أفقياً لتصفح البطاقات أو اضغط على الزر لاختيار خدمة عشوائياً"
        onStartTimer={handleStartTimer}
      />
    </ScreenContainer>
  );
}
