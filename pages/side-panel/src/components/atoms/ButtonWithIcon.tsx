import { Button } from '@extension/ui';

export const ButtonWithIcon = ({
  icon: Icon,
  label,
  ...props
}: {
  icon: any;
  label: string;
} & React.ComponentProps<typeof Button>) => (
  <Button {...props}>
    <Icon className="h-4 w-4 mr-2" />
    {label}
  </Button>
);
