import { Heart, Shield, Users, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    icon: Heart,
    title: "Empatía",
    description: "Cada acción que tomamos está guiada por la compasión hacia quienes más sufren.",
  },
  {
    icon: Shield,
    title: "Transparencia",
    description: "Cada peso donado se registra públicamente. Rendimos cuentas a nuestra comunidad.",
  },
  {
    icon: Users,
    title: "Comunidad",
    description: "Creemos en el poder colectivo. Juntos podemos reconstruir lo que la naturaleza destruye.",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const About = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-trust-light to-background">
        <div className="container text-center max-w-3xl">
          <motion.h1
            {...fadeInUp}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6"
          >
            Sobre Nosotros
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            <strong className="text-foreground">Unidos por México</strong> es una plataforma de donaciones transparente
            dedicada a canalizar ayuda directa a las comunidades más afectadas por desastres naturales en nuestro país.
            Nacimos de la convicción de que la solidaridad mexicana puede cambiar vidas.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <motion.div {...fadeInUp} className="glass-card rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              Nuestra Misión
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Conectar a donantes con comunidades afectadas por desastres naturales de manera directa,
              eficiente y transparente. Garantizamos que cada peso se utilice en lo que más importa:
              víveres, reconstrucción, educación y apoyo emocional para las familias mexicanas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-10 text-center">
            Nuestros Valores
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How funds are used */}
      <section className="py-16 bg-muted/40">
        <div className="container max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
            ¿Cómo se Utilizan los Fondos?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { pct: "45%", label: "Víveres y agua" },
              { pct: "25%", label: "Reconstrucción" },
              { pct: "20%", label: "Educación" },
              { pct: "10%", label: "Operación" },
            ].map((item) => (
              <div key={item.label} className="bg-card rounded-xl p-5 border border-border">
                <p className="text-3xl font-display font-bold text-primary mb-1">{item.pct}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16">
        <div className="container max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">
            Contacto
          </h2>
          <div className="space-y-4">
            {[
              { icon: Mail, text: "contacto@unidospormexico.org" },
              { icon: Phone, text: "+52 (55) 1234-5678" },
              { icon: MapPin, text: "Ciudad de México, México" },
            ].map((item) => (
              <div key={item.text} className="flex items-center justify-center gap-3 text-muted-foreground">
                <item.icon className="h-5 w-5 text-primary" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
