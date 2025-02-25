import React from 'react';
import { HeroSection } from '../components/home.components/HeroSection.component';
import { FeatureCard } from '../components/home.components/FeatureCard.component';

const FEATURES = [
  {
    title: "24/7 Availability",
    description: "Get answers to your questions anytime, anywhere. Our chatbot is always ready to help.",
    icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
  },
  {
    title: "Instant Responses",
    description: "No more waiting. Get immediate answers to your queries about UEH.",
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
  },
  {
    title: "Smart Learning",
    description: "Our AI continuously learns to provide better and more accurate responses.",
    icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
  }
];

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <HeroSection />
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {FEATURES.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default Home; 