import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DonationEvent } from "@/data/events";

import imgHuracan from "@/assets/event-huracan.jpg";
import imgInundaciones from "@/assets/event-inundaciones.jpg";
import imgTerremoto from "@/assets/event-terremoto.jpg";
import imgSequia from "@/assets/event-sequia.jpg";

const imageMap: Record<string, string> = {
  huracan: imgHuracan,
  inundaciones: imgInundaciones,
  terremoto: imgTerremoto,
  sequia: imgSequia,
};

interface Props {
  events: DonationEvent[];
  onSelectEvent: (event: DonationEvent) => void;
}

const CircularGallery = ({ events, onSelectEvent }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((p) => (p + 1) % events.length);
  const prev = () => setActiveIndex((p) => (p - 1 + events.length) % events.length);

  const getPosition = (index: number) => {
    const diff = (index - activeIndex + events.length) % events.length;
    if (diff === 0) return "center";
    if (diff === 1 || (diff === events.length - 1 && events.length > 2)) return diff === 1 ? "right" : "left";
    if (diff === events.length - 1) return "left";
    if (diff === 2) return "far-right";
    if (diff === events.length - 2) return "far-left";
    return "hidden";
  };

  const positionStyles: Record<string, { x: string; scale: number; z: number; opacity: number }> = {
    center: { x: "0%", scale: 1, z: 30, opacity: 1 },
    left: { x: "-110%", scale: 0.75, z: 20, opacity: 0.7 },
    right: { x: "110%", scale: 0.75, z: 20, opacity: 0.7 },
    "far-left": { x: "-180%", scale: 0.55, z: 10, opacity: 0.4 },
    "far-right": { x: "180%", scale: 0.55, z: 10, opacity: 0.4 },
    hidden: { x: "0%", scale: 0.3, z: 0, opacity: 0 },
  };

  const activeEvent = events[activeIndex];
  const progress = (activeEvent.raised / activeEvent.goal) * 100;

  return (
    <div className="w-full">
      {/* Gallery */}
      <div className="relative h-[300px] md:h-[400px] flex items-center justify-center mb-8">
        {events.map((event, i) => {
          const pos = getPosition(i);
          const style = positionStyles[pos];
          return (
            <motion.div
              key={event.id}
              className="absolute cursor-pointer"
              animate={{
                x: style.x,
                scale: style.scale,
                opacity: style.opacity,
                zIndex: style.z,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onClick={() => setActiveIndex(i)}
              style={{ translateX: "-50%", left: "50%" }}
            >
              <div className={`w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 transition-colors ${
                pos === "center" ? "border-accent shadow-2xl" : "border-border"
              }`}>
                <img
                  src={imageMap[event.image]}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          );
        })}

        <button
          onClick={prev}
          className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-card shadow-lg border border-border hover:bg-muted transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-card shadow-lg border border-border hover:bg-muted transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>
      </div>

      {/* Event Info */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeEvent.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-center max-w-lg mx-auto"
        >
          <h3 className="text-2xl font-display font-bold text-foreground mb-2">{activeEvent.name}</h3>
          <p className="text-muted-foreground mb-4 text-sm">{activeEvent.description}</p>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">Recaudado</span>
              <span className="font-semibold text-foreground">
                ${activeEvent.raised.toLocaleString("es-MX")} / ${activeEvent.goal.toLocaleString("es-MX")} MXN
              </span>
            </div>
            <Progress value={progress} className="h-3 bg-muted" />
          </div>
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 rounded-xl"
            onClick={() => onSelectEvent(activeEvent)}
          >
            Participar
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CircularGallery;
