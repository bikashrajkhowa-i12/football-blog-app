"use client";

import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function Breadcrumbs() {
  const pathname = usePathname();

  if (!pathname) return null;

  const segments = pathname.split("/").filter(Boolean);

  const items = segments.map((segment, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/");
    const title = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return { title, href };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.length > 0 &&
          items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <Fragment key={idx}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={item?.href} className="text-lg">
                      {item?.title}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </Fragment>
            );
          })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
