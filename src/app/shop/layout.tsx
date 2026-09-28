import ShopFrame from "@/components/shop/ShopFrame";

export default function ShopLayout({ children }: LayoutProps<"/shop">) {
  return <ShopFrame>{children}</ShopFrame>;
}
