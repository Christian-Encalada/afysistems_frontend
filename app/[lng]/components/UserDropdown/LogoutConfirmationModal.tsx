"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/[lng]/components/ui/dialogClient";
import { Button } from "@/[lng]/components/ui/sites/buttonSites";
import { useTranslation } from '@/i18n/client';
import { DialogTitle } from "@radix-ui/react-dialog";

interface LogoutConfirmationModalProps {
  lng: string
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
  lng,
  isOpen,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation(lng, 'userDropdown');

  return (
    <Dialog open={isOpen} onOpenChange={(open: any) => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t('logout_confirmation')}
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex justify-center gap-4">
          <Button variant="outline" onClick={onCancel}>
            {t('cancel')}
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {t('logout')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
