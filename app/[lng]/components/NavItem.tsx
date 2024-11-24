import { Tooltip } from 'react-tooltip';

export default function NavItem({
  onClick,
  label,
  icon,
  isActive,
}: {
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <button
      data-tooltip-id={`tooltip-${label}`}
      data-tooltip-content={label}
      onClick={onClick}
      className={`${isActive ? 'bg-bg-primary px-4 text-text-secondary hover:text-text-secondary dark:bg-dark-secondary dark:text-dark-text-primary' : 'text-text-primary hover:text-bg-primary dark:text-text-secondary dark:hover:text-dark-text-primary'} flex cursor-pointer items-center rounded-lg py-3 text-base font-normal`}
    >
      {icon}
      <Tooltip
        id={`tooltip-${label}`}
        place='right'
        noArrow
        style={{
          backgroundColor: '#434141',
          padding: '2px 6px',
          color: '#F9F7FF',
          fontSize: '13px',
        }}
      />
    </button>
  );
}
