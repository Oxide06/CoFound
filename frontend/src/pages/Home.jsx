import { motion } from "framer-motion";
import { ArrowRight, Handshake, Search, ShieldCheck, Sparkles, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } }
};

const features = [
  { icon: Search, title: "Precision Matching", text: "Find founders by skills, roles, interests, and startup stage." },
  { icon: ShieldCheck, title: "Serious Profiles", text: "Evaluate builders through role, skill, location, and idea signals." },
  { icon: Handshake, title: "Secure Introductions", text: "Send connection requests and move from interest to collaboration." }
];

export default function Home() {
  return (
    <div className="page-shell">
      <Navbar />
      <main>
        <section className="relative flex min-h-[86vh] items-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80"
            alt="Founders collaborating around a startup strategy table"
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/75 to-background" />
          <motion.div
            initial="hidden"
            animate="show"
            variants={reveal}
            className="container-page relative z-10 max-w-5xl py-20 text-center"
          >
            <span className="label-caps rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-primary-soft">
              The premium network for founders
            </span>
            <h1 className="mt-8 font-display text-5xl font-bold leading-tight md:text-7xl">
              Find Your Co-Founder. <span className="text-gradient">Build What Matters.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-muted">
              Connect with ambitious entrepreneurs, engineers, designers, marketers, and operators ready to build durable startups.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/explore">
                <Button size="lg">
                  Explore Co-Founders <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/ideas/post">
                <Button variant="outline" size="lg">
                  Post Your Idea
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        <section className="container-page grid gap-6 py-16 md:grid-cols-3">
          {features.map((feature) => (
            <motion.div key={feature.title} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}>
              <Card className="h-full">
                <feature.icon className="mb-6 text-primary-soft" size={34} />
                <h2 className="font-display text-2xl font-semibold">{feature.title}</h2>
                <p className="mt-3 text-text-muted">{feature.text}</p>
              </Card>
            </motion.div>
          ))}
        </section>

        <section className="border-y border-white/10 bg-surface/40 py-16">
          <div className="container-page grid gap-8 text-center md:grid-cols-3">
            {["500+ Startups Matched", "1200+ Founders", "48 Countries"].map((stat) => {
              const [value, ...label] = stat.split(" ");
              return (
                <motion.div key={stat} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}>
                  <div className="font-display text-5xl font-bold text-primary-soft">{value}</div>
                  <div className="label-caps mt-3">{label.join(" ")}</div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="container-page py-20">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal} className="text-center font-display text-4xl font-semibold">
            How It Works
          </motion.h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["Sign Up", "Create your account and choose your primary builder role."],
              ["Build Profile", "Show your skills, links, location, and collaboration style."],
              ["Match & Connect", "Browse profiles, review ideas, and start founder conversations."]
            ].map(([title, text], index) => (
              <Card key={title} className="text-center">
                <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full border border-primary/30 bg-primary/10 font-display text-xl">
                  {index + 1}
                </div>
                <h3 className="font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-text-muted">{text}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="container-page pb-20">
          <Card className="relative overflow-hidden p-10 text-center md:p-14">
            <Sparkles className="mx-auto mb-4 text-amber" />
            <h2 className="font-display text-3xl font-semibold">Ready to find your perfect co-founder?</h2>
            <Link to="/register" className="mt-8 inline-flex">
              <Button size="lg">
                Get Started <UserPlus size={18} />
              </Button>
            </Link>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
