import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { objectives } from "@/data/events";
import { motion, AnimatePresence } from "framer-motion";

import slideAyuda from "@/assets/slide-ayuda-humanitaria.jpg";
import slideReconstruccion from "@/assets/slide-reconstruccion.jpg";
import slideEducacion from "@/assets/slide-educacion.jpg";

const slideImages = [slideAyuda, slideReconstruccion, slideEducacion];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const next = useCallback(() => setCurrent((p) => (p + 1) % objectives.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + objectives.length) % objectives.length), []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const handleExplore = (category: string) => {
    navigate(`/eventos?categoria=${category}`);
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img
            src={slideImages[current]}
            alt={objectives[current].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-end pb-20 md:pb-28">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-4 leading-tight">
                {objectives[current].title}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 font-body">
                {objectives[current].description}
              </p>
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 py-6 rounded-xl shadow-lg"
                onClick={() => handleExplore(objectives[current].category)}
              >
                Explorar Causas
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {objectives.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current ? "w-10 bg-accent" : "w-2.5 bg-primary-foreground/50"
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/20 backdrop-blur-sm text-primary-foreground hover:bg-card/40 transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/20 backdrop-blur-sm text-primary-foreground hover:bg-card/40 transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

export default HeroCarousel;
