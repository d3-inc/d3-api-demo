import { ChevronDown } from 'lucide-react';
import { Button } from '../../components/ui/button.js';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../../components/ui/dropdownMenu.js';
import { useDisconnectWallet } from '../../hooks/useDisconnectWallet.js';
import { formatWalletAddress } from '../../utils/nameTokens.js';

type HeaderDropdownProps = {
  evmAddress?: `0x${string}`;
};

export function HeaderDropdown({ evmAddress }: HeaderDropdownProps) {
  const { handleDisconnectWallet } = useDisconnectWallet();

  if (!evmAddress) return;
  return (
    <div className="flex items-end justify-end my-2 pe-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex gap-2">
            {formatWalletAddress(evmAddress?.toString())}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="cursor-pointer" onClick={handleDisconnectWallet}>
            Disconnect Wallet
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
