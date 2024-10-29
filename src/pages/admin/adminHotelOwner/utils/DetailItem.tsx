import { LucideIcon } from "lucide-react";

interface DetailItemProps {
  icon: LucideIcon;
  label: string;
  value: string | number | undefined;
}

const DetailItem: React.FC<DetailItemProps> = ({
  icon: Icon,
  label,
  value,
}) => (
  <>
    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
      <Icon className="text-blue-600" size={20} />
      <div className="flex-grow">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-700 break-words">{value}</p>
      </div>
    </div>
  </>
);

export default DetailItem;
