import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryView from "@/components/shop/CategoryView";
import { getCategories, getCategory, getCategoryIntro } from "@/lib/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[category]">): Promise<Metadata> {
  const category = getCategory((await params).category);
  if (!category) return {};
  return {
    title: `${category.title ?? category.name} | Sydney's Christmas Barn`,
    description: getCategoryIntro(category),
  };
}

export default async function CategoryPage({ params }: PageProps<"/shop/[category]">) {
  const category = getCategory((await params).category);
  if (!category) notFound();

  return (
    <CategoryView
      category={category}
      crumbs={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: category.name }]}
    />
  );
}
