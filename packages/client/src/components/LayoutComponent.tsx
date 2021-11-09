interface LayoutComponentProps {}

const LayoutComponent: React.FC<LayoutComponentProps> = ({ children }) => {
  return (
    <div className="absolute top-0 left-0 h-full w-full bg-gray-600 text-white">
      {children}
    </div>
  );
};

export default LayoutComponent;
