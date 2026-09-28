import Footer from "@/components/Footer";
import Header from "@/components/Header";

type Props = {
  children: React.ReactNode;
  /** Float the glass header over the first section (for full-bleed photo heroes) */
  overlayHeader?: boolean;
};

/** Page shell for shop-style pages: header on top, footer below */
export default function ShopFrame({ children, overlayHeader = false }: Props) {
  return (
    <main className="relative flex flex-1 flex-col bg-[#fdfbf7]">
      {overlayHeader ? (
        <Header />
      ) : (
        // Green band so the glass header stays readable above the light hero
        <div className="relative h-[104px] bg-pine sm:h-[116px]">
          <Header />
        </div>
      )}
      {children}
      <Footer />
    </main>
  );
}
