"use client";

import { CompanyProps } from "@/app/interfaces/json";

export function markerIconColor(companyName: string) {
  switch (companyName) {
    case "marques":
      return "blue";
    case "esus-host":
      return "red";
    case "biatic":
      return "green";
    default:
      return "black";
  }
}

async function fetchCompanies(): Promise<CompanyProps[]> {
  const res = await fetch("/api/companies");
  const { companies = [] } = await res.json();
  return companies;
}
