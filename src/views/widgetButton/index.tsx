import { Button } from '../../components/ui/button.js';

type WidgetButtonProps = {
  onClick: () => void;
  isWidgetOpen: boolean;
};

export const WidgetButton = ({ onClick, isWidgetOpen }: WidgetButtonProps) => {
  return (
    <div className="w-[50px] h-[50px]">
      <Button
        tabIndex={0}
        aria-haspopup="true"
        aria-label={isWidgetOpen ? 'Close D3 widget' : 'Open D3 Widget'}
        onClick={onClick}
      >
        <img
          className="object-cover object-center w-full h-5"
          src="https://d3.app/favicon.png"
          alt="D3 Widget"
        />
      </Button>
    </div>
  );
};
