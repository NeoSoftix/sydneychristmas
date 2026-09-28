import About from "@/components/About";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col">
      <Header />
      <Hero />
      <About />
      <Categories />
      <Contact />
      <Footer />
    </main>
  );
}
