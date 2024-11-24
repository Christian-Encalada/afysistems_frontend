"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/[lng]/components/ui/sites/dropdown-menu";
import { Button } from "@/[lng]/components/ui/sites/buttonSites";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "@/i18n/client";
import * as React from "react";

interface RoleFilterProps {
  lng: string;
  filterValue: string;
  setFilterValue: (value: string) => void;
}

export const RoleFilter: React.FC<RoleFilterProps> = ({
  lng,
  filterValue,
  setFilterValue,
}) => {
  const { t } = useTranslation(lng, "users");

  const getLabel = () => {
    if (filterValue === "admin") return t("roles_admin");
    if (filterValue === "assistant") return t("roles_assistant");
    if (filterValue === "super_admin") return t("roles_super_admin");
    return t("select_role");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="bg-white text-text-primary border border-slate-400 dark:border-slate-400 dark:bg-dark-text-secondary dark:text-dark-text-primary">
        <Button
          variant="outline"
          className="font-normal"
        >
          {getLabel()}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="dark:bg-dark-primary">
        <DropdownMenuCheckboxItem
          checked={filterValue === "admin"}
          onCheckedChange={() => setFilterValue("admin")}
        >
          {t("roles_admin")}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={filterValue === "assistant"}
          onCheckedChange={() => setFilterValue("assistant")}
        >
          {t("roles_assistant")}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={filterValue === "super_admin"}
          onCheckedChange={() => setFilterValue("super_admin")}
        >
          {t("roles_super_admin")}
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={filterValue === ""}
          onCheckedChange={() => setFilterValue("")}
        >
          {t("select_role")}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};