"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/[lng]/components/ui/sites/dropdown-menu";
import { Button } from "@/[lng]/components/ui/sites/buttonSites";
import { Download } from "lucide-react";
import { useTranslation } from "@/i18n/client";
import { exportReportPDF } from "@/[lng]/services/exportService";
import { exportReportExcel } from '@/[lng]/services/exportService';
import { toast } from "react-toastify";
import { FaFilePdf } from "react-icons/fa";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";

interface DropMenuExportProps {
  lng: string;
  fetchAllData: () => Promise<any>;
  type: string;
}

export const DropMenuExport: React.FC<DropMenuExportProps> = ({ lng, fetchAllData, type }) => {
  const { t } = useTranslation(lng, "exports");

  const handleExportPDF = async () => {
    const allData = await fetchAllData();

    if (allData.length === 0) {
      toast.error(t("no_data_to_export"));
      return;
    }

    try {
      const pdfBlob = await exportReportPDF(allData, type);

      if (pdfBlob) {
        const blob = new Blob([pdfBlob], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${type}_report_pdf.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast.error(`Error: ${error.response?.data?.message}`);
        return;
      }
    }
  };

  const handleExportExcel = async () => {
    const allData = await fetchAllData();

    if (allData.length === 0) {
      toast.error(t("no_data_to_export"));
      return;
    }

    try {
      const excelBlob = await exportReportExcel(allData, type);
      if (excelBlob) {
        const blob = new Blob([excelBlob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${type}_report_xslx.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error: any) {
      console.error('Error exporting Excel:', error.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline"
          className="font-normal bg-bg-primary text-text-secondary hover:bg-bg-primary-opacity hover:text-text-primary dark:bg-dark-primary hover:dark:bg-dark-secondary ">
          <Download className="mr-2 h-4 w-4" />
          {t("export")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark:bg-dark-primary">
        <DropdownMenuItem onClick={() => handleExportPDF()}>
          {t("export_to_pdf")}
          <FaFilePdf className="m-1" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExportExcel()}>
          {t('export_to_excel')}
          <PiMicrosoftExcelLogoFill className="m-1"/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
