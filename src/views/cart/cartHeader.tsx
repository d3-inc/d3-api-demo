import { CircleArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import { cn } from "../../utils/twMerge";

type CartHeaderProps = {
  handleBack: () => void;
};

export const CartHeader = ({ handleBack }: CartHeaderProps) => {
  return (
    <div className="flex justify-between p-2">
      <div className="flex gap-2 items-center">
        <Button
          size="icon"
          className="px-2 h-7"
          variant={"outline"}
          aria-label={"back to search results"}
          onClick={handleBack}
        >
          <CircleArrowLeft />
        </Button>
        <h2 className={cn("text-lg font-bold text-left")}>Cart</h2>
      </div>
    </div>
  );
};
