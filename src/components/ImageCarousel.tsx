import { useEffect, useState } from 'react';

const carouselImages = [
  '/Restaurant_images/image1.jpeg',
  '/Restaurant_images/image2.jpeg',
  '/Restaurant_images/image3.jpeg',
  '/Restaurant_images/image4.jpeg',
  '/Restaurant_images/image5.jpeg',
  '/Restaurant_images/image6.jpeg',
  '/Restaurant_images/image7.jpeg',
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
        setNextIndex((prev) => (prev + 1) % carouselImages.length);
        setIsTransitioning(false);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${carouselImages[currentIndex]})`,
          opacity: isTransitioning ? 0 : 1,
        }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${carouselImages[nextIndex]})`,
          opacity: isTransitioning ? 1 : 0,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A2540]/70 via-[#0A2540]/60 to-[#0A2540]/80" />
    </div>
  );
}
