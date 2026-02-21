import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CircularGallery from "@/components/CircularGallery";
import DonationModal from "@/components/DonationModal";
import TransparencyTable from "@/components/TransparencyTable";
import { events, DonationEvent } from "@/data/events";
import { Separator } from "@/components/ui/separator";

const Events = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("categoria");
  const [selectedEvent, setSelectedEvent] = useState<DonationEvent | null>(null);

  const filteredEvents = category
    ? events.filter((e) => e.category === category)
    : events;

  const displayEvents = filteredEvents.length > 0 ? filteredEvents : events;

  return (
    <main className="min-h-screen bg-background">
      {/* Gallery Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">
              Campañas de Ayuda
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Explora los eventos activos y elige cómo quieres ayudar a quienes más lo necesitan.
            </p>
            {category && (
              <a
                href="/eventos"
                className="inline-block mt-3 text-sm text-primary hover:underline"
              >
                ← Ver todos los eventos
              </a>
            )}
          </div>

          <CircularGallery events={displayEvents} onSelectEvent={setSelectedEvent} />
        </div>
      </section>

      <Separator className="max-w-4xl mx-auto" />

      {/* Transparency Section */}
      <section className="py-16 md:py-20">
        <div className="container max-w-4xl">
          <TransparencyTable />
        </div>
      </section>

      <DonationModal
        event={selectedEvent}
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </main>
  );
};

export default Events;
