interface InfocardProps {
  title: string;
  value: number | null;
  icon?: React.ReactNode;
}

const Infocard = ({ title, value, icon }: InfocardProps) => {
  return (
    <div className="bg-white shadow rounded p-2 flex items-center w-2-xs space-x-2 jus">
      {icon && <div className="text-red-300">{icon}</div>}
      <div className="flex max-w-xl items-center w-full justify-around">
        <p className="text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default Infocard;
